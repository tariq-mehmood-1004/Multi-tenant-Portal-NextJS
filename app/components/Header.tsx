"use client";

import { Bell, DotIcon, LayoutDashboard, Loader, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { useNotificationstore } from "../store/use-notifications-store";
import { useAuthStore } from "../store/use-auth-store";
import {
    Show,
    SignInButton,
    SignOutButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs';


const THeader = () => {
    const router = useRouter();
    const { items } = useCartStore();
    const {
        notificationsData,
        fetchNotifications,
        isNotificationLoading
    } = useNotificationstore();

    const {
        fetchAuth,
        isAuthLoading
    } = useAuthStore();

    const [tenantDomain, setTenantDomain] = useState<string>("");
    const [notificationModalOpen, setNotificationModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchAuth();
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setTenantDomain(window.location.origin);
        }
    }, []);

    // Initial load
    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchNotifications();
        }
    }, []);

    const goHome = () => {
        router.push("/");
    };

    const goCart = () => {
        router.push("/cart");
    };
    
    const notificationLength = notificationsData?.metadata?.length ?? 0;

    const notificationCount =
        notificationLength > 99
            ? "99+"
            : notificationLength;
    return (
        <header className="w-full bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* LEFT - Brand / Tenant */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost"
                        onClick={goHome}
                        className="text-xl font-bold text-black tracking-tight"
                    >
                        SwiftNine Store
                    </Button>

                    {tenantDomain && (
                        <span className="hidden md:inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tenantDomain}
                        </span>
                    )}
                </div>

                {/* RIGHT - Actions */}
                <div className="flex items-center gap-3 relative">

                    {/* Button - Migrator */}
                    <Button
                        variant="outline"
                        onClick={() => router.push("/swiftify-migrator")}
                        className="text-sm font-medium text-gray-500 hover:text-gray-600"
                    >
                        SwiftifY Migrator
                    </Button>

                    <Button variant="outline" onClick={goCart} isDisabled={items.length === 0} className="relative w-10 h-10 p-0 flex items-center justify-center rounded-full border-gray-300 hover:bg-gray-100">
                        <ShoppingCart size={18} className="inline mb-1" />{" "}
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {items.map(i => i.quantity).reduce((a, b) => a + b, 0)}
                        </span>
                    </Button>

                    <Button variant="outline" onClick={() => setNotificationModalOpen(true)} className="relative bg-zinc-900 text-white w-10 h-10 p-0 flex items-center justify-center rounded-full border-gray-300 hover:bg-zinc-900/80 transition-all duration-300">
                        {isNotificationLoading ? <Loader className="animate-spin" /> : (
                            <>
                                <Bell size={18} className="inline mb-1" />{" "}
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            </>
                        )}
                    </Button>

                    {/* Notifications */}
                    {notificationModalOpen && (
                        <div className="max-[767px]:w-[350px] w-[400px] max-h-[480px] overflow-hidden bg-white shadow-xl border-2 rounded-xl absolute top-12 right-0">
                            <div className="relative border-b pb-3">
                                <Button variant="ghost"
                                    onClick={() => setNotificationModalOpen(false)}
                                    className={"w-9 h-9 rounded-full m-0 p-0 absolute -top-2 right-2"}>
                                    <X className="w-4 h-4" />
                                </Button>

                                <h1 className="text-xl font-bold text-center mt-4">Notifications</h1>
                            </div>

                            <div className="mt-1">
                                <ul className="h-[380px] overflow-y-scroll">
                                    {notificationsData?.metadata.map((n, i) => (
                                        <li key={i} className="p-2 px-4 border-b hover:bg-gray-100 transition-all duration-300">
                                            <div className="flex flex-col gap-1">
                                                <h2 className="text-md font-semibold">{n.title}</h2>
                                                <p className="text-gray-600 text-sm">{n.message}</p>
                                                <span className="w-fit text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{n.createdAt}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {isAuthLoading ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <div className="flex items-center gap-3">

                            <Show when="signed-out">
                                <div className="flex items-center gap-3">
                                    <SignInButton mode="modal">
                                        <Button className="rounded-lg px-3 py-1 border-0 dark:border-[#373737] dark:hover:bg-[#373737]/80 transition ease-in duration-200">Login</Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button className="bg-gray-100 hover:bg-gray-300 rounded-lg px-3 py-1 dark:bg-[#212121] dark:hover:bg-[#212121]/80 transition ease-in duration-200">
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </div>
                            </Show>

                            <Show when="signed-in">
                                <SignInButton mode="modal">
                                    <UserButton>
                                            <UserButton.MenuItems>
                                                <UserButton.Action
                                                    label="Profile"
                                                    labelIcon={<User className="w-4 h-4" />}
                                                    onClick={() => router.push("/user-profile")}
                                                />
                                            </UserButton.MenuItems>
                                    </UserButton>
                                </SignInButton>
                            </Show>
                        </div>
                    )}

                </div>
            </div>

        </header>

    );
};

export default THeader;