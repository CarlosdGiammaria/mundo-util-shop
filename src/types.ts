export interface Product {
  id: number;
  name: string;
  materials?: string;
  price: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export interface Order {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  observations?: string;
  items: CartItem[];
  total: number;
  date: string;
}
