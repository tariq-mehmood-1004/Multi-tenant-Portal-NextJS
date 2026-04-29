import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useCartStore } from './useCartStore';


export interface ShippingDetails {
    name: string;
    phone: string;
    address: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    }
}


interface CheckoutItemForm {
    provider?: string;
    customerEmail: string;
    shipping: ShippingDetails;
}

interface CheckoutState {
    isLoading: boolean;
    checkout: (form: CheckoutItemForm) => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    isLoading: false,

    checkout: async (form: CheckoutItemForm) => {
        set({ isLoading: true });

        try {
            const { items, clearCart } = useCartStore.getState();

            if (!items.length) {
                toast.error("The cart is empty");
                set({ isLoading: false });
                return;
            }

            const tenantDomain = window.location.origin;

            const payload = {
                customerEmail: form.customerEmail,
                currency: "USD",
                items: items.map(i => ({
                    productId: i.id,
                    name: i.name,
                    images: i.images,
                    size: i.size,
                    price: i.price,
                    quantity: i.quantity,
                    is_peptide: i.is_peptide,
                    sku: i.sku
                })),
                shipping: form.shipping,
                successUrl: `${tenantDomain}/success`,
                cancelUrl: `${tenantDomain}/cancel`
            };

            let endpoint = "";

            switch (form.provider) {
                case "stripe":
                    endpoint = "/payment/stripe/checkout";
                    break;

                case "paypal":
                    endpoint = "/payment/paypal/checkout";
                    break;

                case "oceanPayment":
                    endpoint = "/payment/oceanpay/checkout";
                    break;

                default:
                    throw new Error("Invalid payment provider");
            }

            console.log(`PAYLOAD:`, payload);

            const { data, status } = await axiosInstance.post(endpoint, payload);
            
            console.log(`CHECKOUT DATA:`, data);
            console.log(`CHECKOUT status:`, status);

            const url = data?.data?.metadata?.checkout_url;

            if (!url) throw new Error("Checkout URL missing");

            if (status === 200) {
                toast.success(`You are being redirected to the checkout page on ${form.provider}...`);

                window.location.href = url;
                clearCart();
            }

        } catch (err: any) {
            console.error("CHECKOUT ERROR: ", err.message || err);
            toast.error(err.message || "Checkout failed");
        } finally {
            set({ isLoading: false });
        }
    }
}));