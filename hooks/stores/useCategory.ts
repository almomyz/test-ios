import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@/models/Category";
import { API_URL } from "@/constants/Api";
const fetchStores = async (): Promise<Category[]> => {
    const response = await axios.get(`${API_URL}products/categories`);
    return response.data;
};

export const useStores = (): UseQueryResult<Category[], Error> => {
    const options: UseQueryOptions<Category[], Error> = {
        queryKey: ["categories"],
        queryFn: fetchStores,
        staleTime: 1000 * 60 * 5, // 5 minutes

        //   cacheTime: 1000 * 60 * 10, // 10 minutes
        // Refetch on window focus
    };
    return useQuery<Category[], Error>(options);
};
