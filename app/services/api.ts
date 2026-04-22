// services/api.ts
import { Item } from '../types';
import { useTenantStore } from '../store/useTenantStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCheckoutSession = async (items: Item[], successUrl: string, cancelUrl: string) => {
    const tenant = useTenantStore.getState().domain;

    const res = await fetch(`${BASE_URL}/payment/stripe/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-tenant-domain': tenant,
        },
        body: JSON.stringify({ items, successUrl, cancelUrl }),
    });
    return res.json();
};

export const fetchOrders = async (page = 1, limit = 10) => {
    const tenant = useTenantStore.getState().domain;

    const res = await fetch(`${BASE_URL}/orders?page=${page}&limit=${limit}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-tenant-domain': tenant,
        },
    });
    return res.json();
};