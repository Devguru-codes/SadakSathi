import { NextResponse } from 'next/server';
import { comparePasswords } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { setSessionCookie } from '@/lib/session';
import { allow, clientIp } from '@/lib/rateLimit';

const ROLE_REDIRECTS: Record<string, string> = { municipal: '/Municipal', traffic: '/Traffic' };
const MAX_FAILED_LOGINS = 5;
const LOCK_MINUTES = 15;
// Compared against when the account doesn't exist, so unknown emails take as long as known ones.
const DUMMY_HASH = '$2a$10$vHD7C.zQCddlVKenSp/IGeQOUcMLV.96N8w15IexSddO5dPzeyGD6';
const INVALID = () => NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });

export async function POST(req: Request) {
    try {
        // Each attempt costs a slow bcrypt check on the one Node process: cap attempts per visitor.
        if (!allow(`login:${clientIp(req)}`, 20, 60_000)) {
            return NextResponse.json({ message: 'Too many login attempts. Wait a minute and try again.' }, { status: 429 });
        }
        const body = await req.json();
        // Authority logins may send a username in the `email` field.
        const { email, password } = body;

        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({ where: { OR: [{ email }, { username: email }] } });
        if (!user) {
            await comparePasswords(password, DUMMY_HASH);
            return INVALID();
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
            const minutes = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60_000);
            return NextResponse.json({ message: `Too many wrong passwords. Try again in ${minutes} minute(s).` }, { status: 429 });
        }

        // Google-only accounts have no password; answer exactly like a wrong password (no account hints).
        if (!user.passwordHash) {
            await comparePasswords(password, DUMMY_HASH);
            return INVALID();
        }

        // Count the attempt BEFORE the slow password check (atomic increment in the DB). Counting after
        // let 50 parallel guesses all read "not locked" first; now attempt 6 and later never get checked.
        const { failedLogins: attempt } = await prisma.user.update({
            where: { id: user.id },
            data: { failedLogins: { increment: 1 } },
            select: { failedLogins: true },
        });
        const lock = () => prisma.user.update({
            where: { id: user.id },
            data: { failedLogins: 0, lockedUntil: new Date(Date.now() + LOCK_MINUTES * 60_000) },
        });
        if (attempt > MAX_FAILED_LOGINS) {
            await lock();
            return NextResponse.json({ message: `Too many wrong passwords. Try again in ${LOCK_MINUTES} minute(s).` }, { status: 429 });
        }

        if (!(await comparePasswords(password, user.passwordHash))) {
            if (attempt >= MAX_FAILED_LOGINS) await lock();
            return INVALID();
        }

        await prisma.user.update({ where: { id: user.id }, data: { failedLogins: 0, lockedUntil: null } });

        const response = NextResponse.json({
            message: 'Login successful',
            role: user.role,
            redirectUrl: ROLE_REDIRECTS[user.role],
        }, { status: 200 });
        return setSessionCookie(response, user);
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
