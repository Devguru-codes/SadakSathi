'use client';

import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function UploadAuditCard() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<{ framesAnalyzed: number; violationsDetected: number; avgConfidence: number } | null>(null);

    const handleFile = async (file: File) => {
        setUploading(true);
        setResult(null);
        try {
            const form = new FormData();
            form.append('file', file);
            // In dev this is a mock endpoint
            await new Promise((r) => setTimeout(r, 1500));
            setResult({ framesAnalyzed: 1200, violationsDetected: 24, avgConfidence: 92.4 });
            toast.success('Feed processed successfully!');
        } catch {
            toast.error('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-text-primary rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
                <h3 className="font-heading font-bold text-white">Run Manual Audit</h3>
                <p className="text-xs text-white/60 mt-0.5">Upload footage to generate a violation heatmap</p>
            </div>
            <div className="p-6">
                <p className="text-sm text-white/70 mb-5 leading-relaxed">
                    Upload traffic camera feed or recorded dashcam footage to detect violations and generate a comprehensive heatmap report.
                </p>

                {/* Dropzone */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFile(file);
                    }}
                    onClick={() => inputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragging ? 'border-brand-primary bg-brand-primary/10' : 'border-white/20 hover:border-white/40'
                    }`}
                >
                    <input ref={inputRef} type="file" accept="video/*,image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                    }} />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
                            <p className="text-sm text-white/60">Analyzing footage…</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-white/80 mb-1">Drop footage here</p>
                            <p className="text-xs text-white/50">or click to browse — MP4, MOV, AVI, JPG</p>
                        </>
                    )}
                </div>

                {/* Result */}
                {result && (
                    <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                        <p className="text-xs font-bold text-white uppercase tracking-widest mb-3">Audit Results</p>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/60">Frames Analyzed</span>
                            <span className="text-white font-bold">{result.framesAnalyzed.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/60">Violations Detected</span>
                            <span className="text-red-400 font-bold">{result.violationsDetected}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/60">Avg Confidence</span>
                            <span className="text-green-400 font-bold">{result.avgConfidence}%</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
