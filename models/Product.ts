import { Brand } from "./Brand";
import { Categories } from "./Categories";
import { ProductPhoto } from "./ProductPhoto";
import { ProductPrice } from "./ProductPrice";
import { ProductSpecification } from "./ProductSpecification";

export interface Product {
    id: number;
    Name: string;
    Description: string;
    Url: string;
    Available: number;
    createdAt: string;
    updatedAt: string;
    Category_ID: number;
    Brand_ID: number;
    Brand: Brand;
    Category: Categories;
    ProductPhotos: ProductPhoto[];
    ProductPrices: ProductPrice[];
    ProductSpecifications: ProductSpecification[];
}
