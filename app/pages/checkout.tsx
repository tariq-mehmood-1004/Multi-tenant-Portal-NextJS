"use client";

import { useCartStore } from '../store/useCartStore';
import { createCheckoutSession } from '../services/api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Checkout() {
    const items = useCartStore((state) => state.items);

    const handleCheckout = async () => {
        const tenant = window.location.origin;
        const successUrl = `${tenant}/success`;
        const cancelUrl = `${tenant}/cancel`;

        const session = await createCheckoutSession(items, successUrl, cancelUrl);
        if (session?.data?.url) {
            window.location.href = session.data.url;
        } else {
            toast.error("Failed to create checkout session");
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <ul>
                {items.map((i) => (
                    <li key={i.name}>
                        {i.name} x {i.quantity} = ${i.price * i.quantity}
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Pay Now</button>
        </div>
    );
}