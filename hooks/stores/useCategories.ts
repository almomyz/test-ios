import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { Categories } from "@/models/Categories";
import { API_URL } from "@/constants/Api";
const fetchCategories = async (): Promise<Categories[]> => {
    const response = await axios.get(`${API_URL}products/categories`);
    return response.data;
};

export const useCategories = (): UseQueryResult<Categories[], Error> => {
    const options: UseQueryOptions<Categories[], Error> = {
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5, // 5 minutes

        //   cacheTime: 1000 * 60 * 10, // 10 minutes
        // Refetch on window focus
    };
    return useQuery<Categories[], Error>(options);
};
