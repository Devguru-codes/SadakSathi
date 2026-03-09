'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface VoteButtonProps {
    complaintId: string;
    initialCount: number;
    hasVoted: boolean;
}

export default function VoteButton({ complaintId, initialCount, hasVoted: initialHasVoted }: VoteButtonProps) {
    const [count, setCount] = useState(initialCount);
    const [hasVoted, setHasVoted] = useState(initialHasVoted);
    const [loading, setLoading] = useState(false);

    const handleVote = async () => {
        if (hasVoted || loading) return;
        setLoading(true);
        // Optimistic update
        setCount((prev) => prev + 1);
        setHasVoted(true);
        try {
            const res = await fetch('/api/complaints/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complaintId }),
            });
            const data = await res.json();
            if (!res.ok) {
                // Rollback
                setCount((prev) => prev - 1);
                setHasVoted(false);
                toast.error(data.message || 'Failed to cast vote.');
            } else {
                setCount(data.upvoteCount);
                toast.success('Vote cast!');
            }
        } catch {
            setCount((prev) => prev - 1);
            setHasVoted(false);
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleVote}
            disabled={hasVoted || loading}
            title={hasVoted ? 'You have already voted' : 'Upvote this complaint'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                hasVoted
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
        >
            <svg className="w-3.5 h-3.5" fill={hasVoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {count}
        </button>
    );
}
