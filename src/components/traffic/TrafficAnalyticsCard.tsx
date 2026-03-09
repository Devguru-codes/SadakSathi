import React from 'react';

interface AnalyticsData {
    totalViolations: number;
    avgConfidence: number;
    vehicleCount: number;
    totalChallanAmount: number;
    totalChallansIssued: number;
}

interface TrafficAnalyticsCardProps {
    data: AnalyticsData;
}

export default function TrafficAnalyticsCard({ data }: TrafficAnalyticsCardProps) {
    const metrics = [
        {
            label: 'Violations Detected',
            value: data.totalViolations,
            display: data.totalViolations.toString(),
            progress: Math.min((data.totalViolations / 50) * 100, 100),
            color: 'bg-red-500',
        },
        {
            label: 'Avg Confidence',
            value: data.avgConfidence,
            display: `${data.avgConfidence}%`,
            progress: data.avgConfidence,
            color: 'bg-brand-primary',
        },
        {
            label: 'Vehicle Count',
            value: data.vehicleCount,
            display: data.vehicleCount.toLocaleString(),
            progress: null,
            color: '',
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-soft border border-border-light overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light">
                <h3 className="font-heading font-bold">Traffic Analytics</h3>
                <p className="text-xs text-text-secondary mt-0.5">Real-time violation metrics</p>
            </div>
            <div className="p-6 space-y-6">
                {metrics.map((m) => (
                    <div key={m.label}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider">{m.label}</span>
                            <span className="text-2xl font-bold">{m.display}</span>
                        </div>
                        {m.progress !== null && (
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${m.color}`}
                                    style={{ width: `${m.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                ))}

                {/* Challan Summary */}
                <div className="pt-4 border-t border-border-light">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary font-medium">Challans Issued</span>
                        <span className="font-bold">{data.totalChallansIssued}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                        <span className="text-text-secondary font-medium">Total Challan Amount</span>
                        <span className="font-bold text-green-600">₹{data.totalChallanAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {/* Infrastructure Alert */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-purple-800 mb-1">Infrastructure Alert</p>
                            <p className="text-xs text-purple-700 leading-relaxed">
                                High violation rate detected at Junction 4B. Suggesting manual patrol or signal recalibration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
