
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return data;
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });
}

export function useProduct(productId: number) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await axios.get<Product>(`https://fakestoreapi.com/products/${productId}`);
      return data;
    },
    enabled: !!productId
  });
}
