"use client";

import { Button } from "~/components/ui/button";

import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { env } from "~/env";


export default function PaymentDialog({ tier, text }: { tier: "basic" | "pro" | "enterprise", text: string }) {
    const stripePromise = loadStripe(
        env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );

    const fetchClientSecret = useCallback(async () => {
        let priceId;

        switch (tier) {
            case "basic":
                priceId = env.NEXT_PUBLIC_BASIC_PRICE_ID;
                break;
            case "pro":
                priceId = env.NEXT_PUBLIC_PRO_PRICE_ID;
                break;
            case "enterprise":
                priceId = env.NEXT_PUBLIC_ENTERPRISE_PRICE_ID;
                break;
            default:
                throw new Error(`Invalid tier: ${tier}`);
        }

        // Create a Checkout Session
        return fetch("/api/embeded-checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                priceId,
            })
        })
            .then((res) => res.json())
            .then((data) => data.client_secret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="submit" formMethod="post" variant={"default"} className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all">
                    {text}
                </Button>
            </DialogTrigger>
            <DialogContent className="my-4  py-12 xl:max-w-screen-xl ">
                <DialogTitle className="text-xl font-semibold">
                    {tier.charAt(0).toUpperCase() + tier.slice(1)} Membership
                </DialogTitle>

                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout className="max-h-[80dvh]" />
                </EmbeddedCheckoutProvider>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel Payment
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}