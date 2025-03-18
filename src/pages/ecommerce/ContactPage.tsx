
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, MessageSquare, Send, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const faqItems = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times and costs vary depending on the destination."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account."
    },
    {
      question: "Are my payment details secure?",
      answer: "Absolutely! We use industry-standard encryption and secure payment processors to ensure your payment information is always protected."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you! 
            Reach out to our team using any of the methods below.
          </p>
        </div>
        
        <Tabs defaultValue="contact" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="contact" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>Our team is here to help</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-gray-600">support@shophub.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Visit Us</h3>
                        <p className="text-gray-600">123 E-Commerce St.</p>
                        <p className="text-gray-600">San Francisco, CA 94105</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Live Chat</h3>
                        <p className="text-gray-600">Available through our app</p>
                        <p className="text-sm text-gray-500 mt-1">Get instant responses to your questions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Business Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                        <p className="text-gray-600">Saturday: 10am - 4pm</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Google Map */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="w-full h-[300px] relative">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.27509238427!2d-122.42975444169043!3d37.78436444162706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580e139d6c399%3A0x611ebcce88b67553!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1611703566229!5m2!1sen!2sus" 
                        width="100%" 
                        height="300" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="ShopHub Office Location"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>We'd love to hear from you</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
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
                        placeholder="What's this about?"
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
                        placeholder="Tell us how we can help..."
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col text-sm text-gray-500">
                  <p>Our customer support team typically responds within 24 hours.</p>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>Find answers to common questions about our services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-medium text-lg mb-2 flex items-start">
                          <span className="text-blue-500 mr-2">Q:</span> {item.question}
                        </h3>
                        <p className="text-gray-600 pl-5">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Don't see your question here? Contact our support team.</p>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Customer Service</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4">For general inquiries and order assistance</p>
                    <p className="text-gray-600 font-medium">support@shophub.com</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <AlertCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Technical Support</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4">For website issues and account problems</p>
                    <p className="text-gray-600 font-medium">tech@shophub.com</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <ShoppingBag className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Business Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4">For partnerships and business opportunities</p>
                    <p className="text-gray-600 font-medium">business@shophub.com</p>
                    <p className="text-gray-600">+1 (555) 456-7890</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Support Hours
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Customer Service</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>Monday - Friday: 24 hours</li>
                      <li>Saturday: 9am - 9pm EST</li>
                      <li>Sunday: 10am - 6pm EST</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technical Support</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>Monday - Friday: 8am - 8pm EST</li>
                      <li>Saturday: 10am - 6pm EST</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Commitment Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Commitment to You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">At ShopHub, we're dedicated to providing exceptional customer service with every interaction.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Quick Response</h3>
              <p className="text-gray-600">We respond to all inquiries within 24 hours, usually much faster.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Expert Assistance</h3>
              <p className="text-gray-600">Our knowledgeable team has the expertise to solve your problems.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Friendly Service</h3>
              <p className="text-gray-600">We believe in treating every customer with respect and courtesy.</p>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for the latest product updates, special offers, and more.</p>
          
          <div className="max-w-md mx-auto flex gap-2">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow"
            />
            <Button type="button">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
