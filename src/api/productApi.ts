import { Product, Products } from "@/types/Product";
import apiClient from "./apiClient";

// 获取用户列表
export const fetchProducts = async (): Promise<{ data: Products }> => {
  return await apiClient.get("/products/");
};

// 获取产品详细
export const fetchProductDetail = async (product_id: any): Promise<Product> => {
  return await apiClient.get(`/products/${product_id}`);
};
