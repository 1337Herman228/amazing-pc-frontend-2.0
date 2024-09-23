"use client";

import "@/styles/style.scss";
import { _SessionProvider } from "@/components/providers/SessionProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Amazing PC</title>
            </head>
            <_SessionProvider>
                <body>{children}</body>
            </_SessionProvider>
        </html>
    );
}
