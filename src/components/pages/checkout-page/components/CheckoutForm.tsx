"use client";

import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/functions/convertToSubcurrency";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/inputs/custom-input/CustomInput";

interface ICheckoutFormFields {
    destination: string;
}

const CheckoutForm = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<ICheckoutFormFields>();

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const stripeSubmit = async (destination: string) => {
        setLoading(true);

        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${
                    window.location.origin
                }/payment-success?amount=${amount}&destination=${encodeURIComponent(
                    destination
                )}`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
        }

        setLoading(false);
    };

    const onSubmit = async (data: ICheckoutFormFields) => {
        await stripeSubmit(data.destination);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center h-[650px]">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="absolute !m-px h-px !w-px overflow-hidden whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 w-[650px] mx-auto p-10 rounded-xl bg-[#2f303cd5]">
            <div className="mb-4 text-sm text-[#999999]">
                ФИО и Контактные данные будут взяты из профиля, если они
                устарели, то пожалуйста актуализируйте их.
            </div>
            <div className="mb-4">
                <CustomInput
                    name="destination"
                    labelText="Адрес доставки"
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    require
                    minLength={4}
                    placeholder="Введите адрес доставки"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {clientSecret && <PaymentElement />}
                {errorMessage && <div>{errorMessage}</div>}
                <button
                    disabled={!stripe || loading}
                    className="text-white w-full bg-black mt-5 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse cursor-pointer py-3 hover:opacity-80 transition-opacity"
                >
                    {!loading ? `Оплатить ${amount} BYN` : "Оплачиваем..."}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
