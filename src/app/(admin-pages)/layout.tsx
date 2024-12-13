"use client";

import "@/styles/style.scss";
import { _SessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import GetSession from "@/components/providers/GetSessionProvider";
import AdminNavbar from "@/components/navbar/admin/admin-navbar/AdminNavbar";
import AntdConfigProvider from "@/components/providers/AntdConfigProvider";

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
                        <GetSession>
                            <AntdConfigProvider>
                                <AdminNavbar />
                                <main className="main-body">{children}</main>
                            </AntdConfigProvider>
                        </GetSession>
                    </body>
                </_SessionProvider>
            </StoreProvider>
        </html>
    );
}
