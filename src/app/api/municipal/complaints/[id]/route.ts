import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { ComplaintStatus } from '@prisma/client';

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        const payload = await verifyToken(token);
        if (!payload || (payload.role !== 'municipal' && payload.role !== 'admin')) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const body = await req.json();
        let { status, remarks, isDuplicate, originalReportId } = body;

        // Automatically set to Rejected if duplicate and status not already set to Rejected/OnHold
        if (isDuplicate && status !== 'Rejected' && status !== 'OnHold') {
            status = 'Rejected';
            if (!remarks) {
                remarks = `Duplicate of report #${originalReportId || 'unknown'}`;
            }
        }

        const complaint = await prisma.complaint.update({
            where: { id },
            data: {
                status: status as ComplaintStatus,
                remarks: remarks !== undefined ? remarks : null,
                isDuplicate: isDuplicate !== undefined ? isDuplicate : undefined,
                originalReportId: originalReportId !== undefined ? originalReportId : null,
            }
        });

        return NextResponse.json({ success: true, complaint });
    } catch (error) {
        console.error('Failed to update complaint:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        const payload = await verifyToken(token);
        if (!payload || (payload.role !== 'municipal' && payload.role !== 'admin')) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        // Must delete related records first due to foreign keys
        await prisma.detectionResult.deleteMany({ where: { complaintId: id } });
        await prisma.feedback.deleteMany({ where: { complaintId: id } });
        await prisma.upvote.deleteMany({ where: { complaintId: id } });
        
        // Find and delete associated chat threads and their messages
        const threads = await prisma.chatThread.findMany({ where: { complaintId: id } });
        for (const thread of threads) {
            await prisma.chatMessage.deleteMany({ where: { threadId: thread.id } });
            await prisma.chatThread.delete({ where: { id: thread.id } });
        }

        await prisma.complaint.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete complaint:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
