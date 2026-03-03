"use client";

import React, { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import Image from "next/image";

export default function TrafficViolationsPage() {
    const [activeTab, setActiveTab] = useState("No Helmet");
    const tabs = ["No Helmet", "Triple Riding", "Wrong Side", "Plate Detection"];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animation-on-scroll]').forEach(el => {
            el.classList.add('animate-on-scroll-hidden');
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <AppHeader />
            <main className="flex-grow pt-16">
                <section className="py-12 md:py-20 px-6 bg-neutral-surface min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12" data-animation-on-scroll="">
                            <div>
                                <div className="inline-block px-3 py-1.5 bg-red-100 rounded text-xs font-bold text-red-600 uppercase tracking-widest mb-4">Live Enforcement</div>
                                <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">AI Traffic Enforcement</h1>
                                <p className="text-text-secondary">Detecting safety violations using automated edge-AI vision models.</p>
                            </div>
                            <button className="px-6 py-3 bg-text-primary text-white font-bold rounded-lg shadow-soft flex items-center gap-2 hover:bg-neutral-dark">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                Download Full Report
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-border-light" data-animation-on-scroll="">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    className={`px-6 py-3 text-sm transition-colors ${activeTab === tab ? 'font-bold border-b-2 border-brand-primary text-brand-primary' : 'font-medium text-text-secondary hover:text-text-primary'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Media/Detection View */}
                            <div className="lg:col-span-2 space-y-8" data-animation-on-scroll="">
                                <div className="bg-white rounded-3xl border border-border-light shadow-medium overflow-hidden">
                                    {/* Detection Preview */}
                                    <div className="aspect-video relative bg-neutral-dark">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://images.unsplash.com/photo-1595770367352-038e012e4e4e?ixid=M3w4NjU0NDF8MHwxfHNlYXJjaHwxfHxDQ1RWJTIwZm9vdGFnZSUyMG9mJTIwdHJhZmZpYyUyMGp1bmN0aW9uJTIwd2l0aCUyMG1vdG9yY3ljbGVzfGVufDB8fHx8MTc3MjQ3NDY0OXww&ixlib=rb-4.1.0&w=1200&h=800&fit=crop&fm=jpg&q=80" className="w-full h-full object-cover opacity-70" alt="Traffic intersection" loading="eager" />

                                        {/* Bounding Boxes Mockup */}
                                        <div className="absolute inset-0">
                                            {/* Violation 1 */}
                                            <div className="absolute top-[20%] left-[45%] w-24 h-40 border-2 border-red-500 rounded-lg animate-pulse">
                                                <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-t-lg">NO HELMET (98%)</div>
                                            </div>

                                            {/* Compliant 1 */}
                                            <div className="absolute top-[40%] right-[20%] w-24 h-40 border-2 border-green-500 rounded-lg">
                                                <div className="absolute -top-6 left-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-t-lg">HELMET (96%)</div>
                                            </div>

                                            {/* Violation 2 */}
                                            <div className="absolute bottom-[20%] left-[15%] w-32 h-40 border-2 border-red-500 rounded-lg">
                                                <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-t-lg">TRIPLE RIDING (92%)</div>
                                            </div>
                                        </div>

                                        {/* Dashboard Overlay */}
                                        <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl flex items-center justify-between">
                                            <div className="flex flex-row items-center gap-4">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                <div className="text-xs font-bold uppercase tracking-wider">Processing Frame 842/1200</div>
                                            </div>
                                            <div className="text-xs font-mono">2025-05-24 14:22:15</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detection History Table */}
                                <div className="bg-white rounded-2xl border border-border-light shadow-soft overflow-hidden">
                                    <div className="p-6 border-b border-border-light">
                                        <h3 className="font-heading font-bold">Detection Stream</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-neutral-surface text-[10px] font-bold uppercase text-text-secondary">
                                                    <th className="px-6 py-4">Time</th>
                                                    <th className="px-6 py-4">Violation Type</th>
                                                    <th className="px-6 py-4">Confidence</th>
                                                    <th className="px-6 py-4">Status</th>
                                                    <th className="px-6 py-4">Challan (₹)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-light">
                                                <tr>
                                                    <td className="px-6 py-4 text-xs font-mono">14:22:10</td>
                                                    <td className="px-6 py-4 text-sm font-bold">No Helmet</td>
                                                    <td className="px-6 py-4 text-sm">98.4%</td>
                                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold uppercase">Challan Issued</span></td>
                                                    <td className="px-6 py-4 text-sm font-bold">1,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 text-xs font-mono">14:21:45</td>
                                                    <td className="px-6 py-4 text-sm font-bold">Wrong Side Driving</td>
                                                    <td className="px-6 py-4 text-sm">94.1%</td>
                                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-[10px] font-bold uppercase">Pending Verification</span></td>
                                                    <td className="px-6 py-4 text-sm font-bold">2,500</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Sidebar */}
                            <div className="space-y-8" data-animation-on-scroll="">
                                {/* Real-time Stats */}
                                <div className="bg-white p-8 rounded-3xl border border-border-light shadow-medium">
                                    <h3 className="text-lg font-heading font-bold mb-6">Traffic Analytics</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-text-secondary font-medium">Violations Detected</span>
                                            <span className="text-xl font-bold text-red-500">24</span>
                                        </div>
                                        <div className="h-2 bg-neutral-surface rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-[75%]"></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-text-secondary font-medium">Avg. Confidence</span>
                                            <span className="text-xl font-bold text-brand-primary">92.4%</span>
                                        </div>
                                        <div className="h-2 bg-neutral-surface rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-primary w-[92%]"></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-text-secondary font-medium">Vehicle Count</span>
                                            <span className="text-xl font-bold">1,842</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-border-light">
                                        <div className="bg-brand-primary/10 p-4 rounded-xl">
                                            <p className="text-[10px] font-bold text-brand-primary uppercase mb-1">Infrastructure Alert</p>
                                            <p className="text-xs text-text-secondary leading-relaxed">High violation rate detected at <span className="font-bold text-text-primary">Junction 4B</span>. Suggesting manual patrol or signal recalibration.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload/Re-run Section */}
                                <div className="bg-text-primary text-white p-8 rounded-3xl shadow-medium">
                                    <h3 className="text-lg font-heading font-bold mb-4">Run Manual Audit</h3>
                                    <p className="text-sm opacity-70 mb-6">Upload traffic camera feed or recorded dashcam footage to generate a violation heatmap.</p>
                                    <div className="border border-white/20 border-dashed rounded-xl p-6 text-center mb-6">
                                        <svg className="w-8 h-8 mx-auto text-brand-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeWidth="2"></path></svg>
                                        <span className="text-xs font-bold uppercase tracking-wider">Upload Feed</span>
                                    </div>
                                    <button className="w-full py-4 bg-brand-primary text-text-primary font-bold rounded-xl hover:scale-[1.02] transition-transform">Start AI Analysis</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <AppFooter />
        </>
    );
}
