import React from 'react';

interface ViolationBadgeProps {
    status: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    challan_issued: { label: 'Challan Issued', className: 'bg-red-100 text-red-700' },
    detected: { label: 'Detected', className: 'bg-yellow-100 text-yellow-700' },
    warning: { label: 'Warning', className: 'bg-yellow-100 text-yellow-700' },
    cleared: { label: 'Cleared', className: 'bg-green-100 text-green-700' },
};

const VIOLATION_LABELS: Record<string, string> = {
    helmet_violation: 'No Helmet',
    triple_riding: 'Triple Riding',
    wrong_side: 'Wrong Side',
    plate_detection: 'Plate Detection',
};

export function ViolationBadge({ status }: ViolationBadgeProps) {
    const config = STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${config.className}`}>
            {config.label}
        </span>
    );
}

export function ViolationTypeBadge({ type }: { type: string }) {
    const label = VIOLATION_LABELS[type] ?? type;
    return (
        <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-brand-primary/10 text-brand-primary">
            {label}
        </span>
    );
}

export const VIOLATION_LABELS_MAP = VIOLATION_LABELS;
