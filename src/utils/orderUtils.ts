
// This file manages order creation and history tracking in localStorage

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
}

// Get orders from localStorage
export const getOrders = (): Order[] => {
  const ordersJson = localStorage.getItem('orders');
  return ordersJson ? JSON.parse(ordersJson) : [];
};

// Save orders to localStorage
export const saveOrders = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Create a new order
export const createOrder = (items: OrderItem[], paymentMethod: string = 'Credit Card'): Order => {
  // Generate a random order ID
  const orderId = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  // Calculate total from items
  const total = items.reduce((sum, item) => 
    sum + (item.onSale ? (item.salePrice || 0) : item.price) * item.quantity, 0);
  
  const newOrder: Order = {
    id: orderId,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    items,
    total,
    status: 'pending', // Initial status
    paymentMethod
  };
  
  // Retrieve current orders
  const orders = getOrders();
  
  // Add new order to the beginning of the array
  orders.unshift(newOrder);
  
  // Save updated orders
  saveOrders(orders);
  
  return newOrder;
};

// Get a specific order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};

// Clear the cart (for after order completion)
export const clearCart = () => {
  localStorage.removeItem('cart');
};
