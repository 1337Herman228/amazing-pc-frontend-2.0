"use client";

import "@/styles/style.scss";
import { _SessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import UserNavbar from "@/components/navbar/user/user-navbar/UserNavbar";
import UserFooter from "@/components/footer/user/UserFooter";

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
                        <UserNavbar />
                        <main className="main-body">{children}</main>
                        <UserFooter />
                    </body>
                </_SessionProvider>
            </StoreProvider>
        </html>
    );
}
