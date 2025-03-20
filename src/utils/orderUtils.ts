
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
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
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
    paymentMethod,
    paymentStatus: 'unpaid' // Initial payment status
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

// Update order status
export const updateOrderStatus = (orderId: string, status: Order['status']): boolean => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return false;
  
  orders[orderIndex].status = status;
  saveOrders(orders);
  return true;
};

// Update payment status
export const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']): boolean => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return false;
  
  orders[orderIndex].paymentStatus = paymentStatus;
  
  // If payment is marked as paid, automatically update order status to processing
  if (paymentStatus === 'paid' && orders[orderIndex].status === 'pending') {
    orders[orderIndex].status = 'processing';
  }
  
  saveOrders(orders);
  return true;
};

// Process payment for an order
export const processPayment = (orderId: string, paymentMethod: string): boolean => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return false;
  
  orders[orderIndex].paymentStatus = 'paid';
  orders[orderIndex].status = 'processing';
  orders[orderIndex].paymentMethod = paymentMethod;
  
  saveOrders(orders);
  return true;
};
