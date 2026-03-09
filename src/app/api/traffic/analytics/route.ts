import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [totalViolations, violations, vehicleCount, challans] = await Promise.all([
            prisma.trafficViolation.count(),
            prisma.trafficViolation.findMany({ select: { confidence: true } }),
            prisma.vehicleDetection.count(),
            prisma.challan.aggregate({ _sum: { amount: true }, _count: true }),
        ]);

        const avgConfidence =
            violations.length > 0
                ? violations.reduce((sum, v) => sum + v.confidence, 0) / violations.length
                : 0;

        return NextResponse.json({
            totalViolations,
            avgConfidence: Math.round(avgConfidence * 10) / 10,
            vehicleCount,
            totalChallanAmount: challans._sum.amount ?? 0,
            totalChallansIssued: challans._count,
        });
    } catch (error) {
        console.error('Traffic analytics error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
