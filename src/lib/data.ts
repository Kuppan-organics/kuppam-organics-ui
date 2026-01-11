import { Product, Category, Testimonial, Outlet } from './types';

import categoryVegetables from '@/assets/category-vegetables.jpg';
import categoryFruits from '@/assets/category-fruits.jpg';
import categoryGrains from '@/assets/category-grains.jpg';
import categoryHoney from '@/assets/category-honey.jpg';
import categoryOils from '@/assets/category-oils.jpg';

import productTomatoes from '@/assets/product-tomatoes.jpg';
import productMangoes from '@/assets/product-mangoes.jpg';
import productRice from '@/assets/product-rice.jpg';
import productCoconutOil from '@/assets/product-coconut-oil.jpg';
import productSpinach from '@/assets/product-spinach.jpg';
import productHoney from '@/assets/product-honey.jpg';

export const categories: Category[] = [
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    image: categoryVegetables,
    description: 'Farm-fresh organic vegetables harvested daily',
    productCount: 45,
  },
  {
    id: 'fruits',
    name: 'Seasonal Fruits',
    image: categoryFruits,
    description: 'Naturally ripened fruits from our orchards',
    productCount: 32,
  },
  {
    id: 'grains',
    name: 'Grains & Millets',
    image: categoryGrains,
    description: 'Traditional grains grown without chemicals',
    productCount: 28,
  },
  {
    id: 'honey',
    name: 'Pure Honey',
    image: categoryHoney,
    description: 'Raw, unprocessed honey from forest beekeepers',
    productCount: 8,
  },
  {
    id: 'oils',
    name: 'Cold-Pressed Oils',
    image: categoryOils,
    description: 'Traditional wood-pressed cooking oils',
    productCount: 12,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh, vine-ripened organic tomatoes grown without pesticides. Rich in lycopene and antioxidants.',
    price: 60,
    originalPrice: 75,
    image: productTomatoes,
    category: 'vegetables',
    badge: 'bestseller',
    weight: '500g',
    inStock: true,
    nutritionalInfo: 'Rich in Vitamin C, Potassium, and Lycopene',
    farmingMethod: 'Grown using traditional composting methods, hand-picked at peak ripeness',
  },
  {
    id: '2',
    name: 'Alphonso Mangoes',
    description: 'Premium Alphonso mangoes from Kuppam orchards. Naturally ripened with authentic taste.',
    price: 450,
    image: productMangoes,
    category: 'fruits',
    badge: 'organic',
    weight: '1 Dozen',
    inStock: true,
    nutritionalInfo: 'High in Vitamin A, C, and Fiber',
    farmingMethod: 'Tree-ripened mangoes from our 50-year old organic orchard',
  },
  {
    id: '3',
    name: 'Brown Rice',
    description: 'Unpolished brown rice with all nutrients intact. Sourced from traditional paddy fields.',
    price: 180,
    originalPrice: 200,
    image: productRice,
    category: 'grains',
    badge: 'organic',
    weight: '1 kg',
    inStock: true,
    nutritionalInfo: 'High in fiber, manganese, and selenium',
    farmingMethod: 'Grown in natural water-fed fields without synthetic fertilizers',
  },
  {
    id: '4',
    name: 'Virgin Coconut Oil',
    description: 'Cold-pressed virgin coconut oil made from fresh coconuts. Perfect for cooking and skincare.',
    price: 320,
    image: productCoconutOil,
    category: 'oils',
    badge: 'bestseller',
    weight: '500ml',
    inStock: true,
    nutritionalInfo: 'Contains MCTs, Lauric acid, and healthy fats',
    farmingMethod: 'Wood-pressed using traditional chekku method',
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    description: 'Tender organic spinach leaves, freshly harvested. Rich in iron and essential nutrients.',
    price: 35,
    image: productSpinach,
    category: 'vegetables',
    badge: 'new',
    weight: '250g',
    inStock: true,
    nutritionalInfo: 'Excellent source of Iron, Vitamin K, and Folate',
    farmingMethod: 'Grown in nutrient-rich soil with natural pest control',
  },
  {
    id: '6',
    name: 'Forest Wild Honey',
    description: 'Pure, raw honey collected from forest beekeepers. Unpasteurized with natural enzymes intact.',
    price: 550,
    originalPrice: 650,
    image: productHoney,
    category: 'honey',
    badge: 'organic',
    weight: '500g',
    inStock: true,
    nutritionalInfo: 'Natural antibacterial properties, rich in antioxidants',
    farmingMethod: 'Ethically sourced from tribal beekeepers in forest regions',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Bangalore',
    rating: 5,
    comment: 'The vegetables from Kuppam Organics are truly fresh and flavorful. My family noticed the difference immediately. The taste reminds me of my grandmother\'s farm.',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Chennai',
    rating: 5,
    comment: 'Finally found a trusted source for organic produce. The cold-pressed oils have transformed our cooking. Absolutely authentic quality!',
  },
  {
    id: '3',
    name: 'Anitha Reddy',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Their commitment to traditional farming is evident in every product. The forest honey is the best I\'ve ever tasted. Highly recommended!',
  },
];

export const outlets: Outlet[] = [
  {
    id: '1',
    name: 'Kuppam Main Store',
    address: '123 Market Road, Near Bus Stand',
    city: 'Kuppam',
    phone: '+91 98765 43210',
    timings: '8:00 AM - 9:00 PM',
  },
  {
    id: '2',
    name: 'Bangalore Outlet',
    address: '456 Organic Lane, Indiranagar',
    city: 'Bangalore',
    phone: '+91 98765 43211',
    timings: '9:00 AM - 8:00 PM',
  },
  {
    id: '3',
    name: 'Chennai Store',
    address: '789 Health Street, T. Nagar',
    city: 'Chennai',
    phone: '+91 98765 43212',
    timings: '9:00 AM - 8:00 PM',
  },
];
