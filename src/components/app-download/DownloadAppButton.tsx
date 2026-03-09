'use client';

import React from 'react';

interface DownloadAppButtonProps {
    onClick: () => void;
    compact?: boolean;
}

export default function DownloadAppButton({ onClick, compact = false }: DownloadAppButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 border border-border-light rounded-lg font-medium text-sm text-text-secondary hover:bg-neutral-surface hover:text-text-primary transition-all ${compact ? 'px-3 py-2' : 'px-3.5 py-2'}`}
        >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {!compact && <span>Download App</span>}
        </button>
    );
}
