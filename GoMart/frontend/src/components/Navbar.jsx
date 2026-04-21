import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
                    Go<span style={{ color: 'var(--primary)' }}>Mart</span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" className="text-muted" style={{ fontWeight: 500 }}>Home</Link>
                    <Link to="/cart" className="text-muted" style={{ fontWeight: 500, position: 'relative' }}>
                        Cart
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-12px',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.7rem'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <>
                            <Link to="/orders" className="text-muted" style={{ fontWeight: 500 }}>Orders</Link>
                            <span className="text-muted">|</span>
                            <span style={{ fontWeight: 600 }}>{user.name}</span>
                            <button onClick={logout} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
