import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { Store } from "@/models/Store";
import { API_URL } from "@/constants/Api";
const fetchStores = async (): Promise<Store[]> => {
    const response = await axios.get(`${API_URL}products/stores`);

    return response.data;
};

export const useStores = (): UseQueryResult<Store[], Error> => {
    const options: UseQueryOptions<Store[], Error> = {
        queryKey: ["stores"],
        queryFn: fetchStores,
        staleTime: 1000 * 60 * 5, // 5 minutes
        //   cacheTime: 1000 * 60 * 10, // 10 minutes
        // Refetch on window focus
    };
    return useQuery<Store[], Error>(options);
};
