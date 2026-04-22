"use client";

import Image from 'next/image';
import { useCartStore } from '../store/useCartStore';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { Button } from '@heroui/react';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { SiDigitalocean, SiPaypal, SiStripe } from 'react-icons/si';
import { BiArrowBack } from 'react-icons/bi';

const Cart = () => {
    const { items, removeFromCart } = useCartStore();
    const { checkout } = useCheckoutStore();
    const [loadingMethod, setLoadingMethod] = useState<string | null>(null);

    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: ''
    });

    const [shipping, setShipping] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = async (method: "stripe" | "paypal" | "oceanPayment") => {
        try {
            setLoadingMethod(method);

            await checkout({
                provider: method,
                customerEmail: customer.email,
                shipping: {
                    name: `${customer.firstName} ${customer.lastName}`,
                    phone: customer.phone,
                    address: {
                        line1: shipping.line1,
                        line2: shipping.line2,
                        city: shipping.city,
                        state: shipping.state,
                        postal_code: shipping.postalCode,
                        country: shipping.country
                    }
                },
            });

        } finally {
            setLoadingMethod(null);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT SECTION */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="outline" onClick={() => window.history.back()} className="w-10 h-10 p-0 flex items-center justify-center rounded-full border-gray-300 hover:bg-gray-100">
                            <BiArrowBack size={20} />
                        </Button>
                        <h2 className="text-2xl font-bold text-black">
                            Checkout
                        </h2>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-black">
                            Customer Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={customer.firstName}
                                onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                                className="border rounded-md px-3 py-2"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={customer.lastName}
                                onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                                className="border rounded-md px-3 py-2"
                            />
                        </div>

                        <div className="mt-4 grid gap-4">
                            <input
                                type="text"
                                placeholder="Phone"
                                value={customer.phone}
                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                className="border rounded-md px-3 py-2"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={customer.email}
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                className="border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Shipping */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-black">
                            Shipping Address
                        </h3>

                        <div className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                value={shipping.line1}
                                onChange={(e) => setShipping({ ...shipping, line1: e.target.value })}
                                className="border rounded-md px-3 py-2"
                            />

                            <input
                                type="text"
                                placeholder="Address Line 2"
                                value={shipping.line2}
                                onChange={(e) => setShipping({ ...shipping, line2: e.target.value })}
                                className="border rounded-md px-3 py-2"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={shipping.city}
                                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                />

                                <input
                                    type="text"
                                    placeholder="State"
                                    value={shipping.state}
                                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={shipping.postalCode}
                                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                />

                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={shipping.country}
                                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                                    className="border rounded-md px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION (SUMMARY) */}
                <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-10">

                    <h3 className="text-lg font-semibold mb-4 text-black">
                        Order Summary
                    </h3>

                    <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                        {items.length === 0 && (
                            <div className="text-center text-gray-500">
                                <Image src="/emptyCart.svg" alt="Empty" width={200} height={200} />
                                <p>Your cart is empty</p>
                            </div>
                        )}

                        {items.map((item) => (
                            <div key={item.name} className="flex justify-between items-center bg-zinc-100 p-2 rounded-lg my-1">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.images?.[0] || '/placeholder.png'}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        unoptimized
                                        className="rounded object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-black">{item.name}</p>
                                        <p className="text-sm text-red-500">{item.is_peptide ? "High risk product" : ""}</p>
                                        <p className="text-xs text-black">Size: {item.size}</p>
                                        <p className="text-xs text-gray-500">
                                            {item.quantity} × ${item.price}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => removeFromCart(item.name)}
                                    className="w-7 h-7 text-xs text-white bg-zinc-900 m-0 py-1 px-2 rounded-full hover:bg-zinc-900/80 transition-all duration-300"
                                >
                                    <Trash size={12} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between font-semibold text-black mb-6">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    {/* Payments */}
                    <div className="flex flex-col gap-3">

                        <Button
                            onPress={() => handleCheckout("stripe")}
                            isDisabled={loadingMethod !== null}
                            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loadingMethod === "stripe" ? "Processing..." : (
                                <div className="flex items-center gap-2">
                                    {/* Stripe icon */}
                                    <SiStripe size={12} />
                                    <span>Pay with Stripe</span>
                                </div>
                            )}
                        </Button>

                        <Button
                            onPress={() => handleCheckout("paypal")}
                            isDisabled={loadingMethod !== null}
                            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loadingMethod === "paypal" ? "Processing..." : (
                                <div className="flex items-center gap-2">
                                    {/* PayPal icon */}
                                    <SiPaypal size={12} />
                                    <span>Pay with PayPal</span>
                                </div>
                            )}
                        </Button>

                        <Button
                            onPress={() => handleCheckout("oceanPayment")}
                            isDisabled={loadingMethod !== null}
                            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loadingMethod === "oceanPayment" ? "Processing..." : (
                                <div className="flex items-center gap-2">
                                    {/* Oceanpay icon */}
                                    <SiDigitalocean size={12} />
                                    <span>Pay with OceanPay</span>
                                </div>
                            )}
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;