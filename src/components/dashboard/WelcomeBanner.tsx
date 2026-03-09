import React from 'react';
import Link from 'next/link';

interface WelcomeBannerProps {
    name: string;
    complaintCount: number;
}

export default function WelcomeBanner({ name, complaintCount }: WelcomeBannerProps) {
    return (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-6 right-24 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <p className="text-green-100 text-sm font-mono uppercase tracking-widest mb-1">Citizen Dashboard</p>
                    <h2 className="text-3xl font-heading font-bold mb-2">Welcome back, {name}! 👋</h2>
                    <p className="text-green-100 text-sm">
                        You have <strong className="text-white">{complaintCount}</strong> reported complaint{complaintCount !== 1 ? 's' : ''} on record.
                    </p>
                </div>
                <Link
                    href="/complaints"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Report Complaint
                </Link>
            </div>
        </div>
    );
}
