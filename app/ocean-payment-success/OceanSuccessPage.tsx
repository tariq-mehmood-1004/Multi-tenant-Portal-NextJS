"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Link from "next/link";

interface Order {
    id: number;
    orderNumber: string;
    amount: number;
    currency: string;
    status: string;
    trackingId: string;
}

interface Item {
    name: string;
    size?: string;
    price: number;
    quantity: number;
    images: string[];
    productId: number;
    is_peptide: boolean;
}

interface Shipping {
    name: string;
    phone: string;
    address: {
        city: string;
        line1: string;
        line2?: string;
        state: string;
        country: string;
        postal_code: string;
    };
}

interface OceanVerifyResponse {
    order: Order;
    items: Item[];
    shipping: Shipping;
}

export default function OceanSuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");

    const [data, setData] = useState<OceanVerifyResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            try {
                if (!orderNumber) {
                    throw new Error("Missing order number");
                }

                const res = await axiosInstance.post(
                    "/payment/oceanpay/verify",
                    { orderNumber }
                );

                setData(res.data.data);
            } catch (err) {
                toast.error("Payment verification failed");
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [orderNumber]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-zinc-50">
                <h2 className="text-lg text-gray-600 animate-pulse">
                    Verifying payment...
                </h2>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-zinc-50 p-4 text-black">
                <h2 className="text-2xl font-bold text-red-600">
                    Payment Verification Failed
                </h2>
                <Link
                    href="/"
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Return to Shop
                </Link>
            </div>
        );
    }

    const { order, items, shipping } = data;

    const formatAmount = (amount: number, currency: string) =>
        amount.toLocaleString(undefined, {
            style: "currency",
            currency: currency.toUpperCase(),
        });

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="flex justify-center items-center text-black">
            <div className="border rounded-lg w-full max-w-3xl p-6">

                {/* HEADER (same structure as SuccessPage) */}
                <div className="text-center border-b mb-8 pb-4">
                    <h1 className="text-2xl font-bold text-green-600">
                        Payment Successful
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Your order has been confirmed
                    </p>
                </div>

                {/* ORDER STATUS */}
                <div className="flex justify-between font-bold mb-4 text-sm">
                    <span>Order Status</span>
                    <span className="text-gray-700">{order.status}</span>
                </div>

                <div className="flex justify-between font-bold mb-4 text-sm">
                    <span>Provider</span>
                    <span className="text-gray-700">Ocean Payment</span>
                </div>

                {/* ORDER INFO */}
                <div className="mb-4 text-sm space-y-1">
                    <p><b>Order Number:</b> {order.orderNumber}</p>
                    <p><b>Tracking ID:</b> {order.trackingId}</p>
                    <p><b>Order ID:</b> {order.id}</p>
                </div>

                {/* ITEMS TABLE (same structure style as Stripe page) */}
                <table className="w-full text-sm border-t border-b">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">Item</th>
                            <th className="py-2 text-center">Type</th>
                            <th className="py-2 text-center">Size</th>
                            <th className="py-2 text-center">Qty</th>
                            <th className="py-2 text-right">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="py-2 flex items-center gap-3">
                                    {item.images?.[0] && (
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </td>

                                <td className="text-center">
                                    <span
                                        className={
                                            item.is_peptide
                                                ? "text-red-600 font-semibold"
                                                : "text-gray-600"
                                        }
                                    >
                                        {item.is_peptide ? "Peptide" : "Standard"}
                                    </span>
                                </td>

                                <td className="text-center">
                                    {item.size || "-"}
                                </td>

                                <td className="text-center">
                                    {item.quantity}
                                </td>

                                <td className="text-right">
                                    {formatAmount(item.price * item.quantity, order.currency)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* TOTAL (Stripe style consistency) */}
                <div className="flex justify-between font-bold mt-4 py-2 border-t">
                    <span>Total</span>
                    <span>
                        {formatAmount(total, order.currency)}
                    </span>
                </div>

                {/* SHIPPING */}
                <div className="mt-4 text-sm">
                    <h2 className="text-lg font-bold mb-2">Shipping Details</h2>
                    <p><b>Name:</b> {shipping.name}</p>
                    <p><b>Phone:</b> {shipping.phone}</p>
                    <p>
                        <b>Address:</b>{" "}
                        {`${shipping.address.line1}, ${shipping.address.city}, ${shipping.address.state}, ${shipping.address.country}`}
                    </p>
                    {shipping.address.line2 && (
                        <p><b>Address 2:</b> {shipping.address.line2}</p>
                    )}
                    <p><b>Postal Code:</b> {shipping.address.postal_code}</p>
                </div>

                {/* ACTIONS (same layout style as Stripe page) */}
                <div className="mt-6 flex justify-between">
                    <Link
                        href="/"
                        className="border px-4 py-2 rounded hover:bg-black hover:text-white"
                    >
                        Return to Shop
                    </Link>
                </div>

            </div>
        </div>
    );
}