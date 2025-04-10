
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const AboutSystem: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-blue-500 hover:bg-blue-600 mb-4">About Our System</Badge>
          <h2 className="text-3xl font-bold mb-4">Your Complete Electronics Shopping Solution</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our comprehensive e-commerce platform delivers an intuitive shopping experience with
            secure transactions, detailed product information, and personalized recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3">Easy Shopping</h3>
              <p className="text-gray-500">
                Our intuitive interface makes browsing and purchasing electronics a seamless experience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Secure Transactions</h3>
              <p className="text-gray-500">
                All payments are encrypted and secure, ensuring your personal information stays protected.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
              <p className="text-gray-500">
                Get your electronics delivered quickly and efficiently to your doorstep.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSystem;
