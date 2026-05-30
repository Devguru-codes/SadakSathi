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
        const [aiViolations, aiConfidences, vehicleCount, challans, citizenComplaints] = await Promise.all([
            prisma.trafficViolation.count(),
            prisma.trafficViolation.findMany({ select: { confidence: true } }),
            prisma.vehicleDetection.count(),
            prisma.challan.aggregate({ _sum: { amount: true }, _count: true }),
            prisma.complaint.count({ where: { issueType: { in: TRAFFIC_ISSUE_TYPES } } }),
        ]);

        // Combine AI detections + citizen complaints for total count
        const totalViolations = aiViolations + citizenComplaints;

        const avgConfidence =
            aiConfidences.length > 0
                ? aiConfidences.reduce((sum, v) => sum + v.confidence, 0) / aiConfidences.length
                : 0;

        return NextResponse.json({
            totalViolations,
            avgConfidence: Math.round(avgConfidence * 10) / 10,
            vehicleCount,
            totalChallanAmount: challans._sum.amount ?? 0,
            totalChallansIssued: challans._count,
            citizenReports: citizenComplaints,
        });
    } catch (error) {
        console.error('Traffic analytics error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
