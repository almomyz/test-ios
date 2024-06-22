import { Brand } from './Brand';
import { Category } from './Category';
import { ProductPhoto } from './ProductPhoto';
import { ProductPrice } from './ProductPrice';
import { ProductSpecification } from './ProductSpecification';

export interface Product {
  id: number;
  Name: string;
  Description: string;
  Url: string;
  Available: boolean;
  createdAt: string;
  updatedAt: string;
  Category_ID: number;
  Brand_ID: number;
  Brand: Brand;
  Category: Category;
  ProductPhotos: ProductPhoto[];
  ProductPrices: ProductPrice[];
  ProductSpecifications: ProductSpecification[];
}