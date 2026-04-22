// store/useCartStore.ts
import { create } from 'zustand';
import { Product } from '../types';
import { parsePrice } from '../utils/priceParser';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    images: string[];
    is_peptide?: boolean;
    size?: string;
    sku?: string;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (name: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],

    addToCart: (product: any) =>
        set((state) => {
            const price = parsePrice(product.sale_price || product.regular_price);
            const size = product.selectedSize;

            const existing = state.items.find(
                i => i.id === product.id && i.size === size
            );

            if (existing) {
                return {
                    items: state.items.map(i =>
                        i.id === product.id && i.size === size
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                };
            }

            return {
                items: [
                    ...state.items,
                    {
                        id: product.id,
                        name: product.title,
                        price,
                        quantity: 1,
                        images: [product.image],
                        is_peptide: product.is_peptide,
                        size: size || null,
                        sku: product.sku
                    }
                ]
            };
        }),

    removeFromCart: (name) =>
        set((state) => ({
            items: state.items.filter(i => i.name !== name)
        })),

    clearCart: () => set({ items: [] }),
}));