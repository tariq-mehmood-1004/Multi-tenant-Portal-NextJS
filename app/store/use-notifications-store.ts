import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Notifications, Pagination } from "../types/types";

interface PropState {
    pagination: Pagination | null;
    notificationsData: Notifications | null;
    isNotificationLoading: boolean;

    fetchNotifications: (params?: { search?: string; page?: number }) => Promise<void>;
}

export const useNotificationstore = create<PropState>((set) => ({
    pagination: null,
    notificationsData: null,
    isNotificationLoading: false,

    fetchNotifications: async (params = { search: "", page: 1 }) => {
        try {
            set({ isNotificationLoading: true });

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/notifications/unread`,
                {
                    params,
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ""}`,
                        "x-tenant-domain":
                            typeof window !== "undefined"
                                ? window.location.origin
                                : ""
                    }
                }
            );

            const { metadata, pagination } = res.data.data || {};

            set({
                notificationsData: {
                    metadata: metadata || [],
                    pagination:
                        pagination || {
                            page: 1,
                            totalPages: 1,
                            totalCount: 0
                        }
                },
                pagination:
                    pagination || {
                        page: 1,
                        totalPages: 1,
                        totalCount: 0
                    },
                isNotificationLoading: false
            });
        } catch (error: any) {
            set({ isNotificationLoading: false });
            toast.error(
                error?.response?.data?.message || "Failed to fetch notifications",
                { position: "bottom-right" }
            );
        }
    }
}));