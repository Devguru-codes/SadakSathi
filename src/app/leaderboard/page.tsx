"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default function LeaderboardPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay to allow initial animation on mount
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

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

                        {/* Podium / Top 3 */}
                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end animate-on-scroll-hidden ${isVisible ? 'animate-on-scroll-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
                            {/* Rank 2 */}
                            <div className="order-2 md:order-1 flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://images.unsplash.com/photo-1740252117027-4275d3f84385?ixid=M3w4NjU0NDF8MHwxfHNlYXJjaHwxfHxGcmllbmRseSUyMG1hbiUyMHBvcnRyYWl0JTIwYXZhdGFyfGVufDB8Mnx8fDE3NzI0NzQ2MzB8MA&ixlib=rb-4.1.0&w=200&h=200&fit=crop&fm=jpg&q=80" alt="Marco Rossi" className="w-full h-full object-cover" loading="eager" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-200 text-text-primary font-bold rounded-full flex items-center justify-center border-4 border-white">2</div>
                                </div>
                                <div className="bg-neutral-surface p-6 rounded-2xl border border-border-light w-full text-center shadow-soft">
                                    <h3 className="font-bold text-xl">Marco Rossi</h3>
                                    <p className="text-text-secondary text-sm mb-4">Road Sentinel</p>
                                    <div className="text-2xl font-bold text-brand-primary">4,250 pts</div>
                                </div>
                            </div>

                            {/* Rank 1 */}
                            <div className="order-1 md:order-2 flex flex-col items-center">
                                <div className="relative mb-8 transform hover:scale-105 transition-transform">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl animate-bounce">👑</div>
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-primary shadow-glow">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://images.unsplash.com/photo-1767045548414-b0285f16d24f?ixid=M3w4NjU0NDF8MHwxfHNlYXJjaHwxfHxTbWlsaW5nJTIwd29tYW4lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwwfDJ8fHwxNzcyNDc0NjMwfDA&ixlib=rb-4.1.0&w=300&h=300&fit=crop&fm=jpg&q=80" alt="Elena Gilbert" className="w-full h-full object-cover" loading="eager" />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-brand-primary text-text-primary font-bold rounded-full flex items-center justify-center border-4 border-white shadow-lg">1</div>
                                </div>
                                <div className="bg-white p-10 rounded-3xl border-2 border-brand-primary w-full text-center shadow-medium relative">
                                    <h3 className="font-bold text-2xl">Elena Gilbert</h3>
                                    <p className="text-text-secondary text-sm mb-6">Urban Legend</p>
                                    <div className="text-4xl font-bold text-brand-primary">8,920 pts</div>
                                    <div className="mt-4 flex justify-center gap-2">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-[10px] font-bold rounded-full uppercase">Gold Badge</span>
                                        <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-full uppercase">Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rank 3 */}
                            <div className="order-3 flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://images.unsplash.com/photo-1722926323079-0836a07d2340?ixid=M3w4NjU0NDF8MHwxfHNlYXJjaHwxfHxZb3VuZyUyMG1hbiUyMHdpdGglMjBnbGFzc2VzJTIwYXZhdGFyfGVufDB8Mnx8fDE3NzI0NzQ2MzF8MA&ixlib=rb-4.1.0&w=200&h=200&fit=crop&fm=jpg&q=80" alt="Mark Chen" className="w-full h-full object-cover" loading="eager" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-200 text-orange-600 font-bold rounded-full flex items-center justify-center border-4 border-white">3</div>
                                </div>
                                <div className="bg-neutral-surface p-6 rounded-2xl border border-border-light w-full text-center shadow-soft">
                                    <h3 className="font-bold text-xl">Mark Chen</h3>
                                    <p className="text-text-secondary text-sm mb-4">Pothole Hunter</p>
                                    <div className="text-2xl font-bold text-brand-primary">3,890 pts</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-on-scroll-hidden ${isVisible ? 'animate-on-scroll-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                            <div className="bg-neutral-surface p-8 rounded-2xl flex items-center gap-6 border border-border-light">
                                <div className="w-16 h-16 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">👥</div>
                                <div>
                                    <div className="text-2xl font-bold">12,400+</div>
                                    <div className="text-sm text-text-secondary">Contributors</div>
                                </div>
                            </div>
                            <div className="bg-neutral-surface p-8 rounded-2xl flex items-center gap-6 border border-border-light">
                                <div className="w-16 h-16 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">✅</div>
                                <div>
                                    <div className="text-2xl font-bold">45,102</div>
                                    <div className="text-sm text-text-secondary">Issues Fixed</div>
                                </div>
                            </div>
                            <div className="bg-neutral-surface p-8 rounded-2xl flex items-center gap-6 border border-border-light">
                                <div className="w-16 h-16 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">🏙️</div>
                                <div>
                                    <div className="text-2xl font-bold text-brand-primary">New York</div>
                                    <div className="text-sm text-text-secondary">Most Active City</div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
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
                                            <th className="px-8 py-4">Detections</th>
                                            <th className="px-8 py-4">Points</th>
                                            <th className="px-8 py-4">Badges</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light">
                                        <tr className="hover:bg-neutral-surface/50 transition-colors">
                                            <td className="px-8 py-6 font-bold text-text-secondary">#4</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixid=M3w4NjU0NDF8MHwxfHNlYXJjaHwxfHxQb3J0cmFpdCUyMGF2YXRhcnxlbnwwfHx8fDE3NzI0NzQ2MzF8MA&ixlib=rb-4.1.0&w=100&fit=crop&fm=jpg&q=80" alt="Sarah Smith" className="w-full h-full object-cover" loading="eager" />
                                                    </div>
                                                    <span className="font-bold text-text-primary">Sarah Smith</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-text-secondary">452</td>
                                            <td className="px-8 py-6 text-sm text-text-secondary">812</td>
                                            <td className="px-8 py-6 font-bold text-brand-primary">2,140</td>
                                            <td className="px-8 py-6">
                                                <span className="px-2 py-1 bg-gray-100 text-text-secondary text-[10px] font-bold rounded uppercase">Bronze</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-surface/50 transition-colors">
                                            <td className="px-8 py-6 font-bold text-text-secondary">#5</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixid=M3w4NjU0NDF8MHwxfHNlYXJjaHwxfHxQb3J0cmFpdCUyMGF2YXRhcnxlbnwwfHx8fDE3NzI0NzQ2MzF8MA&ixlib=rb-4.1.0&w=100&fit=crop&fm=jpg&q=80" alt="David J." className="w-full h-full object-cover" loading="eager" />
                                                    </div>
                                                    <span className="font-bold text-text-primary">David J.</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-text-secondary">318</td>
                                            <td className="px-8 py-6 text-sm text-text-secondary">622</td>
                                            <td className="px-8 py-6 font-bold text-brand-primary">1,980</td>
                                            <td className="px-8 py-6">
                                                <span className="px-2 py-1 bg-gray-100 text-text-secondary text-[10px] font-bold rounded uppercase">Elite Contributor</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 bg-neutral-surface text-center border-t border-border-light">
                                <button className="text-brand-primary font-bold hover:underline">Load More Contributors</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <AppFooter />
        </>
    );
}
