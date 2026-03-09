"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

interface LeaderboardUser {
    id: string;
    fullName: string;
    username: string;
    role: string;
    profileImageUrl: string | null;
    reports: number;
    upvotes: number;
    points: number;
    rank: number;
}

interface Stats {
    totalContributors: number;
    totalReports: number;
}

function getBadge(rank: number) {
    if (rank === 1) return { label: 'Gold Badge', cls: 'bg-yellow-100 text-yellow-600' };
    if (rank <= 3) return { label: 'Silver Badge', cls: 'bg-gray-100 text-gray-600' };
    if (rank <= 5) return { label: 'Bronze Badge', cls: 'bg-orange-100 text-orange-600' };
    return { label: 'Contributor', cls: 'bg-blue-50 text-blue-600' };
}

function getTitle(rank: number) {
    if (rank === 1) return 'Urban Legend';
    if (rank === 2) return 'Road Sentinel';
    if (rank === 3) return 'Pothole Hunter';
    if (rank <= 5) return 'City Guardian';
    return 'Contributor';
}

function Avatar({ user, size = 'md' }: { user: LeaderboardUser; size?: 'sm' | 'md' | 'lg' }) {
    const dim = size === 'lg' ? 'w-32 h-32' : size === 'md' ? 'w-24 h-24' : 'w-10 h-10';
    const textSize = size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-sm';

    if (user.profileImageUrl) {
        return (
            <div className={`${dim} rounded-full overflow-hidden flex-shrink-0`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.profileImageUrl} alt={user.fullName} className="w-full h-full object-cover" />
            </div>
        );
    }

    return (
        <div className={`${dim} rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0`}>
            <span className={`${textSize} font-bold text-brand-primary`}>{user.fullName?.[0]?.toUpperCase() ?? 'U'}</span>
        </div>
    );
}

