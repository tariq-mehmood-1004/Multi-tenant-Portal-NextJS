// app/user-profile/page.tsx
"use client";

import { useAuthStore } from "@/app/store/use-auth-store";
import { UserProfile } from "@clerk/nextjs";
import { Button, Input } from "@heroui/react";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CustomUserProfile() {
    const {
        fetchAuth,
        isAuthLoading,
        userData
    } = useAuthStore();

    useEffect(() => {
        fetchAuth();
    }, []);

    return (
        <div className="flex gap-6 w-full flex items-center justify-center ">
            <div className="flex gap-6 max-auto max-w-7xl bg-blue-100 rounded-lg p-4 container">

                {/* Clerk Default */}
                <UserProfile />

                {/* Custom Panel */}
                <div className="w-72 p-4">
                    <h2 className="font-bold text-lg mb-4">Account QR</h2>

                    {userData?.qrCode && (
                        <Image
                            src={userData.qrCode}
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg"
                        />
                    )}

                    <div className="mt-4 text-sm space-y-1">
                        <p><strong>Name:</strong> {userData?.username}</p>
                        <p><strong>Email:</strong> {userData?.email}</p>
                        <p><strong>Role:</strong> {userData?.role.name}</p>

                        <div className="flex flex-col gap-1">
                            <strong>Token:</strong>
                            <div className="relative w-full">
                                <Input value={userData?.refreshToken} readOnly className={" rounded-lg shadow-none w-full"} />
                                <Button onPress={() =>
                                    navigator.clipboard.writeText(userData?.refreshToken || "")
                                    .then(() => {
                                        toast.success("Token copied to clipboard");
                                    })
                                    .catch(() => {
                                        toast.error("Failed to copy token to clipboard");
                                    })
                                    
                                } className="absolute w-7 h-7 right-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white p-2 rounded-full">
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}