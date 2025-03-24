
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import EcommerceHeader from '@/components/layout/EcommerceHeader';
import EcommerceFooter from '@/components/layout/EcommerceFooter';

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would validate credentials against a backend
      setIsLoading(false);
      
      // For demo purposes:
      // Admin login
      if (formData.email === 'admin@example.com' && formData.password === 'password') {
        toast({
          title: "Welcome back, Admin!",
          description: "You've been logged in successfully.",
        });
        navigate('/admin');
        return;
      }
      
      // Manager login
      if (formData.email === 'manager@example.com' && formData.password === 'password') {
        toast({
          title: "Welcome back, Manager!",
          description: "You've been logged in successfully.",
        });
        navigate('/manager');
        return;
      }
      
      // Regular user login
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully.",
        });
        navigate('/');
        return;
      }
      
      // Failed login
      toast({
        title: "Login failed",
        description: "Invalid email or password. For demo, try admin@example.com, manager@example.com, or user@example.com with password 'password'.",
        variant: "destructive"
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <EcommerceHeader />
      <div className="flex-1 flex items-center justify-center p-4 bg-slate-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="text-sm text-right">
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-sm text-center text-muted-foreground mt-2">
                <p>Demo Accounts (password: 'password'):</p>
                <p>admin@example.com | manager@example.com | user@example.com</p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <EcommerceFooter />
    </div>
  );
};

export default LoginPage;
