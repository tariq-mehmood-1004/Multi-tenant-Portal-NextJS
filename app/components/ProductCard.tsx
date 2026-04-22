"use client";

import Image from 'next/image';
import { Product } from '../types';
import { useRouter } from 'next/navigation';
import { Button, Label } from '@heroui/react';
import { useState } from 'react';
import { Dropdown } from '@heroui/react';
import type { Selection } from "@heroui/react";
import toast from 'react-hot-toast';



interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;
    isDimmed?: boolean;
}


export const ProductCard = ({ product, onAddToCart, isDimmed }: Props) => {
    const route = useRouter();

    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const getSku = (size: string) => {
        return `${product.id}-${size}`;
    };

    const activeInventory = product.inventory?.find(
        (inv) => inv.sku === selectedSize
    );

    const availableStock = activeInventory
        ? activeInventory.quantity - activeInventory.reserved
        : 0;

    const handleCartRoute = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }

        route.push('/cart');
    };

    return (
        <div className={`
            relative
            bg-white rounded-xl group overflow-hidden border-2 border-gray-100
            transition-all duration-300 ease-in-out
            ${isDimmed ? "blur-sm opacity-40" : "blur-0 opacity-100"}
            hover:!blur-0 hover:!opacity-100
            w-[300px] h-[450px]
        `}>

            {/* Image Section */}
            <div className={`
                    relative w-full h-64 bg-gray-100
                `}>
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title || "Product image"}
                    width={500}
                    height={500}
                    unoptimized
                    className="object-cover group-hover:scale-105 transition duration-300 ease-in-out group-hover:opacity-90"
                    priority
                />

                {/* Sale Badge */}
                {product.sale_price && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {`SALE | ${product.id}`}
                    </span>
                )}

                {/* Is Peptide */}
                {product.is_peptide && (
                    <span className="absolute top-2 right-2 bg-indigo-500 text-zinc-200 text-xs px-2 py-1 rounded-full">
                        {product.is_peptide ? `Peptide Product` : ''}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 absolute bottom-0 w-full bg-white">

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                </h3>

                {/* Category */}
                <p className="text-xs text-gray-500">
                    {product.category}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-black">
                        $ {product.sale_price || product.regular_price}
                    </span>

                    {product.sale_price && (
                        <span className="text-sm text-gray-400 line-through">
                            $ {product.regular_price}
                        </span>
                    )}
                </div>

                {/* Sizes */}
                <div className="w-full flex flex-wrap gap-1 mt-1">
                    <Dropdown className="w-full">
                        <Dropdown.Trigger className="text-xs px-2 py-2 w-full rounded-lg border border-gray-300 flex items-center justify-between">
                            {selectedSize ? `Size: ${selectedSize}` : "Select a size"}
                        </Dropdown.Trigger>

                        <Dropdown.Popover className="min-w-[256px]">
                            <Dropdown.Menu
                                selectionMode="single"
                                selectedKeys={selectedSize ? new Set([selectedSize]) : new Set()}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys as Set<string>)[0];
                                    setSelectedSize(value ?? null);
                                }}
                            >
                                <Dropdown.Section>
                                    {product.available_sizes.map((size) => {
                                        const inv = product.inventory?.find(
                                            (i) => i.sku === size
                                        );

                                        const stock = inv ? (inv.quantity - inv.reserved) : 0;

                                        return (
                                            <Dropdown.Item
                                                key={size}
                                                id={size}
                                                textValue={size}
                                                isDisabled={stock <= 0}
                                            >
                                                <Dropdown.ItemIndicator />
                                                <Label>
                                                    {size} {stock <= 0 ? "(Out of stock)" : ""}
                                                </Label>
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Section>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>

                {/* Buttons */}
                {availableStock > 0 ? (
                    <>
                        <p className="text-xs text-gray-500">
                            {selectedSize
                                ? `In Stock: ${availableStock}`
                                : "Select a size to see stock"}
                        </p>

                        <div className="flex gap-2 mt-3">
                            <Button
                                onClick={() => {
                                    if (!selectedSize) {
                                        toast.error("Please select a size");
                                        return;
                                    }

                                    const inventoryItem = product.inventory?.find(
                                        i => i.sku === selectedSize
                                    );

                                    const available = inventoryItem
                                        ? inventoryItem.quantity - inventoryItem.reserved
                                        : 0;

                                    if (available <= 0) {
                                        toast.error("Out of stock for selected size");
                                        return;
                                    }

                                    const productWithSize = {
                                        ...product,
                                        selectedSize,
                                        sku: selectedSize
                                    };

                                    onAddToCart(productWithSize);
                                }}
                                className="flex-1 bg-black text-white text-sm py-2 rounded-md hover:bg-gray-800 transition">
                                Add to Cart
                            </Button>

                            <Button
                                onClick={handleCartRoute}
                                className="flex-1 text-center bg-transparent border border-black text-black text-sm py-2 rounded-md hover:bg-black hover:text-white transition"
                            >
                                Check Out
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-xs text-gray-500">
                            Out of Stock
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};