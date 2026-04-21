import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return <div className="text-center mt-4">Loading details...</div>;
    if (!product) return <div className="text-center mt-4 text-muted">Product not found.</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', marginTop: '2rem' }}>
            <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', height: 'fit-content' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', display: 'block' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="text-muted" style={{ fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                    {product.category}
                </span>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0 1.5rem' }}>{product.name}</h1>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                    {product.description}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 700 }}>₹{product.price}</span>
                    <span className={product.stock > 0 ? 'text-muted' : 'text-danger'} style={{ fontSize: '0.9rem' }}>
                        {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {product.stock > 0 && (
                        <>
                            <div className="glass" style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '0.2rem' }}>
                                <button className="btn" onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '0.5rem 1rem' }}>-</button>
                                <span style={{ padding: '0 1rem', fontWeight: 600 }}>{qty}</span>
                                <button className="btn" onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ padding: '0.5rem 1rem' }}>+</button>
                            </div>
                            <button className="btn btn-primary" onClick={handleAddToCart} style={{ flex: 1, padding: '1rem' }}>
                                Add to Cart
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
