// store/useOrderStore.ts
import {create} from 'zustand';
import { Order } from '../types';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

export interface Response {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    roleId: number;
    isActive: boolean;
    createdAt: string;
    refreshToken: string;
    qrCode: string;
    role: {
        id: number;
        name: string;
    };
}

interface State {
    isAuthLoading: boolean;
    userData: Response | null;
    fetchAuth: () => void;
}

export const useAuthStore = create<State>((set) => ({
    userData: null,
    isAuthLoading: false,

    fetchAuth: async () => {
        set({ isAuthLoading: true });

        try {
            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { data } = await axiosInstance.get(`/auth`, { headers });

            set({
                userData: data.data || [],
                isAuthLoading: false
            });

        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to authorize");
        } finally {
            set({ isAuthLoading: false });
        }
    },
}));