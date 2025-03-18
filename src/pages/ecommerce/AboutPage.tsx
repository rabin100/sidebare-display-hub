
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>How we started and where we're going</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Founded in 2023, our e-commerce platform began with a simple mission: to connect quality products 
              with people who appreciate them. What started as a small operation has grown into a thriving 
              marketplace with thousands of products across multiple categories.
            </p>
            <p>
              We believe in sustainable business practices, exceptional customer service, and creating a 
              platform that benefits both buyers and sellers. Our team works tirelessly to improve the shopping 
              experience and ensure that every interaction on our platform is a positive one.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
            <CardDescription>What drives us every day</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Quality:</strong> We curate only the best products for our customers.</li>
              <li><strong>Transparency:</strong> Clear, honest communication at every step.</li>
              <li><strong>Community:</strong> Building relationships between buyers and sellers.</li>
              <li><strong>Innovation:</strong> Constantly improving our platform and services.</li>
              <li><strong>Sustainability:</strong> Making choices that are good for the planet.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>The people behind the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: "Sarah Johnson", role: "CEO & Founder", bio: "Sarah brings 15 years of retail experience to the company." },
                { name: "Michael Chen", role: "CTO", bio: "Michael oversees all technical aspects of the platform." },
                { name: "Aisha Patel", role: "Head of Customer Experience", bio: "Aisha ensures our users have a seamless shopping experience." }
              ].map((member, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                  <p className="text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
