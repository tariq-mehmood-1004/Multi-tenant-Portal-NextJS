"use client";

import { ProductCard } from "../components/ProductCard";
import { useCartStore } from "../store/useCartStore";
import { useProductStore } from "../store/useProductsStore";
import { useEffect, useState } from "react";

export default function HomePage() {
    const { products, isLoading, get_products } = useProductStore();
    const { addToCart } = useCartStore();
    const [hoveredId, setHoveredId] = useState<number | null>(null);


    const [_, setTenantDomain] = useState("");
    const [category, setCategory] = useState("");
    const [peptide, setPeptide] = useState<boolean | undefined>(undefined);

    // Initial load
    useEffect(() => {
        if (typeof window !== "undefined") {
            setTenantDomain(window.location.origin);
        }
        get_products("", undefined);
    }, []);

    // Debounced filters
    useEffect(() => {
        const timer = setTimeout(() => {
            get_products(category, peptide);
        }, 500);

        return () => clearTimeout(timer);
    }, [category, peptide]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    const handlePeptideChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === "true") setPeptide(true);
        else if (value === "false") setPeptide(false);
        else setPeptide(undefined); // "All"
    };

    const handleAddToCart = (product: any) => {
        addToCart(product);
        console.log(`product: ${product}`);
    };


    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-xl font-semibold animate-pulse">
                    Loading products...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4">

            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="mb-6 flex gap-4 max-[767px]:flex-col py-2">
                    <input
                        type="text"
                        placeholder="Filter by category"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                        value={category}
                        onChange={handleCategoryChange}
                    />

                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        value={
                            peptide === undefined
                                ? ""
                                : peptide
                                    ? "true"
                                    : "false"
                        }
                        onChange={handlePeptideChange}
                    >
                        <option value="">All</option>
                        <option value="true">Peptide</option>
                        <option value="false">Not Peptide</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.length > 0 ? (
                        products.map((p) => (
                            <div
                                key={p.id}
                                onMouseEnter={() => setHoveredId(p.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="transition-all duration-300"
                            >
                                <ProductCard 
                                    key={p.id} 
                                    product={p} 
                                    onAddToCart={handleAddToCart}
                                    isDimmed={hoveredId !== null && hoveredId !== p.id}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}