// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ExtendedJWT } from "./pages/api/auth/[...nextauth]";

export async function middleware(req: NextRequest) {
    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const token: ExtendedJWT | null = await getToken({ req, secret });

        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        // Извлекаем роль пользователя из токена
        const userRole = token?.user?.role; // Например, 'admin' или 'user'

        // Проверка доступа к маршруту /admin
        if (req.nextUrl.pathname.startsWith("/admin") && userRole !== "admin") {
            // Если роль не admin, перенаправляем на страницу "Unauthorized"
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error in middleware:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/",
        "/admin/:path*",
        "/gaming-pc/:path*",
        "/notebook:path*",
        "/workstation:path*",
    ],
};
