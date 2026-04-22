// pages/cancel.tsx
"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Cancel() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center text-black p-8">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
            <p className="mb-6 text-gray-700">Your payment has been cancelled. You can try again or continue browsing products.</p>
            <Button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => router.push("/")}
            >
                Return to Home
            </Button>
        </div>
    );
}