// fetchProducts.ts
import axios from "axios";
import { Product } from "@/models/Product";
import { Fetch } from "@/models/Fetch";
import { API_URL } from "@/constants/Api";
interface Filters {
    selectedBrands?: number[];
    selectedCategories?: number[];
    selectedStores?: number[];
    priceRange?: [number, number];
    search?: string;
}

const fetchProducts = async (
    filters: Filters,
    page: number
): Promise<Fetch> => {
    const {
        selectedBrands,
        selectedCategories,
        selectedStores,
        priceRange,
        search,
    } = filters;

    const res = await axios.get<Fetch>(`${API_URL}products`, {
        params: {
            brands: selectedBrands,
            categories: selectedCategories,
            stores: selectedStores,
            priceRange,
            search,
            page,
            limit: 20,
        },
    });
    return res.data;
};

export { fetchProducts };
