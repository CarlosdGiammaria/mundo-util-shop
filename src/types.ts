export interface Product {
  id: number;
  name: string;
  materials:string;
  price: number;
  image?: string;
}

export interface Order {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  observations:string;
  items: Product[];
  total: number;
  date: string; // ✅ importante
}


export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}
