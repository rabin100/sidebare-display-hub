
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Trash2, Edit, CheckCircle, Shield, AlertCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'paypal' | 'bank';
  name: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  orderId: string;
}

const PaymentsPage: React.FC = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm-1",
      type: "credit",
      name: "Visa ending in 4242",
      lastFour: "4242",
      expiryDate: "11/24",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "paypal",
      name: "PayPal - johndoe@example.com",
      isDefault: false,
    },
    {
      id: "pm-3",
      type: "credit",
      name: "Mastercard ending in 8888",
      lastFour: "8888",
      expiryDate: "06/25",
      isDefault: false,
    },
  ]);
  
  const [transactions] = useState<Transaction[]>([
    {
      id: "txn-001",
      date: "2023-06-15",
      amount: 129.99,
      status: "completed",
      method: "Visa ending in 4242",
      orderId: "ORD-1234",
    },
    {
      id: "txn-002",
      date: "2023-06-02",
      amount: 289.98,
      status: "completed",
      method: "PayPal",
      orderId: "ORD-1235",
    },
    {
      id: "txn-003",
      date: "2023-05-28",
      amount: 79.99,
      status: "completed",
      method: "Visa ending in 4242",
      orderId: "ORD-1236",
    },
    {
      id: "txn-004",
      date: "2023-05-20",
      amount: 129.99,
      status: "failed",
      method: "Bank Transfer",
      orderId: "ORD-1237",
    },
  ]);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: true,
    makeDefault: false,
  });
  
  const handleChangeDefault = (paymentId: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === paymentId
      }))
    );
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been changed",
    });
  };
  
  const handleDeletePayment = (paymentId: string) => {
    const methodToDelete = paymentMethods.find(m => m.id === paymentId);
    
    if (methodToDelete?.isDefault) {
      toast({
        title: "Cannot delete default payment method",
        description: "Please set another payment method as default first",
        variant: "destructive",
      });
      return;
    }
    
    setPaymentMethods(methods => methods.filter(method => method.id !== paymentId));
    
    toast({
      title: "Payment method removed",
      description: "The payment method has been successfully removed",
    });
  };
  
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate and process the payment data here
    const lastFour = formData.cardNumber.slice(-4);
    const expiryDate = `${formData.expiryMonth}/${formData.expiryYear.slice(-2)}`;
    
    const newMethod: PaymentMethod = {
      id: `pm-${paymentMethods.length + 1}`,
      type: "credit",
      name: `Card ending in ${lastFour}`,
      lastFour,
      expiryDate,
      isDefault: formData.makeDefault,
    };
    
    // If the new method is default, update other methods
    if (formData.makeDefault) {
      setPaymentMethods(methods => 
        methods.map(method => ({
          ...method,
          isDefault: false
        }))
      );
    }
    
    setPaymentMethods(prev => [...prev, newMethod]);
    
    // Reset form
    setFormData({
      cardNumber: '',
      nameOnCard: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      saveCard: true,
      makeDefault: false,
    });
    
    toast({
      title: "Payment method added",
      description: `Card ending in ${lastFour} has been saved to your account`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments & Transactions</h1>
      
      <Tabs defaultValue="methods">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? "border-blue-500" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {method.type === 'credit' && <CreditCard className="inline mr-2 h-5 w-5" />}
                        {method.type === 'paypal' && <img src="https://cdn.cdnlogo.com/logos/p/9/paypal.svg" alt="PayPal" className="inline mr-2 h-5" />}
                        {method.type === 'bank' && <img src="https://cdn.cdnlogo.com/logos/b/97/bank.svg" alt="Bank" className="inline mr-2 h-5" />}
                        {method.name}
                      </CardTitle>
                      <CardDescription>
                        {method.type === 'credit' && `Expires ${method.expiryDate}`}
                      </CardDescription>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100" variant="outline">
                        Default
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  {!method.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleChangeDefault(method.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  {method.isDefault && (
                    <Button variant="outline" size="sm" disabled>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Default
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeletePayment(method.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Card className="border-dashed hover:border-blue-500 hover:cursor-pointer transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-[calc(100%-2rem)] m-4">
                    <Plus className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="font-medium">Add Payment Method</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Enter your payment details below. Your information is encrypted and secure.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddPaymentMethod}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="•••• •••• •••• ••••"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        name="nameOnCard"
                        placeholder="John Doe"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Month</Label>
                        <Select
                          value={formData.expiryMonth}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, expiryMonth: value }))}
                        >
                          <SelectTrigger id="expiryMonth">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = i + 1;
                              return (
                                <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                                  {month.toString().padStart(2, '0')}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Year</Label>
                        <Select
                          value={formData.expiryYear}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, expiryYear: value }))}
                        >
                          <SelectTrigger id="expiryYear">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="•••"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="saveCard"
                        name="saveCard"
                        checked={formData.saveCard}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saveCard: checked }))}
                      />
                      <Label htmlFor="saveCard">Save card for future payments</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="makeDefault"
                        name="makeDefault"
                        checked={formData.makeDefault}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, makeDefault: checked }))}
                      />
                      <Label htmlFor="makeDefault">Make this my default payment method</Label>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Payment Method</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Secure Payments</AlertTitle>
            <AlertDescription>
              All your payment information is encrypted and securely stored following PCI-DSS standards.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View your payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Order #{transaction.orderId}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">{transaction.method}</p>
                      <p className={`text-xs font-medium ${
                        transaction.status === 'completed' ? 'text-green-600' :
                        transaction.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {transaction.status === 'completed' && <CheckCircle className="h-3 w-3 inline mr-1" />}
                        {transaction.status === 'pending' && <Clock className="h-3 w-3 inline mr-1" />}
                        {transaction.status === 'failed' && <AlertCircle className="h-3 w-3 inline mr-1" />}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                      <Button variant="ghost" size="sm">View Receipt</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods Used</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit/Debit Card
                    <Badge className="ml-2" variant="outline">78%</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center">
                    <img src="https://cdn.cdnlogo.com/logos/p/9/paypal.svg" alt="PayPal" className="mr-2 h-4" />
                    PayPal
                    <Badge className="ml-2" variant="outline">20%</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center">
                    <img src="https://cdn.cdnlogo.com/logos/b/97/bank.svg" alt="Bank" className="mr-2 h-4" />
                    Bank Transfer
                    <Badge className="ml-2" variant="outline">2%</Badge>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
