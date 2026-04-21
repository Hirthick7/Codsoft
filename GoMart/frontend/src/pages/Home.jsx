import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displaySearchTerm, setDisplaySearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState(100000);

    // Debounce search term to improve responsiveness
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(displaySearchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [displaySearchTerm]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = React.useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'All' || product.category === category;
            const matchesPrice = product.price <= maxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [products, searchTerm, category, maxPrice]);

    const categories = React.useMemo(() => {
        return ['All', ...new Set(products.map(p => p.category))];
    }, [products]);

    if (loading) return <div className="text-center mt-4">Loading products...</div>;

    return (
        <div>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Elevate Your <span style={{ color: 'var(--primary)' }}>Lifestyle.</span></h1>
                <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Discover our curated collection of premium gadgets and minimalist accessories designed for the modern professional.
                </p>
            </header>

            <section className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '3rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={displaySearchTerm}
                        onChange={(e) => setDisplaySearchTerm(e.target.value)}
                        className="glass"
                        style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                    />
                </div>
                <div>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="glass"
                        style={{ padding: '0.8rem 1.2rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="text-muted">Price: Up to ₹{maxPrice}</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100000" 
                        step="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </section>

            <div className="grid grid-cols-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="text-center" style={{ gridColumn: '1 / -1', padding: '4rem' }}>
                        <p className="text-muted">No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
