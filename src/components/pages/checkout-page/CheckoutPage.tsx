"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/functions/convertToSubcurrency";
import CheckoutForm from "./components/CheckoutForm";
import { useAppSelector } from "@/lib/redux/store/store";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { notification } from "antd";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Что-то пошло не так...",
        });
    };

    const cart = useAppSelector((state) => state.cart);

    const amount = cart.items?.reduce(
        (a, b) => a + b.product.price * b.quantity,
        0
    ) as number;

    if (!amount) return <LoadingPage />;

    return (
        <div>
            <div className="">
                <Elements
                    stripe={stripePromise}
                    options={{
                        appearance: {
                            theme: "night",
                        },
                        mode: "payment",
                        amount: convertToSubcurrency(amount),
                        currency: "usd",
                    }}
                >
                    <CheckoutForm amount={amount} />
                </Elements>
            </div>
        </div>
    );
};

export default CheckoutPage;
