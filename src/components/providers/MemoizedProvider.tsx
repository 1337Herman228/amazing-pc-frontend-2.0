"use client";

import { IUserSession } from "@/interfaces/types";
import { useAppDispatch } from "@/lib/redux/store/store";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { memo } from "react";
import { setState } from "@/lib/redux/store/slices/sessionSlice";

interface MemoizedProviderProps {
    session: ExtendedSession;
    children: React.ReactNode;
}

const MemoizedProvider = memo(
    ({ children, session }: MemoizedProviderProps) => {
        const dispath = useAppDispatch();
        const token = session?.user?.authenticationResponse?.token ?? "";
        const user = session?.user as IUserSession;

        dispath(setState({ session, user, token }));

        return children;
    }
);

export default MemoizedProvider;
