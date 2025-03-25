import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, allProducts, getCategories, getBrands } from '@/types/product';

interface PriceRange {
  min: string;
  max: string;
}

interface Filters {
  categories: string[];
  brands: string[];
  onSale: boolean;
}

// Creating additional electronics products for our catalog
const additionalElectronicsProducts: Product[] = [
  {
    id: 1001,
    name: 'Professional DSLR Camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    rating: 4.8,
    ratingCount: 256,
    onSale: true,
    salePrice: 799.99,
    category: 'Electronics',
    brand: 'PhotoMaster',
    description: 'High-resolution professional DSLR camera with advanced features for photography enthusiasts.',
    stock: 15,
    sku: 'PM-DSLR1001'
  },
  {
    id: 1002,
    name: 'Ultra-Thin Gaming Laptop',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    rating: 4.9,
    ratingCount: 342,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'Powerful gaming laptop with dedicated graphics card and high refresh rate display.',
    stock: 8,
    sku: 'TP-GL1002'
  },
  {
    id: 1003,
    name: 'Smart Home Security System',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055e2de583b',
    rating: 4.7,
    ratingCount: 189,
    onSale: true,
    salePrice: 299.99,
    category: 'Electronics',
    brand: 'HomeConnect',
    description: 'Complete smart home security system with cameras, sensors, and mobile app control.',
    stock: 22,
    sku: 'HC-SS1003'
  },
  {
    id: 1004,
    name: 'Premium Noise-Cancelling Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
    rating: 4.8,
    ratingCount: 276,
    onSale: false,
    category: 'Electronics',
    brand: 'SoundBeats',
    description: 'Over-ear headphones with active noise cancellation and premium sound quality.',
    stock: 34,
    sku: 'SB-NCH1004'
  },
  {
    id: 1005,
    name: 'Ultra HD Smart TV',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
    rating: 4.6,
    ratingCount: 213,
    onSale: true,
    salePrice: 799.99,
    category: 'Electronics',
    brand: 'TechPro',
    description: '65-inch Ultra HD Smart TV with streaming apps and voice control.',
    stock: 12,
    sku: 'TP-TV1005'
  },
  {
    id: 1006,
    name: 'Portable SSD Drive',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1602664876866-d3b33b423a3e',
    rating: 4.7,
    ratingCount: 178,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'Fast, compact portable SSD with 1TB storage capacity and USB-C connectivity.',
    stock: 45,
    sku: 'TP-SSD1006'
  },
  {
    id: 1007,
    name: 'Professional Drone with Camera',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
    rating: 4.8,
    ratingCount: 156,
    onSale: true,
    salePrice: 699.99,
    category: 'Electronics',
    brand: 'PhotoMaster',
    description: 'Professional drone with 4K camera, obstacle avoidance, and 30-minute flight time.',
    stock: 9,
    sku: 'PM-DR1007'
  },
  {
    id: 1008,
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf',
    rating: 4.6,
    ratingCount: 223,
    onSale: false,
    category: 'Electronics',
    brand: 'SmartLife',
    description: 'Advanced fitness watch with heart rate monitoring, GPS, and sleep tracking.',
    stock: 37,
    sku: 'SL-FW1008'
  },
  {
    id: 1009,
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7',
    rating: 4.7,
    ratingCount: 198,
    onSale: true,
    salePrice: 59.99,
    category: 'Electronics',
    brand: 'GameTech',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting.',
    stock: 28,
    sku: 'GT-GM1009'
  },
  {
    id: 1010,
    name: 'Premium Bluetooth Speaker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
    rating: 4.5,
    ratingCount: 167,
    onSale: false,
    category: 'Electronics',
    brand: 'SoundBeats',
    description: 'Portable Bluetooth speaker with rich bass and 24-hour battery life.',
    stock: 42,
    sku: 'SB-BS1010'
  },
  {
    id: 1011,
    name: 'Smart Home Hub',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1557100903-722a0ed3060d',
    rating: 4.7,
    ratingCount: 178,
    onSale: true,
    salePrice: 149.99,
    category: 'Electronics',
    brand: 'HomeConnect',
    description: 'Central hub to control all your smart home devices from one place.',
    stock: 32,
    sku: 'HC-SH1011'
  },
  {
    id: 1012,
    name: 'Robotic Vacuum Cleaner',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1615170143737-628d736f4970',
    rating: 4.6,
    ratingCount: 201,
    onSale: false,
    category: 'Electronics',
    brand: 'SmartLife',
    description: 'Intelligent robot vacuum with mapping technology and voice control.',
    stock: 28,
    sku: 'SL-RV1012'
  },
  {
    id: 1013,
    name: 'Digital Voice Recorder',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1590935217180-61bcd4e16177',
    rating: 4.5,
    ratingCount: 143,
    onSale: true,
    salePrice: 69.99,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'High-quality digital voice recorder with noise reduction technology.',
    stock: 41,
    sku: 'TP-DVR1013'
  },
  {
    id: 1014,
    name: 'Electric Coffee Grinder',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1574349911386-527b1f249fbe',
    rating: 4.4,
    ratingCount: 112,
    onSale: false,
    category: 'Electronics',
    brand: 'HomeChef',
    description: 'Precision coffee grinder with multiple settings for the perfect brew.',
    stock: 53,
    sku: 'HC-CG1014'
  },
  {
    id: 1015,
    name: 'Ultra HD Action Camera',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317',
    rating: 4.8,
    ratingCount: 217,
    onSale: true,
    salePrice: 199.99,
    category: 'Electronics',
    brand: 'PhotoMaster',
    description: 'Waterproof action camera with 4K recording and image stabilization.',
    stock: 37,
    sku: 'PM-AC1015'
  },
  {
    id: 1016,
    name: 'Wireless Projector',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd',
    rating: 4.7,
    ratingCount: 168,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'Smart wireless projector with Bluetooth connectivity and built-in streaming apps.',
    stock: 21,
    sku: 'TP-WP1016'
  },
  {
    id: 1017,
    name: 'Electric Food Processor',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
    rating: 4.6,
    ratingCount: 132,
    onSale: true,
    salePrice: 119.99,
    category: 'Electronics',
    brand: 'HomeChef',
    description: 'Versatile food processor with multiple attachments for various food prep tasks.',
    stock: 44,
    sku: 'HC-FP1017'
  },
  {
    id: 1018,
    name: 'Smart Electric Toothbrush',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1559590901-ea1530a3d0e5',
    rating: 4.5,
    ratingCount: 209,
    onSale: false,
    category: 'Electronics',
    brand: 'DentalPro',
    description: 'Bluetooth-connected toothbrush with pressure sensors and brushing feedback.',
    stock: 61,
    sku: 'DP-ST1018'
  },
  {
    id: 1019,
    name: 'Digital Bathroom Scale',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1578496479531-32e296d5c6e1',
    rating: 4.4,
    ratingCount: 157,
    onSale: true,
    salePrice: 39.99,
    category: 'Electronics',
    brand: 'SmartLife',
    description: 'Smart scale that measures weight, body fat, muscle mass, and syncs with fitness apps.',
    stock: 49,
    sku: 'SL-BS1019'
  },
  {
    id: 1020,
    name: 'Electronic Keyboard Piano',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0',
    rating: 4.7,
    ratingCount: 183,
    onSale: false,
    category: 'Electronics',
    brand: 'SoundBeats',
    description: '88-key digital piano with weighted keys and various instrument sounds.',
    stock: 26,
    sku: 'SB-EK1020'
  },
  {
    id: 1021,
    name: 'Smart Refrigerator',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5',
    rating: 4.8,
    ratingCount: 127,
    onSale: true,
    salePrice: 1299.99,
    category: 'Electronics',
    brand: 'HomeConnect',
    description: 'WiFi-enabled refrigerator with touchscreen display and inventory management.',
    stock: 14,
    sku: 'HC-SR1021'
  },
  {
    id: 1022,
    name: 'Digital Drawing Pad',
    price: 169.99,
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf',
    rating: 4.6,
    ratingCount: 148,
    onSale: false,
    category: 'Electronics',
    brand: 'CreativePro',
    description: 'Pressure-sensitive drawing tablet for artists and designers.',
    stock: 32,
    sku: 'CP-DD1022'
  },
  {
    id: 1023,
    name: 'Air Purifier',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1626436819821-99eda90a5d7f',
    rating: 4.7,
    ratingCount: 192,
    onSale: true,
    salePrice: 169.99,
    category: 'Electronics',
    brand: 'SmartLife',
    description: 'HEPA air purifier with air quality sensor and quiet operation.',
    stock: 38,
    sku: 'SL-AP1023'
  },
  {
    id: 1024,
    name: 'Desktop Computer',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5',
    rating: 4.9,
    ratingCount: 213,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro',
    description: 'High-performance desktop computer for gaming and professional use.',
    stock: 17,
    sku: 'TP-DC1024'
  },
  {
    id: 1025,
    name: 'Smart Doorbell',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1588458980441-a6c8bdae0fbc',
    rating: 4.6,
    ratingCount: 178,
    onSale: true,
    salePrice: 129.99,
    category: 'Electronics',
    brand: 'HomeConnect',
    description: 'WiFi doorbell with HD camera, motion detection, and two-way audio.',
    stock: 43,
    sku: 'HC-SD1025'
  },
];

