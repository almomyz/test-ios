import { Store } from './Store';
import { Currency } from './Currency';

export interface ProductPrice {
  id: number;
  Price: number;
  WasPrice: number;
  Discount: number;
  createdAt: string;
  updatedAt: string;
  Product_ID: number;
  Currency_ID: number;
  Store_ID: number;
  Currency: Currency;
  Store: Store;
}