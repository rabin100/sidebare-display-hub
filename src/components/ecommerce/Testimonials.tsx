
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    quote: "The quality of electronics I've purchased here exceeds my expectations. Fast shipping and excellent customer service!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    quote: "I've been shopping for computer parts here for years. The prices are competitive and the selection is unbeatable.",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Smart Home Expert",
    quote: "Their smart home devices have transformed my living space. The team was incredibly helpful with installation advice.",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Trusted by thousands of satisfied customers worldwide</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
