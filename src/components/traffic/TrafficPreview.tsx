'use client';

import React, { useEffect, useState } from 'react';

const MOCK_BOXES = [
    { label: 'NO HELMET', confidence: 98, color: 'red', x: '10%', y: '20%', w: '25%', h: '35%' },
    { label: 'TRIPLE RIDING', confidence: 92, color: 'red', x: '40%', y: '35%', w: '30%', h: '40%' },
    { label: 'HELMET', confidence: 96, color: 'green', x: '75%', y: '25%', w: '20%', h: '30%' },
];

interface TrafficPreviewProps {
    frameNumber?: number;
    totalFrames?: number;
}

export default function TrafficPreview({ frameNumber = 842, totalFrames = 1200 }: TrafficPreviewProps) {
    const [timeStr, setTimeStr] = useState('');

    useEffect(() => {
        // Set initial time client-side only to avoid SSR hydration mismatch
        setTimeStr(new Date().toLocaleTimeString('en-IN', { hour12: false }));
        const timer = setInterval(() => {
            setTimeStr(new Date().toLocaleTimeString('en-IN', { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-soft border border-border-light overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light flex justify-between items-center">
                <div>
                    <h3 className="font-heading font-bold">Traffic Detection Preview</h3>
                    <p className="text-xs text-text-secondary mt-0.5">Live edge-AI inference on camera feed</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        LIVE
                    </span>
                </div>
            </div>

            {/* Video Frame Mock */}
            <div className="relative bg-gray-900 aspect-video mx-6 my-4 rounded-xl overflow-hidden">
                {/* Road scene background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600">
                    {/* Road lines */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gray-900/60">
                        <div className="absolute top-1/2 left-0 right-0 h-1 flex gap-8 px-12">
                            {[0,1,2,3,4,5].map(i => (
                                <div key={i} className="flex-1 h-full bg-yellow-400/40 rounded" />
                            ))}
                        </div>
                    </div>
                    {/* Sky */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-900/40 to-transparent" />
                </div>

                {/* Bounding boxes */}
                {MOCK_BOXES.map((box, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
                    >
                        <div
                            className="w-full h-full border-2 rounded"
                            style={{ borderColor: box.color === 'red' ? '#ef4444' : '#22c55e' }}
                        />
                        <div
                            className="absolute -top-6 left-0 px-2 py-0.5 text-[10px] font-bold text-white rounded flex items-center gap-1"
                            style={{ backgroundColor: box.color === 'red' ? '#ef4444' : '#22c55e' }}
                        >
                            {box.label} ({box.confidence}%)
                        </div>
                    </div>
                ))}

                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }}
                />

                {/* Bottom HUD */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-yellow-400 font-bold">
                            ⬡ PROCESSING FRAME {frameNumber}/{totalFrames}
                        </span>
                        <div className="w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${(frameNumber / totalFrames) * 100}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/60">{timeStr}</span>
                </div>

                {/* Corner markers */}
                {['top-2 left-2', 'top-2 right-2', 'bottom-6 left-2', 'bottom-6 right-2'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-4 h-4 border-white/40 ${i < 2 ? 'border-t' : 'border-b'} ${i % 2 === 0 ? 'border-l' : 'border-r'}`} />
                ))}
            </div>

            {/* Legend */}
            <div className="px-6 pb-4 flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-4 h-0.5 bg-red-500 rounded" />
                    <span>Violation Detected</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="w-4 h-0.5 bg-green-500 rounded" />
                    <span>Compliant</span>
                </div>
            </div>
        </div>
    );
}
