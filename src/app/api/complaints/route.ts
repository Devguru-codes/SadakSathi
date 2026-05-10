import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { checkAndFlagDuplicate } from '@/lib/duplicateDetection';

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized — please log in to submit a complaint.' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || !payload.id) {
            return NextResponse.json({ message: 'Unauthorized — invalid session.' }, { status: 401 });
        }

        const userId = payload.id as string;
        const body = await req.json();

        const { issueType, description, street, city, state, zipcode, latitude, longitude, evidenceUrl, videoUrl } = body;

        // Validate required fields
        if (!issueType || !description || !street || !city || !state || !zipcode) {
            return NextResponse.json(
                { message: 'Missing required fields: issueType, description, street, city, state, zipcode.' },
                { status: 400 }
            );
        }

        const complaint = await prisma.complaint.create({
            data: {
                userId,
                issueType,
                description,
                street,
                city,
                state,
                zipcode,
                latitude:   latitude   ? parseFloat(latitude)   : null,
                longitude:  longitude  ? parseFloat(longitude)  : null,
                evidenceUrl: evidenceUrl ?? null,
                videoUrl:    videoUrl   ?? null,
                status: 'Submitted',
            },
        });

        // ── Automatic duplicate detection ──────────────────────────────────
        // Run geo-proximity check against recent complaints of the same type.
        // This updates the DB record in-place if a duplicate is found.
        const parsedLat = latitude  ? parseFloat(latitude)  : null;
        const parsedLng = longitude ? parseFloat(longitude) : null;

        const duplicateOfId = await checkAndFlagDuplicate(
            complaint.id,
            issueType,
            parsedLat,
            parsedLng,
        );
        // ─────────────────────────────────────────────────────────────────────

        // Log activity
        await prisma.userActivity.create({
            data: {
                userId,
                action: 'complaint_submitted',
                details: duplicateOfId
                    ? `Submitted complaint #${complaint.id} for ${issueType} — auto-flagged as duplicate of #${duplicateOfId}`
                    : `Submitted complaint #${complaint.id} for ${issueType}`,
            },
        });

        return NextResponse.json(
            {
                success: true,
                complaintId:  complaint.id,
                isDuplicate:  !!duplicateOfId,
                duplicateOf:  duplicateOfId ?? null,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error creating complaint:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
