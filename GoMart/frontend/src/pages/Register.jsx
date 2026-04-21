import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
        } catch (err) {
            setError('Registration failed. Email might already be in use.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>Join GoMart</h2>
                <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>Experience the future of e-commerce.</p>

                {error && <div className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: '#f87171', marginBottom: '1.5rem', border: '1px solid #7f1d1d' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                        <input 
                            type="text" 
                            className="glass" 
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                        <input 
                            type="email" 
                            className="glass" 
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Password</label>
                        <input 
                            type="password" 
                            className="glass" 
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', color: 'white' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                        Create Account
                    </button>
                </form>

                <p className="text-muted" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
