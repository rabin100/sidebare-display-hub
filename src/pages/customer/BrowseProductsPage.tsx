
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const BrowseProductsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Browse Products</h1>
      <p className="text-muted-foreground">
        Visit our products page to browse our complete catalog and find exactly what you're looking for.
      </p>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-6 mt-2">
            <img 
              src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=665&q=80" 
              alt="Shopping Products" 
              className="mx-auto h-48 w-auto object-cover rounded-lg"
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-3">Visit Our Products Page</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Our products page offers advanced filtering, sorting, and search capabilities to help you find the perfect items.
          </p>
          
          <Link to="/products">
            <Button className="gap-2">
              Browse All Products
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrowseProductsPage;
