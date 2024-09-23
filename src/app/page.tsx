"use client";

import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    const sessionData: ExtendedSession | null = session;
    // console.log(session);

    if (!session) {
        return <div>Loading...</div>; // or a loading spinner
    }

    return (
        <>
            <div>Welcome to your dashboard, {sessionData?.user?.userId}!</div>
            <button onClick={() => signOut({ callbackUrl: "/sign-in" })}>
                Sign out
            </button>
        </>
    );
}
