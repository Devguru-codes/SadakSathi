import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/complaints/stats
 * Returns aggregate complaint counts from the DB.
 * Includes duplicates in the total so the UI always reflects reality.
 */
export async function GET() {
    try {
        const [total, pending, inProgress, resolved] = await Promise.all([
            // All complaints (including duplicates)
            prisma.complaint.count(),
            // Pending = Submitted (all, including duplicates)
            prisma.complaint.count({ where: { status: 'Submitted' } }),
            // In progress = Approved + OnHold
            prisma.complaint.count({ where: { status: { in: ['Approved', 'OnHold'] } } }),
            // Resolved = Completed + ResolvedReviewed
            prisma.complaint.count({ where: { status: { in: ['Completed', 'ResolvedReviewed'] } } }),
        ]);

        return NextResponse.json({ total, pending, inProgress, resolved });
    } catch (error) {
        console.error('Error fetching complaint stats:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
