import { useState } from "react";

export const useFetchProductWithPrice = () => {
    const [loading, setLoading] = useState(false);

    const fetchWithPrice = async (product: any) => {
        // Si ya tiene precio, no fetchea de nuevo
        if (product?.price?.sellPrice) return product;

        try {
            setLoading(true);
            const res = await fetch(`/api/price/p/${product.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const productWithPrice = await res.json();
                return productWithPrice;
            } else {
                console.error(`Error Sin precio`, res.status);
            }

        } catch (e) {
            console.error("Error al obtener precio:", e);
            // Devuelve el producto con precio 0 como fallback
            return { ...product, price: { sellPrice: 0 } };
        } finally {
            setLoading(false);
        }
    };

    return { fetchWithPrice, loading };
};