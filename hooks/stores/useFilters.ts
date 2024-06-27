import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Store } from "@/models/Store";
import { Brand } from "@/models/Brand";
import { Category } from "@/models/Categories";
import { API_URL } from "@/constants/Api";
interface Filters {
    brands: Brand[];
    categories: Category[];
    stores: Store[];
}

const fetchFilters = async (): Promise<Filters> => {
    const [brands, categories, stores]: [
        AxiosResponse<Brand[]>,
        AxiosResponse<Category[]>,
        AxiosResponse<Store[]>
    ] = await Promise.all([
        axios.get(`${API_URL}products/brands`),
        axios.get(`${API_URL}products/categories`),
        axios.get(`${API_URL}products/stores`),
    ]);

    return {
        brands: brands.data,
        categories: categories.data,
        stores: stores.data,
    };
};

export const useFilters = (): UseQueryResult<Filters> => {
    const options: UseQueryOptions<Filters, Error> = {
        queryKey: ["filters"],
        queryFn: fetchFilters,
        // other options...
    };
    console.log(options);
    return useQuery<Filters, Error>(options);
};
