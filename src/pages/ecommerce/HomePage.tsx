
import React from 'react';
import HomeSlider from '@/components/ecommerce/HomeSlider';
import FeaturedCategories from '@/components/ecommerce/FeaturedCategories';
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts';
import AboutSystem from '@/components/ecommerce/AboutSystem';
import WhyChooseUs from '@/components/ecommerce/WhyChooseUs';
import Testimonials from '@/components/ecommerce/Testimonials';
import Newsletter from '@/components/ecommerce/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div className="w-full animate-fade-in">
      {/* Hero Section with Slider */}
      <section className="relative w-full">
        <HomeSlider />
      </section>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Our System */}
      <AboutSystem />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default HomePage;
