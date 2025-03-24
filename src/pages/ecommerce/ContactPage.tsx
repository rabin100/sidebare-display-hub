
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Mon-Fri, 9am-5pm EST</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-600">support@example.com</p>
              <p className="text-gray-600">We reply within 24 hours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-600">123 Commerce Street</p>
              <p className="text-gray-600">New York, NY 10001</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-gray-700 mb-6">
              Have a question, comment, or concern? Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="How can we help you?" 
                      required 
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Your message here..." 
                      rows={5} 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Find Us</h2>
            <p className="text-gray-700 mb-6">
              We're conveniently located in downtown New York. Stop by our store or use the map below to find us.
            </p>
            
            <Card className="overflow-hidden h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343067!2d-73.9910086847834!3d40.74132807932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1615294821576!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Our Location"
              ></iframe>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {[
                {
                  question: "What are your shipping times?",
                  answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery."
                },
                {
                  question: "How do I return an item?",
                  answer: "You can initiate a return through your account dashboard within 30 days of purchase. We provide a prepaid shipping label for all returns."
                },
                {
                  question: "Do you ship internationally?",
                  answer: "Yes, we ship to over 100 countries worldwide. International shipping typically takes 7-14 business days."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
                }
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
