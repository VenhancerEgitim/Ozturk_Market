export interface Category {
  id: number;
  name: string;
  image?: string;
  backgroundColor?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  quantity?: number;
} 