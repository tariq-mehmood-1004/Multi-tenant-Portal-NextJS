export interface Item {
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    tenantId: number;
    stripeSessionId: string;
    amount: number;
    currency: string;
    status: string;
    customerEmail?: string | null;
    metadata?: Record<string, any> | null;
    createdAt: string;
}

interface Inventory {
    id: number;
    productId: number;
    tenantId: number;
    sku?: string | null;
    quantity: number;
    reserved: number;
    lowStockAt?: number | null;
    isTracked: boolean;
    updatedAt: string;
}

export interface Product {
    id: number;
    title: string;
    regular_price: string,
    sale_price: string;
    link: string;
    image: string;
    available_sizes: string[];
    category: string;
    is_peptide: boolean;
    inventory: Inventory[];
}