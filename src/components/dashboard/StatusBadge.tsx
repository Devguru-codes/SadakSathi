import React from 'react';
import { ComplaintStatus } from '@prisma/client';

interface StatusBadgeProps {
    status: ComplaintStatus | string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    Submitted: { label: 'Submitted', className: 'bg-yellow-100 text-yellow-700' },
    Approved: { label: 'Approved', className: 'bg-blue-100 text-blue-700' },
    OnHold: { label: 'On Hold', className: 'bg-orange-100 text-orange-700' },
    Rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
    Completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
    ResolvedReviewed: { label: 'Resolved', className: 'bg-emerald-100 text-emerald-700' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${config.className}`}>
            {config.label}
        </span>
    );
}