const generateMoreElectronicsProducts = (): Product[] => {
  const electronicsItems = [
    { name: 'Gaming Laptop', price: 1299.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45' },
    { name: 'Ultrabook Laptop', price: 999.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed' },
    { name: 'Business Laptop', price: 899.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4' },
    { name: 'Student Laptop', price: 599.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33' },
    { name: 'Convertible Laptop', price: 799.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f' },
    
    { name: 'Pro Smartphone', price: 999.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd' },
    { name: 'Budget Smartphone', price: 299.99, brand: 'SmartLife', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97' },
    { name: 'Camera Smartphone', price: 799.99, brand: 'PhotoMaster', image: 'https://images.unsplash.com/photo-1606041011872-596597976b25' },
    { name: 'Gaming Smartphone', price: 699.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1598532213005-001c9727a22f' },
    { name: 'Foldable Smartphone', price: 1499.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179' },
    
    { name: 'Over-ear Headphones', price: 199.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
    { name: 'In-ear Headphones', price: 99.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944' },
    { name: 'Studio Headphones', price: 249.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a' },
    { name: 'Sports Headphones', price: 129.99, brand: 'FitLife', image: 'https://images.unsplash.com/photo-1491927570842-0261e477d937' },
    { name: 'Kids Headphones', price: 49.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc' },
    
    { name: 'Pro Tablet', price: 799.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0' },
    { name: 'Drawing Tablet', price: 599.99, brand: 'CreativePro', image: 'https://images.unsplash.com/photo-1561121577-37c6cae5322c' },
    { name: 'Kids Tablet', price: 199.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1588665655862-0adbe360a6a5' },
    { name: 'Budget Tablet', price: 299.99, brand: 'SmartLife', image: 'https://images.unsplash.com/photo-1585790050230-5ab0159510b7' },
    { name: 'E-Reader Tablet', price: 149.99, brand: 'TechPro', image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3' },
    
    { name: 'Smart Light Bulbs (4 Pack)', price: 59.99, brand: 'HomeConnect', image: 'https://images.unsplash.com/photo-1563461661004-74b73efaa807' },
    { name: 'Smart Thermostat', price: 129.99, brand: 'HomeConnect', image: 'https://images.unsplash.com/photo-1551040635-3c6cb9f83ab9' },
    { name: 'Smart Door Lock', price: 199.99, brand: 'HomeConnect', image: 'https://images.unsplash.com/photo-1558002038-1055e2de583b' },
    { name: 'Smart Home Camera', price: 129.99, brand: 'HomeConnect', image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6' },
    { name: 'Smart Plug (2 Pack)', price: 39.99, brand: 'HomeConnect', image: 'https://images.unsplash.com/photo-1558003226-e4ece4ebe68b' },
    
    { name: 'Soundbar', price: 249.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d' },
    { name: 'Home Theater System', price: 599.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1607979036050-9fb717c1a16b' },
    { name: 'Turntable', price: 199.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1551963837-66752a66312a' },
    { name: 'Portable Speaker', price: 79.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1' },
    { name: 'Karaoke Machine', price: 199.99, brand: 'SoundBeats', image: 'https://images.unsplash.com/photo-1571041804726-53e8bf1a756a' },
    
    { name: 'Smart Oven', price: 349.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4' },
    { name: 'Air Fryer', price: 129.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1648649384360-f2ebd68670ea' },
    { name: 'Electric Pressure Cooker', price: 99.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1593834867553-c2a8a0e18ca4' },
    { name: 'Food Dehydrator', price: 79.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1589713136968-bf7f86bb3d0e' },
    { name: 'Electric Kettle', price: 49.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1545397051-67154bd6a4e2' },
    
    { name: 'VR Headset', price: 399.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac' },
    { name: 'Gaming Desktop PC', price: 1499.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b' },
    { name: 'Gaming Monitor', price: 349.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86' },
    { name: 'Gaming Keyboard', price: 129.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3' },
    { name: 'Game Controller', price: 69.99, brand: 'GameTech', image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0' },

    { name: 'Washing Machine', price: 599.99, brand: 'SmartLife', image: 'https://images.unsplash.com/photo-1626806787461-102c1a6f4708' },
    { name: 'Clothes Dryer', price: 549.99, brand: 'SmartLife', image: 'https://images.unsplash.com/photo-1633582626033-ab9184873fed' },
    { name: 'Dishwasher', price: 499.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a' },
    { name: 'Microwave Oven', price: 149.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078' },
    { name: 'Electric Stove', price: 699.99, brand: 'HomeChef', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba' },
    
    { name: 'Power Generator', price: 899.99, brand: 'PowerUp', image: 'https://images.unsplash.com/photo-1518553582400-d51695d6fa31' },
    { name: 'Electric Chainsaw', price: 199.99, brand: 'PowerUp', image: 'https://images.unsplash.com/photo-1640121428314-bd57b6ecd345' },
    { name: 'Electric Drill', price: 129.99, brand: 'PowerUp', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c' },
    { name: 'Industrial Fan', price: 249.99, brand: 'PowerUp', image: 'https://images.unsplash.com/photo-1638184984605-af1f05249a56' },
    { name: 'Laser Level Tool', price: 149.99, brand: 'PowerUp', image: 'https://images.unsplash.com/photo-1572981779307-38e6930b2c4e' },
  ];
  
  const products: Product[] = [];
  let idCounter = 1030;
  
  electronicsItems.forEach((item, index) => {
    const baseProduct: Product = {
      id: idCounter++,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: Number((4 + Math.random()).toFixed(1)) > 5 ? 5 : Number((4 + Math.random()).toFixed(1)),
      ratingCount: Math.floor(Math.random() * 300) + 100,
      onSale: Math.random() > 0.7,
      category: 'Electronics',
      brand: item.brand,
      description: `High-quality ${item.name.toLowerCase()} designed for optimal performance and durability.`,
      stock: Math.floor(Math.random() * 50) + 10,
      sku: `${item.brand.substring(0, 2).toUpperCase()}-${idCounter.toString().padStart(5, '0')}`
    };
    
    if (baseProduct.onSale) {
      baseProduct.salePrice = Number((baseProduct.price * 0.85).toFixed(2));
    }
    
    products.push(baseProduct);
    
    if (index % 3 === 0) {
      const premiumProduct: Product = {
        id: idCounter++,
        name: `Premium ${item.name}`,
        price: Number((item.price * 1.5).toFixed(2)),
        image: item.image,
        rating: Number((4.7 + Math.random() * 0.3).toFixed(1)) > 5 ? 5 : Number((4.7 + Math.random() * 0.3).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 200) + 150,
        onSale: Math.random() > 0.8,
        category: 'Electronics',
        brand: item.brand,
        description: `Premium version of our popular ${item.name.toLowerCase()} with advanced features and superior performance.`,
        stock: Math.floor(Math.random() * 40) + 5,
        sku: `${item.brand.substring(0, 2).toUpperCase()}-P${idCounter.toString().padStart(4, '0')}`
      };
      
      if (premiumProduct.onSale) {
        premiumProduct.salePrice = Number((premiumProduct.price * 0.9).toFixed(2));
      }
      
      products.push(premiumProduct);
    }
    
    if (index % 4 === 0) {
      const budgetProduct: Product = {
        id: idCounter++,
        name: `Compact ${item.name}`,
        price: Number((item.price * 0.7).toFixed(2)),
        image: item.image,
        rating: Number((3.8 + Math.random() * 0.7).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 150) + 50,
        onSale: Math.random() > 0.6,
        category: 'Electronics',
        brand: item.brand,
        description: `Affordable ${item.name.toLowerCase()} with essential features for budget-conscious consumers.`,
        stock: Math.floor(Math.random() * 80) + 20,
        sku: `${item.brand.substring(0, 2).toUpperCase()}-B${idCounter.toString().padStart(4, '0')}`
      };
      
      if (budgetProduct.onSale) {
        budgetProduct.salePrice = Number((budgetProduct.price * 0.8).toFixed(2));
      }
      
      products.push(budgetProduct);
    }
  });
  
  return products;
};

const moreElectronicsProducts = generateMoreElectronicsProducts();

export const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const allProductsWithMore = [...allProducts, ...additionalElectronicsProducts, ...moreElectronicsProducts];
  
  const [products, setProducts] = useState<Product[]>(
    allProductsWithMore.filter(p => p.category === 'Electronics')
  );
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getCategories();
  const brands = getBrands();
  
  const [filters, setFilters] = useState<Filters>({
    categories: ['Electronics'],
    brands: [],
    onSale: false,
  });
  
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    let filteredProducts = [...allProductsWithMore];
    
    filteredProducts = filteredProducts.filter(product => 
      product.category === 'Electronics'
    );
    
    if (search) {
      setSearchQuery(search);
      const lowercaseQuery = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.category.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (category) {
      const updatedFilters = { ...filters };
      const categoryName = categories.find(c => c.toLowerCase() === category.toLowerCase());
      
      if (categoryName && !filters.categories.includes(categoryName)) {
        updatedFilters.categories = [categoryName];
        setFilters(updatedFilters);
      }
    }
    
    setProducts(filteredProducts);
  }, [searchParams]);
  
  const toggleFilter = (type: 'categories' | 'brands', value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[type]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: currentValues
      };
    });
  };
  
  const applyFilters = () => {
    let filtered = allProductsWithMore.filter(p => p.category === 'Electronics');
    
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }
    
    if (priceRange.min && priceRange.max) {
      const min = parseFloat(priceRange.min);
      const max = parseFloat(priceRange.max);
      
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(p => {
          const priceToCheck = p.onSale ? p.salePrice! : p.price;
          return priceToCheck >= min && priceToCheck <= max;
        });
      }
    } else if (priceRange.min) {
      const min = parseFloat(priceRange.min);
      if (!isNaN(min)) {
        filtered = filtered.filter(p => {
          const priceToCheck = p.onSale ? p.salePrice! : p.price;
          return priceToCheck >= min;
        });
      }
    } else if (priceRange.max) {
      const max = parseFloat(priceRange.max);
      if (!isNaN(max)) {
        filtered = filtered.filter(p => {
          const priceToCheck = p.onSale ? p.salePrice! : p.price;
          return priceToCheck <= max;
        });
      }
    }
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.category.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (filters.onSale) {
      filtered = filtered.filter(p => p.onSale);
    }
    
    setProducts(filtered);
  };
  
  const resetFilters = () => {
    setFilters({
      categories: ['Electronics'],
      brands: [],
      onSale: false,
    });
    setPriceRange({ min: '', max: '' });
    
    const electronicsProducts = allProductsWithMore.filter(p => p.category === 'Electronics');
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = electronicsProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
      );
      setProducts(filtered);
    } else {
      setProducts(electronicsProducts);
    }
  };

  return {
    products,
    showFilters,
    setShowFilters,
    searchQuery,
    priceRange,
    setPriceRange,
    filters,
    categories,
    brands,
    toggleFilter,
    applyFilters,
    resetFilters,
    setFilters
  };
};
