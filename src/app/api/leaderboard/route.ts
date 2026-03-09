import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get all users with their complaint count and upvote count
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                username: true,
                role: true,
                profileImageUrl: true,
                _count: {
                    select: {
                        complaints: true,
                        upvotes: true,
                    },
                },
            },
        });

        // Compute points: each complaint = 10 pts, each upvote = 5 pts
        const ranked = users
            .map((u) => ({
                id: u.id,
                fullName: u.fullName,
                username: u.username,
                role: u.role,
                profileImageUrl: u.profileImageUrl,
                reports: u._count.complaints,
                upvotes: u._count.upvotes,
                points: u._count.complaints * 10 + u._count.upvotes * 5,
            }))
            .sort((a, b) => b.points - a.points)
            .slice(0, 50)
            .map((u, i) => ({ ...u, rank: i + 1 }));

        // Aggregate stats
        const totalUsers = await prisma.user.count();
        const totalComplaints = await prisma.complaint.count();

        return NextResponse.json({
            leaderboard: ranked,
            stats: {
                totalContributors: totalUsers,
                totalReports: totalComplaints,
            },
        });
    } catch (error) {
        console.error('Leaderboard API error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
