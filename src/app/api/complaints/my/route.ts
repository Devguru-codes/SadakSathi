import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET() {
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

        const complaints = await prisma.complaint.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { upvotes: true } },
            },
        });

        const result = complaints.map((c) => ({
            id: c.id,
            issueType: c.issueType,
            description: c.description,
            street: c.street,
            city: c.city,
            state: c.state,
            status: c.status,
            remarks: c.remarks,
            evidenceUrl: c.evidenceUrl,
            latitude: c.latitude,
            longitude: c.longitude,
            createdAt: c.createdAt,
            upvoteCount: c._count.upvotes,
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching my complaints:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
