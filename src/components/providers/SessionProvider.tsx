import { SessionProvider } from "next-auth/react";

export const _SessionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};
