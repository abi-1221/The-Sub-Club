"use client";

import { useState } from "react";
import { categories, getProductsByCategory } from "@/lib/categories";
import { ProductElement } from "./ProductElement";

export function CategoryViewer() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
    const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
    const products = selectedCategory ? getProductsByCategory(selectedCategory.id) : [];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Category List */}
            <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 px-3">Categories</h3>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${selectedCategoryId === category.id
                            ? "bg-neutral-900 text-white"
                            : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Main Content / Product Grid */}
            <div className="flex-1">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900">{selectedCategory?.label}</h2>
                    <p className="text-neutral-500 mt-1">{selectedCategory?.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductElement
                            key={product.id}
                            product={product}
                            loading={"eager"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
