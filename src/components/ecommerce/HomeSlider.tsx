
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    title: 'Cutting-Edge Electronics',
    description: 'Discover the latest tech innovations to elevate your digital experience',
    color: 'from-blue-900/80 to-transparent',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    title: 'Smart Home Solutions',
    description: 'Transform your living space with intelligent devices and automation',
    color: 'from-purple-900/80 to-transparent',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    title: 'Professional Tech Tools',
    description: 'Equip yourself with professional-grade electronics for maximum productivity',
    color: 'from-green-900/80 to-transparent',
  }
];

const HomeSlider: React.FC = () => {
  return (
    <div className="w-full">
      <Carousel className="w-full relative">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[600px] flex items-center">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}></div>
                <div className="relative z-10 ml-8 md:ml-16 max-w-xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">{slide.title}</h1>
                  <p className="text-xl opacity-90 mb-8 animate-fade-in">{slide.description}</p>
                  <div className="flex gap-4">
                    <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 transition-colors animate-fade-in">
                      <Link to="/products">Shop Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 animate-fade-in">
                      <Link to="/about" className="flex items-center gap-2">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          <CarouselPrevious className="relative -left-0 top-0 translate-y-0 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white" />
          <CarouselNext className="relative -right-0 top-0 translate-y-0 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
