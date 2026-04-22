// store/useOrderStore.ts
import {create} from 'zustand';
import { Order } from '../types';

interface OrderState {
    orders: Order[];
    setOrders: (orders: Order[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    setOrders: (orders) => set({ orders }),
}));