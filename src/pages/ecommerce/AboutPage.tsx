
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Check, Clock, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About ShopHub</h1>
        <p className="text-lg text-gray-700 mb-10">
          We're on a mission to revolutionize e-commerce by connecting quality products 
          with people who appreciate them, while building communities around shared interests.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                Our Journey
              </CardTitle>
              <CardDescription>From humble beginnings to market leader</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Founded in 2023, ShopHub began with three friends who shared a vision for a better 
                shopping experience. What started as a small operation has grown into a thriving 
                marketplace with thousands of products across multiple categories.
              </p>
              <p>
                Through dedication to quality and customer service, we've expanded to serve 
                customers in over 30 countries. Our team has grown from 3 to 150+ talented 
                individuals who share our passion for connecting people with products they'll love.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-blue-500" />
                Our Values
              </CardTitle>
              <CardDescription>What drives us every day</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <strong>Quality First:</strong> We curate only the best products that meet our strict standards.
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <strong>Transparency:</strong> Clear, honest communication at every step of your shopping journey.
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <strong>Community-Driven:</strong> Building meaningful connections between buyers and sellers.
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <strong>Innovation:</strong> Constantly improving our platform to deliver the best experience.
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <strong>Sustainability:</strong> Making choices that benefit people and the planet.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Why Choose ShopHub</h2>
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {[
            { 
              icon: Award, 
              title: "Premium Quality", 
              description: "Every product undergoes strict quality checks before being listed." 
            },
            { 
              icon: Clock, 
              title: "Fast Delivery", 
              description: "Enjoy rapid shipping to over 30 countries worldwide." 
            },
            { 
              icon: Users, 
              title: "Supportive Community", 
              description: "Join thousands of like-minded shoppers who share your interests." 
            },
          ].map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <feature.icon className="h-10 w-10 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>The talented individuals behind ShopHub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { 
                  name: "Sarah Johnson", 
                  role: "CEO & Founder", 
                  bio: "Sarah brings 15 years of retail experience and a passion for connecting people with products they'll love." 
                },
                { 
                  name: "Michael Chen", 
                  role: "CTO", 
                  bio: "With a background in AI and e-commerce, Michael leads our tech team in building innovative shopping experiences." 
                },
                { 
                  name: "Aisha Patel", 
                  role: "Head of Customer Experience", 
                  bio: "Aisha ensures every interaction with ShopHub exceeds expectations, from browsing to delivery." 
                }
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
