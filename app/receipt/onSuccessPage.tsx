"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { ShippingDetails } from "../store/useCheckoutStore";
import { Button } from "@heroui/react";

interface Item {
    name: string;
    price: number;
    images: string[];
    quantity: number;
    productId: number;
    is_peptide: boolean;
    size?: string;

}

interface OrderResponse {
    session: {
        id: string;
        payment_status: string;
        status: string;
        total: number;
        currency: string;
        customer_email: string;
        customer_details: {
            address: {
                city: string;
                country: string;
                line1: string;
                line2: string | null;
                postal_code: string;
                state: string;
            };
            name: string;
        };
    };

    order: {
        id: number;
        status: string;
        amount: number;
        currency: string;
        customerEmail: string | null;
        createdAt: string;
    };

    items: Item[];

    shipping: ShippingDetails;
    trackingId?: string;
}

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [orderData, setOrderData] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) return;

        const verifyPayment = async () => {
            try {
                const { data } = await axiosInstance.post("/payment/stripe/verify", {
                    sessionId,
                });

                setOrderData(data.data);
            } catch (err) {
                console.error(err);
                toast.error("Payment verification failed");
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-zinc-50">
                <h2 className="text-lg text-gray-600 animate-pulse">
                    Receipt generating...
                </h2>
            </div>
        );
    }

    if (!orderData) {
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

    const { session, order, items, shipping, trackingId } = orderData;

    const formatAmount = (amount: number, currency: string) =>
        amount.toLocaleString(undefined, {
            style: "currency",
            currency: currency.toUpperCase(),
        });

    return (
        <div className="flex justify-center items-center text-black">
            
            <div className="border rounded-lg w-full max-w-3xl p-6">

                    
                {/* HEADER */}
                <div className="text-center border-b mb-8 pb-4">
                    <h1 className="text-2xl font-bold">Receipt</h1>
                    <p className="text-gray-600 text-sm">
                        Payment Successful
                    </p>
                </div>

                {/* Payment status */}
                <div className="flex justify-between gap-4 font-bold mb-4 text-sm">
                    <span>Payment Status</span>
                    <span className="flex items-center gap-2 text-gray-600">
                        {session.payment_status}
                    </span>
                </div>

                {/* ORDER INFO */}
                <div className="mb-4 text-sm">
                    <p><b>Order ID:</b> {order.id || "N/A"}</p>
                    <p><b>Tracking ID:</b> {trackingId || "N/A"}</p>
                    <p><b>Email:</b> {order.customerEmail || "N/A"}</p>
                    <p>
                        <b>Date:</b>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* ITEMS TABLE */}
                <table className="w-full text-sm border-t border-b">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">Item</th>
                            <th className="py-2 text-center">Risky Product</th>
                            <th className="py-2 text-center">Size</th>
                            <th className="py-2 text-center">Qty</th>
                            <th className="py-2 text-right">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="py-2 flex items-center gap-3">
                                    {item.images?.[0] && (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            width={40}
                                            height={40}
                                            className="rounded object-cover"
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </td>

                                <td className="text-center">
                                    <span className={`
                                        text-center rounded-full py-1 px-3
                                        ${item.is_peptide ? 'bg-red-500 text-white' : 'text-black'}
                                        `}>
                                        {item.is_peptide ? "Yes" : "No"}
                                    </span>
                                </td>

                                <td className="text-center">
                                    {item.size || "-"}
                                </td>

                                <td className="text-center">
                                    {item.quantity}
                                </td>

                                <td className="text-right">
                                    {formatAmount(
                                        item.price * item.quantity,
                                        session.currency
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* TOTAL */}
                <div className="bg-zinc-200">
                    <div className="flex justify-between font-bold mt-4 py-2">
                        <span>Total</span>
                        <span>
                            {formatAmount(
                                session.total,
                                session.currency
                            )}
                        </span>
                    </div>
                </div>

                {/* CUSTOMER */}
                <div className="rounded mt-4 text-sm">
                    <h2 className="text-lg font-bold mb-2">Shipping details:</h2>
                    <p><b>Phone:</b> {shipping.phone}</p>
                    <p><b>Name:</b> {shipping.name}</p>
                    <p><b>City:</b> {shipping.address.city}</p>
                    <p><b>Country:</b> {shipping.address.country}</p>
                    <p><b>Address:</b> {shipping.address.line1}</p>
                    {shipping.address.line2 && (
                        <p><b>Address 2:</b> {shipping.address.line2}</p>
                    )}
                    <p><b>Postal:</b> {shipping.address.postal_code}</p>
                    <p><b>State:</b> {shipping.address.state}</p>
                    <p><b>Country:</b> {shipping.address.country}</p>
                </div>
            </div>
        </div>
    );
}