import toast from 'react-hot-toast';
import {create} from 'zustand';
import axiosInstance from '../utils/axiosInstance';


export interface StoreResponse {
    id: number;
    platform: string;
    storeName: string;
    storeUrl: string;
    accessToken: string;
    apiKey: string;
    apiSecret: string;
    isActive: boolean;
};

export interface MigrationJobResponse {
    id: string;
    sourcePlatform: {
        platform: string;
    };
    targetPlatform: {
        platform: string;
    };
    tables: string[];
    mode: string;    // full, partial/delta
    status: string; // pending | running | completed | failed
};

export interface Stores {
    platform: string;
    storeName: string;
    storeUrl: string;
    accessToken: string;
    apiKey: string;
    apiSecret: string;
    isActive: boolean;
};

export type MODE = 'full' | 'delta';
export interface MigrationJobs {
    sourceStoreId: number;
    targetStoreId: number;
    tables: string[];
    mode: MODE;
}

interface TenantState {
    domain: string;
    setDomain: (domain: string) => void;

    isAddingStore: boolean;
    addNewStore: (store: Stores) => void;

    isFetchingStores: boolean;
    stores: StoreResponse[];
    fetchStores: () => void;

    isDeletingStore: boolean;
    deleteStore: (id: number) => void;

    isUpdatingStore: boolean;
    updateStore: (store: StoreResponse) => void;

    isMigrationJobsLoading: boolean;
    migrationJobs: MigrationJobResponse[];
    fetchMigrationJobs: () => void;

    isMigrationJobDeleting: boolean;
    deleteMigrationJob: (id: string) => void;

    isMigrationJobRunning: boolean;
    runMigration: (migration: MigrationJobs) => Promise<void>;
}

export const useTenantStore = create<TenantState>((set, get) => ({
    domain: typeof window !== 'undefined' ? window.location.origin : '',
    isFetchingStores: false,
    isAddingStore: false,
    isDeletingStore: false,
    isUpdatingStore: false,
    isMigrationJobRunning: false,
    isMigrationJobsLoading: false,
    isMigrationJobDeleting: false,
    stores: [],
    migrationJobs: [],

    setDomain: (domain) => set({ domain }),

    runMigration: async (migration) => {

        set({ isMigrationJobRunning: true });

        try {

            // check fields are not empty
            if (!migration.sourceStoreId || !migration.targetStoreId || !migration.tables || !migration.mode) {
                toast.error('Please fill in all fields');
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { statusText } = await axiosInstance.post(
                `/swiftify-migrator/migration/run`,
                migration,
                { headers }
            );

            console.log(`statusText: ${statusText}`);

            if (statusText === 'Created') {
                toast.success('Migration started successfully');
            }

        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message);
        } finally {
            set({ isMigrationJobRunning: false });
        }

        get().fetchMigrationJobs();
    },

    addNewStore: async (store) => {
        
        set({ isAddingStore: true });

        try {

            // check fields are not empty
            if (!store.platform || !store.storeName || !store.storeUrl || !store.accessToken || !store.apiKey || !store.apiSecret) {
                toast.error('Please fill in all fields');
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { statusText } = await axiosInstance.post(
                `/swiftify-migrator/stores`,
                store,
                { headers }
            );

            console.log(`statusText: ${statusText}`);
            
            if (statusText === 'Created') {
                toast.success('Store added successfully');
                get().fetchStores();
            }
            
        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to add store");
        } finally {
            set({ isAddingStore: false });
        }
    },
    
    updateStore: async (store) => {
        
        set({ isUpdatingStore: true });

        try {

            // check fields are not empty
            if (!store.platform || !store.storeName || !store.storeUrl || !store.accessToken || !store.apiKey || !store.apiSecret) {
                toast.error('Please fill in all fields');
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { statusText } = await axiosInstance.put(
                `/swiftify-migrator/stores?id=${store.id}`,
                store,
                { headers }
            );

            console.log(`statusText: ${statusText}`);
            
            if (statusText === 'OK') {
                toast.success('Store updated successfully');
                get().fetchStores();
            }
            
        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to add store");
        } finally {
            set({ isUpdatingStore: false });
        }
    },

    fetchStores: async () => {
        set({ isFetchingStores: true });

        try {
            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { data } = await axiosInstance.get(`/swiftify-migrator/stores`, { headers });
            
            set({
                stores: data.data?.metadata || [],
                isFetchingStores: false
            });

        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to fetch stores");
        } finally {
            set({ isFetchingStores: false });
        }
    },

    deleteStore: async (id) => {
        set({ isDeletingStore: true });

        try {
            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { statusText } = await axiosInstance.delete(`/swiftify-migrator/stores/?id=${id}`, { headers });
            console.log(`statusText: ${statusText}`);

            if (statusText === 'OK') {
                toast.success('Store deleted successfully');

                const stores = useTenantStore.getState().stores.filter(s => s.id !== id);
                useTenantStore.setState({ stores });

                // reload the page
                window.location.reload();
            }
            
        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to delete store");
        } finally {
            set({ isDeletingStore: false });
        }
    },

    fetchMigrationJobs: async () => {
        set({ isMigrationJobsLoading: true });

        try {
            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { data } = await axiosInstance.get(`/swiftify-migrator/migration-jobs`, { headers });

            set({
                migrationJobs: data.data?.metadata || [],
                isMigrationJobsLoading: false
            });

        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to fetch migration jobs");
        } finally {
            set({ isMigrationJobsLoading: false });
        }
    },

    deleteMigrationJob: async (id) => {
        set({ isMigrationJobDeleting: true });

        try {
            const headers = {
                'Content-Type': 'application/json',
                'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
            };

            const { statusText } = await axiosInstance.delete(`/swiftify-migrator/migration-jobs?id=${id}`, { headers });
            console.log(`statusText: ${statusText}`);

            toast.success('Migration deleted successfully');

            const stores = useTenantStore.getState().migrationJobs.filter(s => s.id !== id);
            useTenantStore.setState({ migrationJobs: stores });

        } catch (err: any) {
            console.error(err.message || err);
            toast.error(err.message || "Failed to delete migration job");
        } finally {
            set({ isMigrationJobDeleting: false });
        }
    },
}));