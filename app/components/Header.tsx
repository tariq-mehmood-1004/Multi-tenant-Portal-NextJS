"use client";

import { Bell, Loader, ShoppingCart, X } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { useNotificationstore } from "../store/use-notifications-store";


const THeader = () => {
    const router = useRouter();
    const { items } = useCartStore();
    const { 
        notificationsData,
        fetchNotifications,
        isNotificationLoading
    } = useNotificationstore();

    const [tenantDomain, setTenantDomain] = useState<string>("");
    const [notificationModalOpen, setNotificationModalOpen] = useState<boolean>(false);

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
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationsData?.metadata.length || 0}
                                </span>
                            </>
                        )}
                    </Button>

                    {/* Notifications */}
                    {notificationModalOpen && (
                        <div className="w-[400px] h-[450px] bg-white shadow-xl border-2 rounded-xl absolute top-12 right-0">
                            <div className="relative border-b pb-3">
                                <Button variant="ghost"
                                    onClick={() => setNotificationModalOpen(false)}
                                    className={"w-9 h-9 rounded-full m-0 p-0 absolute -top-2 right-2"}>
                                    <X className="w-4 h-4" />
                                </Button>

                                <h1 className="text-xl font-bold text-center mt-4">Notifications</h1>
                            </div>

                            <div className="mt-1">
                                <ul className="max-h-[350px] overflow-y-scroll">
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

                </div>
            </div>

        </header>

    );
};

export default THeader;