// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ExtendedJWT } from "./pages/api/auth/[...nextauth]";

// Узнаем просрочен ли токен
function isTokenExpired(expiredTime: Date) {
    const currentTime = new Date(); // Текущее время
    return expiredTime < currentTime; // true, если токен просрочен
}

// Декодируем токен для получения даты просрочки
function decodeJWT(token: string) {
    const payload = token.split(".")[1]; // Получаем часть payload
    const decodedPayload = JSON.parse(atob(payload)); // Декодируем Base64
    return decodedPayload;
}

export async function middleware(req: NextRequest) {
    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const token: ExtendedJWT | null = await getToken({ req, secret });

        // Если токена нет или он просрочен, то редиректим на страницу авторизации
        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        const decodedToken = decodeJWT(
            token?.user?.authenticationResponse?.token as string
        );
        const expirationDate = new Date(decodedToken.exp * 1000); // Преобразуем в милисекунды
        if (isTokenExpired(expirationDate)) {
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
        "/configurator:path*",
        "/cart:path*",
        "/catalog:path*",
        "/my-configurations:path*",
        "/my-purchases:path*",
    ],
};
