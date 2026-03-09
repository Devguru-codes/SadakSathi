import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Placeholder — real AI pipeline integration TBD
        // In production this would accept multipart/form-data, run detection, and return results
        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('multipart/form-data')) {
            return NextResponse.json({ message: 'Expected multipart/form-data' }, { status: 400 });
        }

        // Mock response
        return NextResponse.json({
            success: true,
            message: 'Upload received. Processing queued.',
            mockResult: {
                framesAnalyzed: 1200,
                violationsDetected: 24,
                avgConfidence: 92.4,
                heatmapUrl: null,
            },
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
