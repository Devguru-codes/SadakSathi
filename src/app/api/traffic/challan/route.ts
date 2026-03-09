import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const FINE_MAP: Record<string, number> = {
    helmet_violation: 1000,
    triple_riding: 1500,
    wrong_side: 2000,
    plate_detection: 500,
};

export async function POST(req: NextRequest) {
    try {
        const { violationId } = await req.json();
        if (!violationId) {
            return NextResponse.json({ message: 'violationId is required' }, { status: 400 });
        }

        const violation = await prisma.trafficViolation.findUnique({ where: { id: violationId } });
        if (!violation) {
            return NextResponse.json({ message: 'Violation not found' }, { status: 404 });
        }

        // Check if challan already exists
        const existing = await prisma.challan.findUnique({ where: { violationId } });
        if (existing) {
            return NextResponse.json({ message: 'Challan already issued', challan: existing }, { status: 409 });
        }

        const amount = FINE_MAP[violation.type] ?? 500;
        const challan = await prisma.challan.create({
            data: { violationId, amount },
        });

        // Update violation status
        await prisma.trafficViolation.update({
            where: { id: violationId },
            data: { status: 'challan_issued' },
        });

        return NextResponse.json({ success: true, challan });
    } catch (error) {
        console.error('Challan creation error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
