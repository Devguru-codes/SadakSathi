'use client';

import React from 'react';

const TABS = [
    { id: 'helmet', label: 'No Helmet' },
    { id: 'triple', label: 'Triple Riding' },
    { id: 'wrong_side', label: 'Wrong Side' },
    { id: 'plate', label: 'Plate Detection' },
];

interface TrafficTabsProps {
    active: string;
    onChange: (id: string) => void;
}

export default function TrafficTabs({ active, onChange }: TrafficTabsProps) {
    return (
        <div className="flex gap-1 border-b border-border-light">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`px-5 py-3 text-sm font-medium transition-all relative ${
                        active === tab.id
                            ? 'text-text-primary font-bold'
                            : 'text-text-secondary hover:text-text-primary'
                    }`}
                >
                    {tab.label}
                    {active === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
