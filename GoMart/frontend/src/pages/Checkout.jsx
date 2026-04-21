import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
        if (cartItems.length === 0) navigate('/');
    }, [user, cartItems, navigate]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        setLoading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // 1. Create Order on Backend
            const { data } = await axios.post(
                'http://localhost:5000/api/orders',
                { items: cartItems, totalAmount: cartTotal },
                config
            );

            const { order, razorpayOrder } = data;

            // 2. Open Razorpay Checkout
            const options = {
                key: 'rzp_test_SeZHmHjOIMlBmQ', // Razorpay Test Key
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'GoMart',
                description: 'Payment for your order',
                order_id: razorpayOrder.id,
                handler: async (response) => {
                    try {
                        // 3. Verify Payment on Backend
                        const verifyRes = await axios.post(
                            'http://localhost:5000/api/orders/verify',
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: order._id
                            },
                            config
                        );
                        
                        alert('Payment Successful!');
                        clearCart();
                        navigate('/orders');
                    } catch (err) {
                        console.error(err);
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: '#2563eb',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert('Error creating order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto' }}>
            <div className="glass" style={{ padding: '3rem', borderRadius: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Order Confirmation</h2>
                
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Shipping Details</h3>
                    <p className="text-muted">{user?.name}</p>
                    <p className="text-muted">{user?.email}</p>
                </div>

                <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Items Total</span>
                        <span>₹{cartTotal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Shipping</span>
                        <span style={{ color: '#10b981' }}>FREE</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontWeight: 700, fontSize: '1.2rem' }}>
                        <span>Total to Pay</span>
                        <span>₹{cartTotal}</span>
                    </div>
                </div>

                <button 
                    onClick={handlePayment} 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Pay with Razorpay'}
                </button>
                
                <p className="text-muted text-center mt-4" style={{ fontSize: '0.8rem' }}>
                    Secured by Razorpay. All transactions are encrypted.
                </p>
            </div>
        </div>
    );
};

export default Checkout;
