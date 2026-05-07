// app/user-profile/page.tsx
"use client";

import { UserProfile } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/use-auth-store";
import { Input } from "@heroui/react";

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
        <div className="flex gap-6">

            {/* Clerk Default */}
            <UserProfile />

            {/* Custom Panel */}
            <div className="w-72 p-4 border-l">
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

                    <div>
                        <strong>Token:</strong>
                        <Input value={userData?.refreshToken} readOnly />
                    </div>
                </div>
            </div>

        </div>
    );
}