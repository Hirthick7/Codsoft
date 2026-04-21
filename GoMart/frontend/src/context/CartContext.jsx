import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cartFromStorage = localStorage.getItem('cartItems');
        if (cartFromStorage) {
            setCartItems(JSON.parse(cartFromStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x.product === product._id);
            if (existItem) {
                return prevItems.map((x) =>
                    x.product === product._id ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                return [...prevItems, { 
                    product: product._id, 
                    name: product.name, 
                    image: product.image, 
                    price: product.price, 
                    stock: product.stock, 
                    qty 
                }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x.product !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
