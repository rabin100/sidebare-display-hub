
import React from 'react';
import { Button } from '@/components/ui/button';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Subscribe to our newsletter for exclusive deals, new product announcements, and tech tips.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Button className="rounded-l-none bg-blue-900 hover:bg-blue-950">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
