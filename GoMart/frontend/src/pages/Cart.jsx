import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=checkout');
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: '24px' }}>
                    <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your cart is empty.</p>
                    <Link to="/" className="btn btn-primary">Go Shopping</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
                    <div className="grid" style={{ gap: '1.5rem' }}>
                        {cartItems.map((item) => (
                            <div key={item.product} className="glass" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderRadius: '16px', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <Link to={`/product/${item.product}`} style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.name}</Link>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>₹{item.price}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="glass" style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '0.2rem' }}>
                                        <button className="btn" onClick={() => addToCart({_id: item.product}, -1)} disabled={item.qty <= 1}>-</button>
                                        <span style={{ padding: '0 0.5rem' }}>{item.qty}</span>
                                        <button className="btn" onClick={() => addToCart({_id: item.product}, 1)} disabled={item.qty >= item.stock}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.product)} style={{ color: '#f87171', background: 'transparent' }}>
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '24px', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Order Summary</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className="text-muted">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span style={{ fontWeight: 600 }}>₹{cartTotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 700, paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <button onClick={checkoutHandler} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
