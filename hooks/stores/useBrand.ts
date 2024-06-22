import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { Brand } from "@/models/Brand";
import { API_URL } from "@/constants/Api";
const fetchStores = async (): Promise<Brand[]> => {
    const response = await axios.get(`${API_URL}products/brands`);
    return response.data;
};

export const useStores = (): UseQueryResult<Brand[], Error> => {
    const options: UseQueryOptions<Brand[], Error> = {
        queryKey: ["brands"],
        queryFn: fetchStores,
        staleTime: 1000 * 60 * 5, // 5 minutes
        //   cacheTime: 1000 * 60 * 10, // 10 minutes
        // Refetch on window focus
    };
    return useQuery<Brand[], Error>(options);
};
