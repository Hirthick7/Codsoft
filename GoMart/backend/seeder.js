const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const products = [
    // ── Electronics ──────────────────────────────────────────
    {
        name: 'Nexus X1 Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        description: 'Experience pure sound with noise-cancelling technology and 40-hour battery life.',
        category: 'Electronics',
        price: 15999,
        stock: 10,
    },
    {
        name: 'Orbit Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        description: 'Customizable keys with RGB lighting and tactile switches for the best typing experience.',
        category: 'Electronics',
        price: 12999,
        stock: 15,
    },
    {
        name: 'Studio M1 Smart Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        description: 'Capture stunning 4K video and high-resolution photos with AI-assisted focus.',
        category: 'Electronics',
        price: 45000,
        stock: 8,
    },
    {
        name: 'UltraView 27" Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a573d5e759?w=800&q=80',
        description: '4K IPS display with 144Hz refresh rate, HDR support and ultra-thin bezels.',
        category: 'Electronics',
        price: 34999,
        stock: 12,
    },
    {
        name: 'ProSound Wireless Earbuds',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
        description: 'True wireless earbuds with active noise cancellation and 30-hour total battery.',
        category: 'Electronics',
        price: 8999,
        stock: 30,
    },
    {
        name: 'Swift Portable Charger 20000mAh',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80',
        description: '65W fast charging power bank with dual USB-C ports and LED battery indicator.',
        category: 'Electronics',
        price: 2999,
        stock: 50,
    },
    {
        name: 'Aero Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
        description: 'Lightweight gaming mouse with 16000 DPI optical sensor and 7 programmable buttons.',
        category: 'Electronics',
        price: 4499,
        stock: 25,
    },

    // ── Accessories ──────────────────────────────────────────
    {
        name: 'Prime Minimalist Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        description: 'A timeless design featuring a sustainable leather strap and sapphire glass.',
        category: 'Accessories',
        price: 8499,
        stock: 5,
    },
    {
        name: 'Canvas Everyday Backpack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        description: 'Durable 30L canvas backpack with padded laptop sleeve and water-resistant coating.',
        category: 'Accessories',
        price: 3499,
        stock: 40,
    },
    {
        name: 'Leather Bifold Wallet',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
        description: 'Slim genuine leather wallet with RFID blocking and 8 card slots.',
        category: 'Accessories',
        price: 1299,
        stock: 60,
    },
    {
        name: 'Polarized Aviator Sunglasses',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
        description: 'UV400 polarized lenses with lightweight metal frame for all-day comfort.',
        category: 'Accessories',
        price: 2199,
        stock: 35,
    },

    // ── Home Decor ────────────────────────────────────────────
    {
        name: 'Zen Desktop Lamp',
        image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80',
        description: 'Adjustable brightness and color temperature to reduce eye strain during long work hours.',
        category: 'Home Decor',
        price: 4999,
        stock: 20,
    },
    {
        name: 'Ceramic Planter Set',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
        description: 'Set of 3 minimalist ceramic planters in matte white, perfect for succulents and herbs.',
        category: 'Home Decor',
        price: 1799,
        stock: 45,
    },
    {
        name: 'Bamboo Desk Organizer',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
        description: 'Eco-friendly bamboo organizer with 6 compartments to keep your workspace clutter-free.',
        category: 'Home Decor',
        price: 1499,
        stock: 55,
    },
    {
        name: 'Abstract Wall Art Print',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
        description: 'Museum-quality giclée print on archival paper, ready to frame. 18×24 inches.',
        category: 'Home Decor',
        price: 2499,
        stock: 30,
    },

    // ── Gadgets ───────────────────────────────────────────────
    {
        name: 'Titanium Multi-Tool',
        image: 'https://images.unsplash.com/photo-1589131008225-99d55170ad6d?w=800&q=80',
        description: '12 essential tools in one compact, lightweight titanium body.',
        category: 'Gadgets',
        price: 3500,
        stock: 50,
    },
    {
        name: 'Smart Fitness Tracker Band',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=800&q=80',
        description: 'Tracks steps, heart rate, sleep and SpO2. Waterproof with 14-day battery life.',
        category: 'Gadgets',
        price: 5499,
        stock: 22,
    },
    {
        name: 'Foldable Drone Mini',
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
        description: 'Pocket-sized drone with 1080p stabilized camera, 20-min flight time and GPS return.',
        category: 'Gadgets',
        price: 18999,
        stock: 7,
    },
    {
        name: 'Wireless Charging Pad',
        image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80',
        description: '15W Qi-certified wireless charger compatible with iPhone and Android. Ultra-slim design.',
        category: 'Gadgets',
        price: 1599,
        stock: 70,
    },
    {
        name: 'Portable Bluetooth Speaker',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        description: '360° surround sound with 24-hour battery, IPX7 waterproof and built-in powerbank.',
        category: 'Gadgets',
        price: 6999,
        stock: 18,
    },

    // ── Books & Stationery ────────────────────────────────────
    {
        name: 'Hardcover Dot-Grid Journal',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80',
        description: 'A5 size, 200 pages of 100gsm acid-free dot-grid paper with lay-flat binding.',
        category: 'Stationery',
        price: 699,
        stock: 100,
    },
    {
        name: 'Architect Mechanical Pencil Set',
        image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80',
        description: 'Set of 3 precision mechanical pencils (0.3 / 0.5 / 0.7mm) with cushion-grip barrel.',
        category: 'Stationery',
        price: 799,
        stock: 80,
    },

    // ── Sports & Fitness ──────────────────────────────────────
    {
        name: 'Pro Yoga Mat',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
        description: '6mm thick non-slip TPE yoga mat with alignment lines and carry strap. Eco-friendly.',
        category: 'Sports',
        price: 2299,
        stock: 40,
    },
    {
        name: 'Adjustable Resistance Bands Set',
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a83?w=800&q=80',
        description: 'Set of 5 latex resistance bands (10–50 lbs) with handles, ankle straps and carry bag.',
        category: 'Sports',
        price: 1499,
        stock: 60,
    },
    {
        name: 'Stainless Steel Water Bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        description: 'Triple-wall insulated 750ml bottle keeps drinks cold 36h / hot 18h. BPA-free.',
        category: 'Sports',
        price: 999,
        stock: 90,
    },
];

const run = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products imported successfully!`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error}`);
        process.exit(1);
    }
};

run();
