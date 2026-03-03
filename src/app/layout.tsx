import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "PotholeVision | AI-Powered Pothole Detection System",
    description: "Advanced AI system for real-time pothole detection. Upload images or videos for instant severity mapping and geolocation.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Google Fonts Preconnects */}
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Outfit:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body id="app-root" className="font-primary bg-neutral-background text-text-primary overflow-x-hidden min-h-screen flex flex-col">
                {children}
            </body>
        </html>
    );
}
