import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/models/Product";
import { API_URL } from "@/constants/Api";
// Update fetchStores to accept an id parameter
const fetchProductDetails = async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}products/${id}`);

    console.log(response.data);
    return response.data;
};

// Update useStores to accept an id parameter
export const useProductDetails = (
    id: number
): UseQueryResult<Product, Error> => {
    const options: UseQueryOptions<Product, Error> = {
        queryKey: ["ProductDetails", id], // Include id in the queryKey
        queryFn: () => fetchProductDetails(id), // Pass id to fetchStores
        staleTime: 1000 * 60 * 5, // 5 minutes
        // cacheTime: 1000 * 60 * 10, // 10 minutes
        // Refetch on window focus
    };
    // console.log(options);
    return useQuery<Product, Error>(options);
};
