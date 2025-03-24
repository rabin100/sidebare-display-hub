
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Account created!",
        description: "You've successfully signed up."
      });
      
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    placeholder="John" 
                    required 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Doe" 
                    required 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    terms of service
                  </a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">
                    privacy policy
                  </a>
                </label>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t px-6 py-4">
            <div className="text-xs text-gray-500">
              By signing up, you acknowledge that you have read and agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
