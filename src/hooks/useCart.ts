
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { OrderItem, createOrder, clearCart } from '@/utils/orderUtils';
import { Product } from '@/types/product';

export const useCart = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product, quantity: number) => {
    const productPrice = product.onSale ? product.salePrice! : product.price;
    
    const newItem: OrderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      onSale: product.onSale,
      quantity: quantity,
      image: product.image
    };
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart(prev => [...prev, newItem]);
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleViewCart = () => {
    setShowCheckoutDialog(true);
  };

  const handleClearCart = () => {
    setCart([]);
    setShowCheckoutDialog(false);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart."
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    const totalAmount = cart.reduce(
      (sum, item) => sum + (item.onSale ? item.salePrice! : item.price) * item.quantity, 
      0
    );
    
    navigate('/customer/checkout', { 
      state: { 
        products: cart,
        totalAmount: totalAmount
      }
    });
    setShowCheckoutDialog(false);
  };

  const handlePlaceOrderDirectly = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }
    
    const newOrder = createOrder(cart);
    
    setCart([]);
    setShowCheckoutDialog(false);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${newOrder.id} has been confirmed.`,
    });
    
    navigate('/customer/history');
  };

  const handleBuyNow = (product: Product) => {
    const newItem: OrderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      onSale: product.onSale,
      quantity: 1,
      image: product.image
    };
    
    navigate('/customer/checkout', { 
      state: { 
        products: [newItem],
        totalAmount: product.onSale ? product.salePrice! : product.price 
      } 
    });
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.onSale ? item.salePrice! : item.price) * item.quantity, 
    0
  );
  
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    showCheckoutDialog,
    setShowCheckoutDialog,
    cartTotal,
    cartItemCount,
    handleAddToCart,
    handleViewCart,
    handleClearCart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCheckout,
    handlePlaceOrderDirectly,
    handleBuyNow
  };
};
