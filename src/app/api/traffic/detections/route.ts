import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const detections = await prisma.trafficViolation.findMany({
            orderBy: { timestamp: 'desc' },
            take: 50,
            include: {
                challan: true,
                vehicle: { select: { vehicleType: true } },
            },
        });

        return NextResponse.json(detections);
    } catch (error) {
        console.error('Detections fetch error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
