import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || !payload.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = payload.id as string;
        const { complaintId } = await req.json();

        if (!complaintId) {
            return NextResponse.json({ message: 'complaintId is required' }, { status: 400 });
        }

        // Check if already voted
        const existing = await prisma.upvote.findFirst({
            where: { userId, complaintId },
        });

        if (existing) {
            return NextResponse.json({ message: 'You have already voted on this complaint.' }, { status: 409 });
        }

        // Insert upvote
        await prisma.upvote.create({
            data: { userId, complaintId },
        });

        // Return updated count
        const count = await prisma.upvote.count({ where: { complaintId } });

        return NextResponse.json({ success: true, upvoteCount: count });
    } catch (error) {
        console.error('Error casting vote:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
