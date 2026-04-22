"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Link from "next/link";

interface LineItem {
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
}

interface OrderData {
    session: {
        line_items: { data: LineItem[] };
        amount_total: number;
        currency: string;
        customer_details: {
            address: {
                city: string;
                country: string;
                line1: string;
                line2: string;
                postal_code: string;
                state: string;
            }
        }
    };
    order: {
        id: number;
        status: string;
        amount: number;
        currency: string;
        customerEmail: string | null;
        createdAt: string;
    };
}

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const orderNumber = searchParams.get("orderNumber");
    const token = searchParams.get("token");

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                let data;

                if (orderNumber) {
                    const res = await axiosInstance.post("/payment/oceanpay/verify", { orderNumber });
                    data = res.data;
                } else if (sessionId) {
                    const res = await axiosInstance.post("/payment/stripe/verify", { sessionId });
                    data = res.data;
                } else if (token) {
                    const res = await axiosInstance.post("/payment/paypal/verify", { orderId: token });
                    data = res.data;
                }

                console.log(`DATA:`, data);

                setOrderData(data.data);
            } catch (err: any) {
                console.error(err);
                toast.error("Payment verification failed");
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId, orderNumber, token]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <h2 className="text-xl">Verifying payment...</h2>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-4">Payment Verification Failed</h2>
                <p>Please contact support if the issue persists.</p>
            </div>
        );
    }

    const { session, order } = orderData;
    console.log(JSON.stringify(order));

    return (
        <div className="flex flex-col justify-center items-center text-black">
            <div className="border rounded-lg p-6 w-full max-w-xl">
                <h1 className="text-2xl font-bold mb-2 text-green-600 text-center">Payment Successful!</h1>
                <p className="text-gray-700 mb-4  text-center">
                    Thank you, your order has been processed.
                </p>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Order Details</h2>
                    <p>Order ID: <span className="font-mono">{order.id}</span></p>
                    <p>Email: {order.customerEmail}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div className="bg-zinc-200 px-3 py-2 rounded-lg">
                    <h2 className="font-semibold mb-2">Customer Details</h2>
                    <p><span className="font-semibold">Email: </span>{order.customerEmail}</p>
                    <p><span className="font-semibold">City: </span>{session.customer_details.address.city || "N/A"}</p>
                    <p><span className="font-semibold">Country: </span>{session.customer_details.address.country || "N/A"}</p>
                    <p><span className="font-semibold">Address Line 1: </span>{session.customer_details.address.line1 || "N/A"}</p>
                    <p><span className="font-semibold">Address Line 2: </span>{session.customer_details.address.line2 || "N/A"}</p>
                    <p><span className="font-semibold">Postal Code: </span>{session.customer_details.address.postal_code || "N/A"}</p>
                    <p><span className="font-semibold">State: </span>{session.customer_details.address.state || "N/A"}</p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 font-semibold text-lg">
                    <span>Total:</span>
                    <span>{(order.amount).toLocaleString(undefined, { style: 'currency', currency: session.currency.toUpperCase() })}</span>
                </div>

                <div className="mt-6 flex items-center gap-4 justify-between">
                    <Link
                        href="/"
                        className="px-3 block text-center border text-black py-2 rounded hover:bg-black hover:text-white transition-colors"
                    >
                        Return to Shop
                    </Link>

                    <Link
                        href={`/receipt?session_id=${sessionId}`}
                        target="_blank"
                        className="px-3 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Generate Receipt
                    </Link>
                </div>
            </div>
        </div>
    );
}