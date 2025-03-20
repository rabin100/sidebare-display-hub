import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  ShoppingBag, 
  Truck, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight, 
  Shield 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { createOrder, OrderItem, clearCart } from '@/utils/orderUtils';

interface LocationState {
  products: OrderItem[];
  totalAmount: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form state
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  // Get products from location state or use empty array as fallback
  const orderItems: OrderItem[] = (location.state as LocationState)?.products || [];
  const orderTotal = (location.state as LocationState)?.totalAmount || 
    orderItems.reduce((sum, item) => 
      sum + (item.onSale ? item.salePrice! : item.price) * item.quantity, 0);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setOrderProcessing(true);
    
    // Create an order with our utility function
    setTimeout(() => {
      const selectedPaymentMethod = paymentMethod === 'credit-card' 
        ? `Credit Card ending in ${billingInfo.cardNumber.slice(-4)}` 
        : 'PayPal';
      
      const newOrder = createOrder(orderItems, selectedPaymentMethod);
      setOrderId(newOrder.id);
      
      // Clear the cart
      clearCart();
      
      setOrderProcessing(false);
      setOrderCompleted(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${newOrder.id} has been confirmed.`,
      });
    }, 2000);
  };
  
  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'address', 'city', 'state', 'zipCode'];
    
    if (paymentMethod === 'credit-card') {
      requiredFields.push('cardNumber', 'cardName', 'expiry', 'cvv');
    }
    
    return requiredFields.every(field => billingInfo[field as keyof typeof billingInfo]);
  };
  
  if (orderCompleted) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <CardDescription>
              Your order has been placed and is being processed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Order Details</h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Order Number: <span className="font-medium text-black">#{orderId}</span></p>
                <p>Date: <span className="font-medium text-black">{new Date().toLocaleDateString()}</span></p>
                <p>Total: <span className="font-medium text-black">${orderTotal.toFixed(2)}</span></p>
                <p>Payment Method: <span className="font-medium text-black">
                  {paymentMethod === 'credit-card' 
                    ? `Credit Card ending in ${billingInfo.cardNumber.slice(-4)}` 
                    : 'PayPal'}
                </span></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Items Ordered</h3>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ${((item.onSale ? item.salePrice! : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
              <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800">Shipping Information</h3>
                <p className="text-sm text-blue-700">
                  Your order will be shipped within 1-2 business days. You'll receive a confirmation email with tracking details.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={() => navigate('/customer/history')}>
              View My Order History
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Payment</CardTitle>
              <CardDescription>Complete your order by providing your shipping and payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Contact & Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          name="fullName" 
                          value={billingInfo.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email"
                          value={billingInfo.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={billingInfo.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={billingInfo.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state" 
                            name="state"
                            value={billingInfo.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input 
                            id="zipCode" 
                            name="zipCode"
                            value={billingInfo.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Payment Method</h3>
                    <Tabs 
                      defaultValue="credit-card" 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="credit-card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit Card</span>
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className="flex items-center gap-2">
                          <img src="https://cdn.cdnlogo.com/logos/p/9/paypal.svg" alt="PayPal" className="h-4" />
                          <span>PayPal</span>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="credit-card" className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber" 
                              name="cardNumber" 
                              placeholder="•••• •••• •••• ••••"
                              value={billingInfo.cardNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName" 
                              name="cardName"
                              value={billingInfo.cardName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                name="expiry" 
                                placeholder="MM/YY"
                                value={billingInfo.expiry}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                name="cvv" 
                                placeholder="•••"
                                value={billingInfo.cvv}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="pt-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-4">
                            You'll be redirected to PayPal to complete your payment securely.
                          </p>
                          <img 
                            src="https://cdn.cdnlogo.com/logos/p/9/paypal.svg" 
                            alt="PayPal" 
                            className="mx-auto h-10 mb-4" 
                          />
                          <Button type="button" className="w-full" variant="outline">
                            Continue with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.length > 0 ? (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">Qty: {item.quantity}</Badge>
                          <p className="text-sm">
                            ${((item.onSale ? item.salePrice! : item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No items in your order</p>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(orderTotal * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(orderTotal + orderTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 flex items-start gap-2 mt-4">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                <p>Your payment information is encrypted and secure.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                onClick={handleSubmitOrder}
                disabled={orderProcessing || orderItems.length === 0}
              >
                {orderProcessing ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
          
          {orderItems.length === 0 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="font-medium text-amber-800">Empty Order</h3>
                <p className="text-sm text-amber-700">
                  Your order appears to be empty. Please add products before checking out.
                </p>
                <Button 
                  variant="link" 
                  className="p-0 mt-1 text-amber-800"
                  onClick={() => navigate('/products')}
                >
                  Browse Products <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
