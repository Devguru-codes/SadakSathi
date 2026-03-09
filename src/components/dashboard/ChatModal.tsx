'use client';

import React from 'react';

interface ChatModalProps {
    complaintId: string;
    onClose: () => void;
}

export default function ChatModal({ complaintId, onClose }: ChatModalProps) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-lg">Chat with Authority</h3>
                        <p className="text-xs text-text-secondary font-mono">Complaint #{complaintId.slice(-8).toUpperCase()}</p>
                    </div>
                </div>

                <div className="bg-neutral-surface rounded-xl p-6 border border-border-light mb-6">
                    <p className="text-sm text-text-secondary leading-relaxed">
                        This feature will allow direct communication with municipal officers regarding your complaint.
                        Real-time messaging, file attachments, and status updates will be available here.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-text-secondary mb-6">
                    <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Coming Soon — This feature is under active development.</span>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-text-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