export default function LeaderboardPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [stats, setStats] = useState<Stats>({ totalContributors: 0, totalReports: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/leaderboard');
                if (res.ok) {
                    const data = await res.json();
                    setLeaderboard(data.leaderboard);
                    setStats(data.stats);
                }
            } catch (err) {
                console.error('Failed to fetch leaderboard:', err);
            } finally {
                setLoading(false);
                setTimeout(() => setIsVisible(true), 100);
            }
        })();
    }, []);

    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    return (
        <>
            <AppHeader />
            <main className="flex-grow pt-16">
                <section className="py-12 md:py-20 px-6 bg-white min-h-screen relative">
                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Header */}
                        <div className={`text-center mb-16 animate-on-scroll-hidden ${isVisible ? 'animate-on-scroll-visible' : ''}`}>
                            <div className="inline-block px-3 py-1.5 bg-brand-primary/20 rounded text-xs font-bold text-brand-primary uppercase tracking-widest mb-4">
                                Community Heroes
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary tracking-tight">
                                Top Contributors
                            </h1>
                            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                                Recognizing the citizens who go above and beyond to make our city streets better for everyone.
                            </p>
                        </div>

                        {/* Loading state */}
                        {loading && (
                            <div className="flex items-center justify-center py-32">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                                    <p className="text-sm text-text-secondary">Loading leaderboard…</p>
                                </div>
                            </div>
                        )}

                        {!loading && leaderboard.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">🏆</div>
                                <h3 className="text-xl font-bold mb-2">No contributors yet</h3>
                                <p className="text-text-secondary text-sm mb-6">Be the first to report an issue and claim the #1 spot!</p>
                                <Link href="/complaints" className="px-6 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                    Submit a Report
                                </Link>
                            </div>
                        )}

                        {!loading && leaderboard.length > 0 && (
                            <>
                                {/* Podium / Top 3 */}
                                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end animate-on-scroll-hidden ${isVisible ? 'animate-on-scroll-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
                                    {/* Rank 2 */}
                                    {top3[1] && (
                                        <div className="order-2 md:order-1 flex flex-col items-center">
                                            <div className="relative mb-6">
                                                <div className="border-4 border-gray-200 rounded-full">
                                                    <Avatar user={top3[1]} size="md" />
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-200 text-text-primary font-bold rounded-full flex items-center justify-center border-4 border-white">2</div>
                                            </div>
                                            <div className="bg-neutral-surface p-6 rounded-2xl border border-border-light w-full text-center shadow-soft">
                                                <h3 className="font-bold text-xl">{top3[1].fullName}</h3>
                                                <p className="text-text-secondary text-sm mb-4">{getTitle(2)}</p>
                                                <div className="text-2xl font-bold text-brand-primary">{top3[1].points.toLocaleString()} pts</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Rank 1 */}
                                    {top3[0] && (
                                        <div className="order-1 md:order-2 flex flex-col items-center">
                                            <div className="relative mb-8 transform hover:scale-105 transition-transform">
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl animate-bounce">👑</div>
                                                <div className="border-4 border-brand-primary shadow-glow rounded-full">
                                                    <Avatar user={top3[0]} size="lg" />
                                                </div>
                                                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-brand-primary text-text-primary font-bold rounded-full flex items-center justify-center border-4 border-white shadow-lg">1</div>
                                            </div>
                                            <div className="bg-white p-10 rounded-3xl border-2 border-brand-primary w-full text-center shadow-medium relative">
                                                <h3 className="font-bold text-2xl">{top3[0].fullName}</h3>
                                                <p className="text-text-secondary text-sm mb-6">{getTitle(1)}</p>
                                                <div className="text-4xl font-bold text-brand-primary">{top3[0].points.toLocaleString()} pts</div>
                                                <div className="mt-4 flex justify-center gap-2">
                                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-[10px] font-bold rounded-full uppercase">Gold Badge</span>
                                                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-full uppercase">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Rank 3 */}
                                    {top3[2] && (
                                        <div className="order-3 flex flex-col items-center">
                                            <div className="relative mb-6">
                                                <div className="border-4 border-orange-200 rounded-full">
                                                    <Avatar user={top3[2]} size="md" />
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-200 text-orange-600 font-bold rounded-full flex items-center justify-center border-4 border-white">3</div>
                                            </div>
                                            <div className="bg-neutral-surface p-6 rounded-2xl border border-border-light w-full text-center shadow-soft">
                                                <h3 className="font-bold text-xl">{top3[2].fullName}</h3>
                                                <p className="text-text-secondary text-sm mb-4">{getTitle(3)}</p>
                                                <div className="text-2xl font-bold text-brand-primary">{top3[2].points.toLocaleString()} pts</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Stats Row */}
                                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-on-scroll-hidden ${isVisible ? 'animate-on-scroll-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                                    <div className="bg-neutral-surface p-8 rounded-2xl flex items-center gap-6 border border-border-light">
                                        <div className="w-16 h-16 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">👥</div>
                                        <div>
                                            <div className="text-2xl font-bold">{stats.totalContributors.toLocaleString()}</div>
                                            <div className="text-sm text-text-secondary">Contributors</div>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-surface p-8 rounded-2xl flex items-center gap-6 border border-border-light">
                                        <div className="w-16 h-16 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">✅</div>
                                        <div>
                                            <div className="text-2xl font-bold">{stats.totalReports.toLocaleString()}</div>
                                            <div className="text-sm text-text-secondary">Reports Filed</div>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-surface p-8 rounded-2xl flex items-center gap-6 border border-border-light">
                                        <div className="w-16 h-16 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">🏆</div>
                                        <div>
                                            <div className="text-2xl font-bold text-brand-primary">{leaderboard[0]?.fullName ?? '—'}</div>
                                            <div className="text-sm text-text-secondary">#1 Contributor</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
                                {rest.length > 0 && (
                                    <div className={`bg-white rounded-2xl border border-border-light shadow-medium overflow-hidden animate-on-scroll-hidden ${isVisible ? 'animate-on-scroll-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                                        <div className="p-8 border-b border-border-light">
                                            <h3 className="text-xl font-heading font-bold">Full Rankings</h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left whitespace-nowrap">
                                                <thead>
                                                    <tr className="bg-neutral-surface text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                                                        <th className="px-8 py-4">Rank</th>
                                                        <th className="px-8 py-4">User</th>
                                                        <th className="px-8 py-4">Reports</th>
                                                        <th className="px-8 py-4">Upvotes</th>
                                                        <th className="px-8 py-4">Points</th>
                                                        <th className="px-8 py-4">Badge</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border-light">
                                                    {rest.map((user) => {
                                                        const badge = getBadge(user.rank);
                                                        return (
                                                            <tr key={user.id} className="hover:bg-neutral-surface/50 transition-colors">
                                                                <td className="px-8 py-6 font-bold text-text-secondary">#{user.rank}</td>
                                                                <td className="px-8 py-6">
                                                                    <div className="flex items-center gap-3">
                                                                        <Avatar user={user} size="sm" />
                                                                        <span className="font-bold text-text-primary">{user.fullName}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 text-sm text-text-secondary">{user.reports}</td>
                                                                <td className="px-8 py-6 text-sm text-text-secondary">{user.upvotes}</td>
                                                                <td className="px-8 py-6 font-bold text-brand-primary">{user.points.toLocaleString()}</td>
                                                                <td className="px-8 py-6">
                                                                    <span className={`px-2 py-1 ${badge.cls} text-[10px] font-bold rounded uppercase`}>{badge.label}</span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
            <AppFooter />
        </>
    );
}
