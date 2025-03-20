
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { OrderItem } from '@/utils/orderUtils';
import { ShoppingCart, X, Plus, Minus, ArrowRight } from 'lucide-react';

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: OrderItem[];
  onClearCart: () => void;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
  onPlaceOrderDirectly: () => void;
  cartTotal: number;
}

const CartDialog: React.FC<CartDialogProps> = ({
  open,
  onOpenChange,
  cart,
  onClearCart,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  onPlaceOrderDirectly,
  cartTotal
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Your Shopping Cart</DialogTitle>
          <DialogDescription>
            Review your items before checkout
          </DialogDescription>
        </DialogHeader>

        {cart.length > 0 ? (
          <div className="py-4">
            <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.onSale ? (
                        <>
                          <span className="font-semibold text-sm">${item.salePrice}</span>
                          <span className="text-gray-500 line-through text-xs">${item.price}</span>
                        </>
                      ) : (
                        <span className="font-semibold text-sm">${item.price}</span>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-6 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${((item.onSale ? item.salePrice! : item.price) * item.quantity).toFixed(2)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 p-0 mt-1 text-red-500 hover:text-red-700"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {cart.length > 0 && (
            <>
              <Button variant="outline" onClick={onClearCart} className="sm:mr-auto">
                Clear Cart
              </Button>
              <Button variant="outline" onClick={onPlaceOrderDirectly}>
                Place Order
              </Button>
              <Button onClick={onCheckout}>
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          {cart.length === 0 && (
            <Button onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
