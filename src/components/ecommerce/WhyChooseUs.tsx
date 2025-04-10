
import React from 'react';

const features = [
  { 
    title: "Quality Guaranteed", 
    description: "All our electronics undergo rigorous quality checks before shipping.",
    icon: "⭐"
  },
  { 
    title: "Fast Shipping", 
    description: "Receive your order within 2-3 business days with our express shipping.",
    icon: "🚚"
  },
  { 
    title: "24/7 Support", 
    description: "Our customer service team is available around the clock to assist you.",
    icon: "🛠️"
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 hover-lift hover:bg-blue-800/30 rounded-xl transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
