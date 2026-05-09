import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || (payload.role !== 'municipal' && payload.role !== 'admin')) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const complaints = await prisma.complaint.findMany({
            include: {
                user: {
                    select: { fullName: true, email: true }
                },
                _count: {
                    select: { upvotes: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Format for the dashboard
        const formatted = complaints.map(c => ({
            id: c.id,
            issueType: c.issueType,
            description: c.description,
            street: c.street,
            city: c.city,
            state: c.state,
            zipcode: c.zipcode,
            latitude: c.latitude,
            longitude: c.longitude,
            status: c.status,
            remarks: c.remarks,
            isDuplicate: c.isDuplicate,
            originalReportId: c.originalReportId,
            evidenceUrl: c.evidenceUrl,
            videoUrl: c.videoUrl,
            createdAt: c.createdAt,
            submittedBy: c.user.fullName,
            submitterEmail: c.user.email,
            upvoteCount: c._count.upvotes
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Failed to fetch municipal complaints:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
