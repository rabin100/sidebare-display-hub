
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  CreditCard, 
  Building, 
  FileText, 
  Users, 
  Bell, 
  Lock, 
  KeyRound,
  Globe,
  DollarSign,
  Receipt
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FinanceSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Finance Settings</h1>
        <p className="text-muted-foreground">Manage your finance and accounting preferences</p>
      </div>
      
      <Tabs defaultValue="general">
        <div className="flex overflow-x-auto pb-2">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </TabsTrigger>
            <TabsTrigger value="invoicing" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span>Invoicing</span>
            </TabsTrigger>
            <TabsTrigger value="taxes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Taxes</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>User Access</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details used in invoices and reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="TechCorp Solutions Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                  <Input id="tax-id" defaultValue="US123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Business Ave, Suite 500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue="California" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input id="zip" defaultValue="94103" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Business Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Fiscal Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                    <Select defaultValue="january">
                      <SelectTrigger id="fiscal-year">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reporting-currency">Reporting Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="reporting-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                        <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                        <SelectItem value="cad">Canadian Dollar (CAD)</SelectItem>
                        <SelectItem value="aud">Australian Dollar (AUD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure your accepted payment methods and processors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Credit Card Processing</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-sm text-gray-500">Process credit card payments via Stripe</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" defaultValue="sk_test_••••••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <Input id="webhook-secret" type="password" defaultValue="whsec_••••••••••••••••" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Other Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src="https://cdn.cdnlogo.com/logos/p/9/paypal.svg" alt="PayPal" className="h-6" />
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-gray-500">Accept payments via PayPal</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <DollarSign className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-medium">Bank Transfer (ACH)</h4>
                        <p className="text-sm text-gray-500">Accept bank transfers</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Globe className="h-6 w-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Wire Transfer</h4>
                        <p className="text-sm text-gray-500">Accept international wire transfers</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Payment Settings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="invoicing" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
              <CardDescription>Configure your invoice templates and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                  <Input id="invoice-prefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="next-invoice-number">Next Invoice Number</Label>
                  <Input id="next-invoice-number" type="number" defaultValue="1024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Default Payment Terms</Label>
                  <Select defaultValue="net30">
                    <SelectTrigger id="payment-terms">
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                      <SelectItem value="net15">Net 15</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                  <Input id="invoice-notes" defaultValue="Thank you for your business!" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Invoice Automation</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-reminders" defaultChecked />
                    <Label htmlFor="auto-reminders">Send automatic payment reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-receipts" defaultChecked />
                    <Label htmlFor="auto-receipts">Send payment receipts automatically</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-recurring" />
                    <Label htmlFor="auto-recurring">Enable recurring invoices</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Invoice Settings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="taxes" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and tax categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Tax Calculation</h3>
                  <Switch id="tax-enabled" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-basis">Tax Calculation Basis</Label>
                  <Select defaultValue="location">
                    <SelectTrigger id="tax-basis">
                      <SelectValue placeholder="Select basis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="location">Customer Location</SelectItem>
                      <SelectItem value="origin">Company Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <h3 className="font-medium">Default Tax Rates</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax-name">Tax Name</Label>
                      <Input id="tax-name" defaultValue="Sales Tax" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-rate">Rate (%)</Label>
                      <Input id="tax-rate" type="number" defaultValue="8.00" step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-region">Region</Label>
                      <Select defaultValue="ca">
                        <SelectTrigger id="tax-region">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">Add Tax Rate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Tax Settings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Access</CardTitle>
              <CardDescription>Manage finance team access permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500">sarah.johnson@example.com</p>
                  </div>
                  <Select defaultValue="admin">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="none">No Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Michael Smith</h3>
                    <p className="text-sm text-gray-500">michael.smith@example.com</p>
                  </div>
                  <Select defaultValue="manager">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="none">No Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Jessica Lee</h3>
                    <p className="text-sm text-gray-500">jessica.lee@example.com</p>
                  </div>
                  <Select defaultValue="viewer">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="none">No Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <Button variant="outline">Invite Team Member</Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Access Settings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure when and how you receive finance notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="invoice-paid">Invoice paid</Label>
                    <Switch id="invoice-paid" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="invoice-overdue">Invoice overdue</Label>
                    <Switch id="invoice-overdue" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-expense">New expense submitted</Label>
                    <Switch id="new-expense" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthly-report">Monthly financial report</Label>
                    <Switch id="monthly-report" defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payment-received">Payment received</Label>
                    <Switch id="payment-received" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="budget-alert">Budget alerts</Label>
                    <Switch id="budget-alert" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tax-reminder">Tax payment reminders</Label>
                    <Switch id="tax-reminder" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Notification Settings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure finance portal security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Require 2FA for finance portal access</p>
                  </div>
                  <Switch id="2fa" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Single Sign-On (SSO)</h4>
                    <p className="text-sm text-gray-500">Enable SSO for finance portal</p>
                  </div>
                  <Switch id="sso" />
                </div>
                
                <Separator />
                
                <h3 className="font-medium">Session Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                
                <Separator />
                
                <h3 className="font-medium">API Access</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-access">Enable API Access</Label>
                    <Switch id="api-access" defaultChecked />
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="gap-2">
                      <KeyRound className="h-4 w-4" />
                      Manage API Keys
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Security Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceSettingsPage;
