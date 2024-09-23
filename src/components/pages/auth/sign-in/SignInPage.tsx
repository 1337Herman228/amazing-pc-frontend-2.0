"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/forms/sign-in-form/SignInForm";

const SignInPage = () => {
    const router = useRouter();

    const { data: session } = useSession();
    const sessionData: ExtendedSession | null = session;

    const [isOk, setIsOk] = React.useState<boolean>(false);

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const authHandleSubmit = async (data: any) => {
        const login = data.login;
        const password = data.password;

        const response = await signIn("credentials", {
            redirect: false,
            login: login,
            password: password,
        });

        if (response?.status === 200 && response.ok) {
            setIsOk(true);
        }

        console.log(response);
    };

    if (sessionData?.user?.role === "admin" && isOk) {
        router.push("/admin");
    } else if (sessionData?.user?.role === "user" && isOk) {
        router.push("/");
    }

    return (
        <section className="centered-container">
            <SignInForm
                handleSubmit={handleSubmit}
                authHandleSubmit={authHandleSubmit}
                register={register}
                unregister={unregister}
                errors={errors}
            />
        </section>
    );
};

export default SignInPage;
