import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const TRAFFIC_ISSUE_TYPES = [
    'No Helmet',
    'Triple Riding',
    'Wrong Side Driving',
    'Signal Jumping',
];

export async function GET() {
    try {
        const complaints = await prisma.complaint.findMany({
            where: {
                issueType: { in: TRAFFIC_ISSUE_TYPES },
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
            include: {
                user: { select: { fullName: true } },
            },
        });

        const result = complaints.map((c: any) => ({
            id: c.id,
            issueType: c.issueType,
            description: c.description,
            street: c.street,
            city: c.city,
            state: c.state,
            status: c.status,
            evidenceUrl: c.evidenceUrl,
            createdAt: c.createdAt,
            submittedBy: c.user?.fullName || 'Anonymous',
            isDuplicate: c.isDuplicate,
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Traffic complaints fetch error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
