
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
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductQuantityDialogProps {
  product: Product | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ProductQuantityDialog: React.FC<ProductQuantityDialogProps> = ({
  product,
  quantity,
  onQuantityChange,
  onConfirm,
  onCancel
}) => {
  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogDescription>
            Customize your order before adding to cart.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <div className="flex items-center gap-2">
                {product.onSale ? (
                  <>
                    <span className="font-semibold">${product.salePrice}</span>
                    <span className="text-gray-500 line-through text-sm">${product.price}</span>
                  </>
                ) : (
                  <span className="font-semibold">${product.price}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onQuantityChange(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium">Total:</span>
            <span className="font-bold">
              ${((product.onSale ? product.salePrice! : product.price) * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuantityDialog;
