
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" 
              alt="Our team" 
              className="rounded-lg shadow-md h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2010, our company started with a simple mission: to provide high-quality products 
              at affordable prices. What began as a small family business has grown into a trusted 
              online retailer serving customers worldwide.
            </p>
            <p className="text-gray-700">
              We believe in the power of exceptional customer service and carefully curated products. 
              Our team works tirelessly to ensure that every interaction with our company exceeds 
              your expectations.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {[
            {
              title: "Quality",
              description: "We meticulously select each product to ensure it meets our high standards of quality and durability."
            },
            {
              title: "Affordability",
              description: "We believe great products shouldn't come with steep prices. We work to offer fair, competitive pricing."
            },
            {
              title: "Sustainability",
              description: "We're committed to reducing our environmental impact through eco-friendly practices and products."
            },
            {
              title: "Innovation",
              description: "We continuously seek new and improved products to meet the evolving needs of our customers."
            },
            {
              title: "Integrity",
              description: "We operate with honesty and transparency in all aspects of our business."
            },
            {
              title: "Customer Focus",
              description: "Our customers are at the heart of everything we do. Your satisfaction is our priority."
            }
          ].map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {[
            {
              name: "Jane Smith",
              position: "CEO & Founder",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            },
            {
              name: "John Davis",
              position: "Head of Operations",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
            },
            {
              name: "Emily Johnson",
              position: "Customer Relations",
              image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
            },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center"
              />
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
