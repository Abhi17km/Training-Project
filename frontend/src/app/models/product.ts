import { Category } from "../services/category";

export interface Product {
  productId: number;
  productName: string;
  productDesc?: string;
  productPrice: number;
  categoryId: number;
  imageUrl?: string;
  category: Category;
}