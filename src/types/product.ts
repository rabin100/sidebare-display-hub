
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  ratingCount: number;
  onSale?: boolean;
  salePrice?: number;
  category: string;
  brand: string;
  description?: string;
  stock?: number;
  sku?: string;
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    rating: 4.8,
    ratingCount: 356,
    onSale: true,
    salePrice: 129.99,
    category: 'Electronics',
    brand: 'SoundBeats'
  },
  {
    id: 2,
    name: 'Premium Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    rating: 4.9,
    ratingCount: 412,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1549482199-bc1ca6f58502',
    rating: 4.7,
    ratingCount: 284,
    onSale: true,
    salePrice: 249.99,
    category: 'Wearables',
    brand: 'SmartLife'
  },
  {
    id: 4,
    name: 'Modern Desk Chair',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8',
    rating: 4.6,
    ratingCount: 178,
    onSale: false,
    category: 'Furniture',
    brand: 'ComfortPlus'
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1611366652918-63ec707e5c3e',
    rating: 4.5,
    ratingCount: 156,
    onSale: false,
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef',
    rating: 4.8,
    ratingCount: 203,
    onSale: true,
    salePrice: 99.99,
    category: 'Electronics',
    brand: 'KeyMaster'
  },
  {
    id: 7,
    name: 'Coffee Table',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1588784189346-9eb9d5509303',
    rating: 4.4,
    ratingCount: 124,
    onSale: false,
    category: 'Furniture',
    brand: 'HomeDesign'
  },
  {
    id: 8,
    name: 'Fitness Tracker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6',
    rating: 4.6,
    ratingCount: 187,
    onSale: true,
    salePrice: 69.99,
    category: 'Wearables',
    brand: 'FitLife'
  },
  {
    id: 9,
    name: 'Digital Camera',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    rating: 4.7,
    ratingCount: 142,
    onSale: false,
    category: 'Cameras',
    brand: 'PhotoMaster'
  },
  {
    id: 10,
    name: 'Gaming Console',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3',
    rating: 4.9,
    ratingCount: 315,
    onSale: false,
    category: 'Gaming',
    brand: 'GameTech'
  },
  {
    id: 11,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab',
    rating: 4.5,
    ratingCount: 213,
    onSale: true,
    salePrice: 59.99,
    category: 'Audio',
    brand: 'SoundBeats'
  },
  {
    id: 12,
    name: 'Standing Desk',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1593642634443-44adaa06623a',
    rating: 4.6,
    ratingCount: 98,
    onSale: false,
    category: 'Furniture',
    brand: 'ErgoWorks'
  },
  {
    id: 13,
    name: 'Designer Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
    rating: 4.8,
    ratingCount: 167,
    onSale: true,
    salePrice: 149.99,
    category: 'Wearables',
    brand: 'TimeMaster'
  },
  {
    id: 14,
    name: 'Graphic T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    rating: 4.3,
    ratingCount: 219,
    onSale: false,
    category: 'Clothing',
    brand: 'UrbanStyle'
  },
  {
    id: 15,
    name: 'Smart Blender',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1525373612132-b3e820b87cea',
    rating: 4.4,
    ratingCount: 87,
    onSale: true,
    salePrice: 99.99,
    category: 'Kitchen',
    brand: 'HomeChef'
  },
  {
    id: 16,
    name: 'Wireless Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46',
    rating: 4.7,
    ratingCount: 341,
    onSale: false,
    category: 'Audio',
    brand: 'SoundBeats'
  },
  {
    id: 17,
    name: 'Stylish Backpack',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    rating: 4.5,
    ratingCount: 124,
    onSale: true,
    salePrice: 59.99,
    category: 'Accessories',
    brand: 'UrbanPack'
  },
  {
    id: 18,
    name: 'Indoor Plant',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
    rating: 4.3,
    ratingCount: 89,
    onSale: false,
    category: 'Home',
    brand: 'GreenLife'
  },
  {
    id: 19,
    name: 'Yoga Mat',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f',
    rating: 4.7,
    ratingCount: 231,
    onSale: true,
    salePrice: 39.99,
    category: 'Fitness',
    brand: 'FlexFit'
  },
  {
    id: 20,
    name: 'Smart Thermostat',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1605105854711-5eb8c310683c',
    rating: 4.8,
    ratingCount: 178,
    onSale: false,
    category: 'Smart Home',
    brand: 'HomeConnect'
  },
  {
    id: 21,
    name: 'Desk Lamp',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1573297888763-60ca58287b5c',
    rating: 4.4,
    ratingCount: 115,
    onSale: true,
    salePrice: 39.99,
    category: 'Home',
    brand: 'LightMaster'
  },
  {
    id: 22,
    name: 'Premium Sunglasses',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1584036553516-bf83210aa16c',
    rating: 4.6,
    ratingCount: 92,
    onSale: false,
    category: 'Accessories',
    brand: 'SunStyle'
  },
  {
    id: 23,
    name: 'Wireless Charger',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601488834946-9517076be1ad',
    rating: 4.5,
    ratingCount: 154,
    onSale: true,
    salePrice: 29.99,
    category: 'Electronics',
    brand: 'PowerUp'
  },
  {
    id: 24,
    name: 'Electric Toothbrush',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1559590872-7031f2c4bfb7',
    rating: 4.7,
    ratingCount: 203,
    onSale: false,
    category: 'Personal Care',
    brand: 'DentalPro'
  },
  {
    id: 25,
    name: 'Essential Oil Diffuser',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1618709246643-87d04666d231',
    rating: 4.3,
    ratingCount: 127,
    onSale: true,
    salePrice: 35.99,
    category: 'Home',
    brand: 'AromaBliss'
  },
  {
    id: 26,
    name: 'Coffee Maker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1523567557034-462fba6014a1',
    rating: 4.8,
    ratingCount: 247,
    onSale: false,
    category: 'Kitchen',
    brand: 'BrewMaster'
  },
  {
    id: 27,
    name: 'Wall Art',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69',
    rating: 4.5,
    ratingCount: 98,
    onSale: true,
    salePrice: 59.99,
    category: 'Home Decor',
    brand: 'ArtVibe'
  },
  {
    id: 28,
    name: 'Digital Drawing Tablet',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1569324077633-7247fb797f47',
    rating: 4.7,
    ratingCount: 156,
    onSale: false,
    category: 'Electronics',
    brand: 'CreativePro'
  }
];

export const getCategories = (): string[] => {
  return [...new Set(allProducts.map(p => p.category))];
};

export const getBrands = (): string[] => {
  return [...new Set(allProducts.map(p => p.brand))];
};
