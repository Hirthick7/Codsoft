import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
                <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>Login to access your GoMart account.</p>

                {error && <div className="glass" style={{ padding: '0.8rem', borderRadius: '8px', color: '#f87171', marginBottom: '1.5rem', border: '1px solid #7f1d1d' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
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
                        Login
                    </button>
                </form>

                <p className="text-muted" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                    New to GoMart? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
