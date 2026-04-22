import {create} from 'zustand';

interface TenantState {
    domain: string;
    setDomain: (domain: string) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
    domain: typeof window !== 'undefined' ? window.location.origin : '',
    setDomain: (domain) => set({ domain }),
}));