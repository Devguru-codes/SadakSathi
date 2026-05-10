import { prisma } from '@/lib/prisma';

// ─── Configuration ────────────────────────────────────────────────────────────
/** Maximum distance (in meters) to consider two complaints the same issue. */
const DUPLICATE_RADIUS_METERS = 300;

/** Only look at complaints submitted within this many days. */
const DUPLICATE_WINDOW_DAYS = 30;
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Haversine formula — returns the great-circle distance between two
 * (lat, lng) pairs in **meters**.
 */
function haversineDistance(
    lat1: number, lng1: number,
    lat2: number, lng2: number,
): number {
    const R = 6_371_000; // Earth's radius in metres
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Checks whether a newly created complaint is a geographic duplicate of an
 * existing one.
 *
 * Strategy:
 *  1. Skip the check if the submission has no GPS coordinates.
 *  2. Pull all **non-duplicate** complaints of the **same issueType** submitted
 *     within the last `DUPLICATE_WINDOW_DAYS` days that have coordinates —
 *     excluding the complaint we just created.
 *  3. Compute the Haversine distance to each candidate.
 *  4. If any candidate is within `DUPLICATE_RADIUS_METERS`, mark the new
 *     complaint as a duplicate of the *oldest* matching one (so we always
 *     link back to the root report, not an intermediate duplicate).
 *
 * @param newComplaintId  The ID of the complaint that was just created.
 * @param issueType       Issue type string (e.g. "Pothole").
 * @param lat             Latitude of the new complaint (may be null).
 * @param lng             Longitude of the new complaint (may be null).
 * @returns               The original complaint's ID if a duplicate was found,
 *                        otherwise `null`.
 */
export async function checkAndFlagDuplicate(
    newComplaintId: string,
    issueType: string,
    lat: number | null,
    lng: number | null,
): Promise<string | null> {
    // ── 1. Cannot geo-check without coordinates ────────────────────────────
    if (lat === null || lng === null) return null;

    // ── 2. Fetch candidate complaints ──────────────────────────────────────
    const windowStart = new Date();
    windowStart.setDate(windowStart.getDate() - DUPLICATE_WINDOW_DAYS);

    const candidates = await prisma.complaint.findMany({
        where: {
            id:          { not: newComplaintId },
            issueType,
            isDuplicate: false,
            latitude:    { not: null },
            longitude:   { not: null },
            createdAt:   { gte: windowStart },
        },
        select: {
            id:        true,
            latitude:  true,
            longitude: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'asc' }, // oldest first → we'll pick the root
    });

    // ── 3. Find the closest candidate within the radius ────────────────────
    let originalId: string | null = null;

    for (const c of candidates) {
        if (c.latitude === null || c.longitude === null) continue;

        const dist = haversineDistance(lat, lng, c.latitude, c.longitude);

        if (dist <= DUPLICATE_RADIUS_METERS) {
            originalId = c.id; // already ordered oldest-first, so first match = root
            break;
        }
    }

    // ── 4. Flag the new complaint if a duplicate was found ─────────────────
    if (originalId) {
        await prisma.complaint.update({
            where: { id: newComplaintId },
            data: {
                isDuplicate:      true,
                originalReportId: originalId,
                remarks:          `Automatically flagged as a duplicate of report #${originalId} (within ${DUPLICATE_RADIUS_METERS}m).`,
            },
        });
    }

    return originalId;
}
