import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders/user', config);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user) fetchOrders();
    }, [user]);

    if (loading) return <div className="text-center mt-4">Loading orders...</div>;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Your Orders</h1>

            {orders.length === 0 ? (
                <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: '24px' }}>
                    <p className="text-muted" style={{ fontSize: '1.2rem' }}>You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {orders.map((order) => (
                        <div key={order._id} className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Order ID</p>
                                    <p style={{ fontWeight: 600 }}>{order._id}</p>
                                </div>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Date</p>
                                    <p style={{ fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</p>
                                    <span style={{ 
                                        padding: '0.25rem 0.75rem', 
                                        borderRadius: '20px', 
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        background: order.status === 'Paid' ? '#065f46' : '#92400e',
                                        color: order.status === 'Paid' ? '#a7f3d0' : '#fef3c7'
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Total</p>
                                    <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{order.totalAmount}</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
                                {order.items.map((item, index) => (
                                    <div key={index} style={{ textAlign: 'center', minWidth: '80px' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '80px' }}>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
