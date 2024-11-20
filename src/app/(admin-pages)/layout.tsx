"use client";

import "@/styles/style.scss";
import { _SessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import GetSession from "@/components/providers/GetSessionProvider";

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
            <StoreProvider>
                <_SessionProvider>
                    <body>
                        <GetSession>{children}</GetSession>
                    </body>
                </_SessionProvider>
            </StoreProvider>
        </html>
    );
}
