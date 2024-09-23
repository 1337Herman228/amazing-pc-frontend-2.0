// pages/api/auth/[...nextauth].ts
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
    authenticationResponse?: {
        token: string;
    };
    role?: string;
    userId?: number;
}

export interface ExtendedJWT extends JWT {
    user?: ExtendedUser;
    // name?: string | null
    // email?: string | null
    // picture?: string | null
    // sub?: string
}

export interface ExtendedSession extends Session {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        userId?: number | null;
        authenticationResponse?: {
            token: string;
        };
        role?: string;
    };
}

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "login", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(
                    "http://localhost:8080/auth/authenticate",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    }
                );

                const user: ExtendedUser = await res.json();

                if (res.ok && user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: ExtendedJWT; user: ExtendedUser }) {
            if (user) {
                // Сохраняем данные пользователя в токен
                token.user = user; // Храните пользователя в токене
            }
            return token;
        },
        async session({
            session,
            token,
        }: {
            session: ExtendedSession;
            token: ExtendedJWT;
        }) {
            // Добавляем данные пользователя в сессию
            session.user = token.user; // Извлекаем пользователя из токена
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
        signOut: "/sign-in",
    },
};

export default NextAuth(options);
