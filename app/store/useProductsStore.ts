// store/useOrderStore.ts
import {create} from 'zustand';
import { Product } from '../types';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

interface ProductState {
    products: Product[];
    isLoading: boolean;
    get_products: (category: string, peptide?: boolean) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    isLoading: false,

    get_products: async (category, peptide) => {
        set({ isLoading: true });

        try {
            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { data } = await axiosInstance.get(`/products?page=1&limit=100&category=${category}&peptide=${peptide}`, { headers });

            set({
                products: data.data?.metadata || [],
                isLoading: false
            });
        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to sync user");
            set({ isLoading: false });
        }

    },
}));