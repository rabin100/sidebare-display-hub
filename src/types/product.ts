
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

// Helper function to generate random prices
const generatePrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Helper function to generate random ratings
const generateRating = (): number => {
  return parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1));
};

// Helper function to generate random stock
const generateStock = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

// Helper function to generate random rating count
const generateRatingCount = (): number => {
  return Math.floor(Math.random() * 500) + 50;
};

// Helper to determine if a product is on sale
const isOnSale = (): boolean => {
  return Math.random() > 0.7; // 30% chance of being on sale
};

// Base products (original ones)
const baseProducts: Product[] = [
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

// Categories and brands for products
const categories = [
  "Electronics", "Clothing", "Home & Kitchen", "Books", "Toys & Games", 
  "Beauty & Personal Care", "Sports & Outdoors", "Automotive", "Health", 
  "Grocery", "Baby", "Pet Supplies", "Office Products", "Tools & Home Improvement",
  "Furniture", "Wearables", "Audio", "Smart Home", "Gaming", "Cameras", "Kitchen"
];

const brands = [
  "TechPro", "SoundBeats", "SmartLife", "ComfortPlus", "KeyMaster", "HomeDesign",
  "FitLife", "PhotoMaster", "GameTech", "AromaBliss", "BrewMaster", "ArtVibe",
  "CreativePro", "UrbanStyle", "HomeChef", "UrbanPack", "GreenLife", "FlexFit",
  "HomeConnect", "LightMaster", "SunStyle", "PowerUp", "DentalPro", "TimeMaster"
];

// Product names by category to make them more realistic
const productNamesByCagetory: Record<string, string[]> = {
  "Electronics": ["Laptop", "Smartphone", "Tablet", "Monitor", "Keyboard", "Mouse", "Printer", "Scanner", "Router", "Modem", "USB Drive", "External HDD", "Webcam", "Microphone", "Speakers"],
  "Clothing": ["T-Shirt", "Jeans", "Dress", "Shirt", "Sweater", "Jacket", "Coat", "Shorts", "Skirt", "Socks", "Underwear", "Pajamas", "Swimwear", "Hoodie", "Gloves"],
  "Home & Kitchen": ["Blender", "Toaster", "Coffee Maker", "Microwave", "Refrigerator", "Mixer", "Oven", "Dishwasher", "Vacuum Cleaner", "Air Purifier", "Kettle", "Pan", "Pot", "Knife Set", "Cutting Board"],
  "Books": ["Fiction Novel", "Biography", "Self-Help Book", "Cookbook", "History Book", "Science Book", "Children's Book", "Fantasy Novel", "Art Book", "Travel Guide", "Dictionary", "Encyclopedia", "Comic Book", "Poetry Collection", "Reference Book"],
  "Toys & Games": ["Action Figure", "Board Game", "Puzzle", "Doll", "Remote Control Car", "Building Blocks", "Stuffed Animal", "Card Game", "Video Game", "Educational Toy", "Outdoor Toy", "Arts & Crafts Kit", "Science Kit", "Musical Toy", "Collectible"],
  "Beauty & Personal Care": ["Shampoo", "Conditioner", "Soap", "Body Wash", "Lotion", "Cream", "Sunscreen", "Lipstick", "Mascara", "Foundation", "Nail Polish", "Hair Dryer", "Straightener", "Electric Razor", "Toothbrush"],
  "Sports & Outdoors": ["Tennis Racket", "Basketball", "Football", "Soccer Ball", "Baseball Bat", "Fishing Rod", "Camping Tent", "Sleeping Bag", "Hiking Boots", "Bicycle", "Skateboard", "Snowboard", "Golf Club", "Yoga Mat", "Dumbbell"],
  "Automotive": ["Car Cover", "Floor Mat", "Seat Cover", "Air Freshener", "Car Wax", "Car Shampoo", "Tire Inflator", "Jump Starter", "Dash Cam", "GPS Navigator", "Phone Mount", "Tool Kit", "First Aid Kit", "Emergency Kit", "Roof Rack"],
  "Health": ["Vitamin", "Supplement", "First Aid Kit", "Thermometer", "Blood Pressure Monitor", "Glucose Monitor", "Heating Pad", "Ice Pack", "Compression Sock", "Back Brace", "Knee Brace", "Ankle Brace", "Crutch", "Walker", "Wheelchair"],
  "Grocery": ["Coffee", "Tea", "Cereal", "Pasta", "Rice", "Flour", "Sugar", "Salt", "Pepper", "Oil", "Vinegar", "Sauce", "Spice", "Candy", "Chocolate"],
  "Baby": ["Diaper", "Wipe", "Formula", "Baby Food", "Bottle", "Pacifier", "Teether", "Bib", "Onesie", "Stroller", "Car Seat", "Crib", "Baby Monitor", "Changing Table", "High Chair"],
  "Pet Supplies": ["Dog Food", "Cat Food", "Pet Bed", "Pet Toy", "Pet Collar", "Pet Leash", "Pet Bowl", "Pet Carrier", "Pet Shampoo", "Pet Brush", "Pet Nail Clipper", "Pet First Aid Kit", "Pet Vitamin", "Pet Treat", "Pet Cage"],
  "Office Products": ["Pen", "Pencil", "Notebook", "Paper", "Stapler", "Staple", "Paper Clip", "Binder", "Folder", "Calendar", "Planner", "Desk Organizer", "Desk Lamp", "Chair", "Desk"],
  "Tools & Home Improvement": ["Hammer", "Screwdriver", "Wrench", "Plier", "Drill", "Saw", "Level", "Tape Measure", "Ladder", "Paint", "Brush", "Nail", "Screw", "Bolt", "Nut"],
  "Furniture": ["Chair", "Table", "Desk", "Bed", "Sofa", "Couch", "Dresser", "Nightstand", "Bookshelf", "Cabinet", "Wardrobe", "Ottoman", "Stool", "Bench", "Lamp"],
  "Wearables": ["Smart Watch", "Fitness Tracker", "Smart Ring", "Smart Glasses", "Smart Earring", "Smart Necklace", "Smart Bracelet", "Smart Anklet", "Smart Pendant", "Smart Belt", "Smart Hat", "Smart Glove", "Smart Sock", "Smart Shoe", "Smart Shirt"],
  "Audio": ["Headphone", "Earbud", "Speaker", "Soundbar", "Receiver", "Amplifier", "Turntable", "Record Player", "CD Player", "MP3 Player", "Radio", "Microphone", "Mixer", "Subwoofer", "Equalizer"],
  "Smart Home": ["Smart Light", "Smart Switch", "Smart Plug", "Smart Thermostat", "Smart Lock", "Smart Camera", "Smart Doorbell", "Smart Speaker", "Smart Display", "Smart Hub", "Smart Sensor", "Smart Alarm", "Smart Fan", "Smart Blinds", "Smart Garage Door"],
  "Gaming": ["Game Console", "Controller", "Gaming Mouse", "Gaming Keyboard", "Gaming Headset", "Gaming Chair", "Gaming Desk", "Gaming Monitor", "VR Headset", "Gaming Laptop", "Gaming PC", "Game", "Gaming Accessory", "Gaming Mouse Pad", "Gaming Glasses"],
  "Cameras": ["DSLR Camera", "Mirrorless Camera", "Point and Shoot Camera", "Action Camera", "Instant Camera", "Film Camera", "Security Camera", "Dash Camera", "Drone Camera", "Webcam", "Camera Lens", "Camera Battery", "Camera Charger", "Camera Bag", "Camera Tripod"],
  "Kitchen": ["Knife", "Cutting Board", "Pot", "Pan", "Blender", "Food Processor", "Mixer", "Coffee Maker", "Toaster", "Microwave", "Refrigerator", "Dishwasher", "Oven", "Stove", "Grill"]
};

// Image URLs by category
const imageUrlsByCategory: Record<string, string[]> = {
  "Electronics": [
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
  ],
  "Clothing": [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68",
    "https://images.unsplash.com/photo-1583744946564-b52d01c96e70"
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1525373612132-b3e820b87cea",
    "https://images.unsplash.com/photo-1584954587637-9cd1a9d8050f",
    "https://images.unsplash.com/photo-1555590484-1895a2650c54"
  ],
  "Books": [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
  ],
  "Toys & Games": [
    "https://images.unsplash.com/photo-1516627145497-ae6968895b15",
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b"
  ],
  "Beauty & Personal Care": [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    "https://images.unsplash.com/photo-1631730359585-5d3aab934307"
  ],
  "Sports & Outdoors": [
    "https://images.unsplash.com/photo-1588286840104-8957b019727f",
    "https://images.unsplash.com/photo-1518365058516-256072c3dcd7",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e"
  ],
  "Automotive": [
    "https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d"
  ],
  "Health": [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    "https://images.unsplash.com/photo-1566663578654-5dd9d4a4fd04",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
  ],
  "Grocery": [
    "https://images.unsplash.com/photo-1542838132-92c53300491e",
    "https://images.unsplash.com/photo-1543168256-418811576931",
    "https://images.unsplash.com/photo-1542838132-5a7d862466a9"
  ],
  "Baby": [
    "https://images.unsplash.com/photo-1600697230063-f41ba2a28b1e",
    "https://images.unsplash.com/photo-1522771930-78848d9293e8",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba"
  ],
  "Pet Supplies": [
    "https://images.unsplash.com/photo-1585499193151-0f50d54f17f4",
    "https://images.unsplash.com/photo-1607923432835-3ecc2d78f376",
    "https://images.unsplash.com/photo-1583337130417-3346b1be7dee"
  ],
  "Office Products": [
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    "https://images.unsplash.com/photo-1542435503-956c469947f6",
    "https://images.unsplash.com/photo-1526289034009-0240ddb68ce3"
  ],
  "Tools & Home Improvement": [
    "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd",
    "https://images.unsplash.com/photo-1622044460624-da34abaa29ca",
    "https://images.unsplash.com/photo-1423666639041-f56000c27a9a"
  ],
  "Furniture": [
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
    "https://images.unsplash.com/photo-1618220179428-22790b461013",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
  ],
  "Wearables": [
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
    "https://images.unsplash.com/photo-1617043786394-f977fa12eddf",
    "https://images.unsplash.com/photo-1610438235354-a6ae5528385c"
  ],
  "Audio": [
    "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    "https://images.unsplash.com/photo-1612444530582-fc66183b16f3"
  ],
  "Smart Home": [
    "https://images.unsplash.com/photo-1558002038-1055e2de583b",
    "https://images.unsplash.com/photo-1556228841-a3a2c4605ca6",
    "https://images.unsplash.com/photo-1560253787-9c3babc1fab2"
  ],
  "Gaming": [
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    "https://images.unsplash.com/photo-1616530940355-351fabd9524b"
  ],
  "Cameras": [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    "https://images.unsplash.com/photo-1563208960956-c3dc72310b44",
    "https://images.unsplash.com/photo-1613414904593-25219e6f7a59"
  ],
  "Kitchen": [
    "https://images.unsplash.com/photo-1523567353-71ea31cb9f73",
    "https://images.unsplash.com/photo-1522675792492-28fff96feaff",
    "https://images.unsplash.com/photo-1590794056419-7a73dbcc8a3c"
  ]
};

// Generate additional products to reach 500 items
const additionalProducts: Product[] = [];
let id = 29; // Start from the next available ID

for (let i = 0; i < 480; i++) {
  // Pick a random category
  const category = categories[Math.floor(Math.random() * categories.length)];
  // Pick a random brand
  const brand = brands[Math.floor(Math.random() * brands.length)];
  
  // Pick a random product name from the category
  const productNames = productNamesByCagetory[category] || ["Product"];
  const productName = productNames[Math.floor(Math.random() * productNames.length)];
  
  // Pick a suitable adjective to make the product name unique
  const adjectives = ["Premium", "Deluxe", "Professional", "Ultimate", "Classic", "Modern", "Compact", "Portable", "Wireless", "Smart", "Advanced", "Elite", "Luxury", "Budget", "Essential"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  // Generate a unique product name
  const uniqueName = `${adjective} ${productName} ${id - 28}`;
  
  // Pick a random image URL for the category
  const categoryImages = imageUrlsByCategory[category] || ["https://images.unsplash.com/photo-1592150621744-aca64f48394a"];
  const image = categoryImages[Math.floor(Math.random() * categoryImages.length)];
  
  // Generate price (different ranges for different categories)
  let minPrice = 10;
  let maxPrice = 100;
  
  if (category === "Electronics" || category === "Cameras" || category === "Gaming") {
    minPrice = 100;
    maxPrice = 1500;
  } else if (category === "Furniture" || category === "Smart Home") {
    minPrice = 50;
    maxPrice = 800;
  } else if (category === "Clothing" || category === "Beauty & Personal Care") {
    minPrice = 15;
    maxPrice = 150;
  }
  
  const price = generatePrice(minPrice, maxPrice);
  const onSale = isOnSale();
  
  // Create a new product
  const newProduct: Product = {
    id: id++,
    name: uniqueName,
    price: price,
    image: image,
    rating: generateRating(),
    ratingCount: generateRatingCount(),
    category: category,
    brand: brand,
    stock: generateStock(),
    sku: `${category.substring(0, 3).toUpperCase()}-${(id - 28).toString().padStart(5, '0')}`,
    description: `A high-quality ${adjective.toLowerCase()} ${productName.toLowerCase()} designed for optimal performance and durability. This ${brand} product features excellent craftsmanship and attention to detail.`
  };
  
  // Add sale price if on sale
  if (onSale) {
    newProduct.onSale = true;
    newProduct.salePrice = parseFloat((price * 0.85).toFixed(2)); // 15% discount
  }
  
  additionalProducts.push(newProduct);
}

// Define detailed products with more complete information
const detailedProducts: Product[] = [
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
    brand: 'SoundBeats',
    stock: 45,
    sku: 'SB-WH001',
    description: 'Premium wireless headphones with noise cancellation and long battery life.'
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
    brand: 'TechPro',
    stock: 23,
    sku: 'TP-LT002',
    description: 'High-performance laptop with the latest processor and ample storage.'
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
    brand: 'SmartLife',
    stock: 67,
    sku: 'SL-SW003',
    description: 'Feature-rich smart watch with health tracking and notifications.'
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
    brand: 'ComfortPlus',
    stock: 34,
    sku: 'CP-DC004',
    description: 'Ergonomic desk chair designed for comfort during long work sessions.'
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
    brand: 'TechPro',
    stock: 89,
    sku: 'TP-WM005',
    description: 'Responsive wireless mouse with long battery life and ergonomic design.'
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
    brand: 'KeyMaster',
    stock: 56,
    sku: 'KM-MK006',
    description: 'Tactile mechanical keyboard with customizable RGB lighting and programmable keys.'
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
    brand: 'HomeDesign',
    stock: 22,
    sku: 'HD-CT007',
    description: 'Stylish modern coffee table that complements any living room decor.'
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
    brand: 'FitLife',
    stock: 78,
    sku: 'FL-FT008',
    description: 'Waterproof fitness tracker with heart rate monitoring and sleep tracking.'
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
    brand: 'PhotoMaster',
    stock: 19,
    sku: 'PM-DC009',
    description: 'High-resolution digital camera with advanced features for photography enthusiasts.'
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
    brand: 'GameTech',
    stock: 13,
    sku: 'GT-GC010',
    description: 'Next-generation gaming console with stunning graphics and immersive gameplay.'
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
    brand: 'SoundBeats',
    stock: 64,
    sku: 'SB-BS011',
    description: 'Portable Bluetooth speaker with rich sound and water resistance for outdoor use.'
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
    brand: 'ErgoWorks',
    stock: 31,
    sku: 'EW-SD012',
    description: 'Adjustable standing desk for a healthier work environment.'
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
    brand: 'TimeMaster',
    stock: 42,
    sku: 'TM-DW013',
    description: 'Elegant designer watch with premium materials and precision movement.'
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
    brand: 'UrbanStyle',
    stock: 125,
    sku: 'US-GT014',
    description: 'Trendy graphic t-shirt made from soft, breathable cotton.'
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
    brand: 'HomeChef',
    stock: 38,
    sku: 'HC-SB015',
    description: 'Programmable smart blender with multiple speed settings and presets.'
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
    brand: 'SoundBeats',
    stock: 87,
    sku: 'SB-WE016',
    description: 'True wireless earbuds with active noise cancellation and touch controls.'
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
    brand: 'UrbanPack',
    stock: 96,
    sku: 'UP-SB017',
    description: 'Versatile backpack with multiple compartments and padded laptop sleeve.'
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
    brand: 'GreenLife',
    stock: 43,
    sku: 'GL-IP018',
    description: 'Low-maintenance indoor plant perfect for adding greenery to any space.'
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
    brand: 'FlexFit',
    stock: 74,
    sku: 'FF-YM019',
    description: 'Non-slip yoga mat with extra thickness for joint protection and comfort.'
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
    brand: 'HomeConnect',
    stock: 27,
    sku: 'HC-ST020',
    description: 'Wi-Fi enabled smart thermostat that learns your preferences and saves energy.'
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
    brand: 'LightMaster',
    stock: 59,
    sku: 'LM-DL021',
    description: 'Adjustable desk lamp with multiple brightness levels and color temperatures.'
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
    brand: 'SunStyle',
    stock: 36,
    sku: 'SS-PS022',
    description: 'Polarized sunglasses with UV protection and durable frame.'
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
    brand: 'PowerUp',
    stock: 92,
    sku: 'PU-WC023',
    description: 'Fast wireless charger compatible with all Qi-enabled devices.'
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
    brand: 'DentalPro',
    stock: 47,
    sku: 'DP-ET024',
    description: 'Sonic electric toothbrush with multiple cleaning modes and timer.'
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
    brand: 'AromaBliss',
    stock: 68,
    sku: 'AB-EOD025',
    description: 'Ultrasonic essential oil diffuser with LED lights and automatic shut-off.'
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
    brand: 'BrewMaster',
    stock: 32,
    sku: 'BM-CM026',
    description: 'Programmable coffee maker with built-in grinder and multiple brewing options.'
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
    brand: 'ArtVibe',
    stock: 25,
    sku: 'AV-WA027',
    description: 'Contemporary wall art print that adds style and personality to any room.'
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
    brand: 'CreativePro',
    stock: 18,
    sku: 'CP-DDT028',
    description: 'Pressure-sensitive drawing tablet for digital artists and graphic designers.'
  }
];

// Now export a single combined array of all products
export const allProducts: Product[] = [
  ...detailedProducts,
  ...additionalProducts
];

export const getCategories = (): string[] => {
  return [...new Set(allProducts.map(p => p.category))];
};

export const getBrands = (): string[] => {
  return [...new Set(allProducts.map(p => p.brand))];
};
