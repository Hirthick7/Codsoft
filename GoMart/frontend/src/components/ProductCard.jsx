import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    // Use smaller thumbnail (w=400) for cards — full res only on detail page
    const thumbUrl = product.image.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=65');

    return (
        <div
            className="glass"
            style={{
                padding: '1rem',
                borderRadius: '16px',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                willChange: 'transform',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            <Link to={`/product/${product._id}`}>
                {/* Skeleton placeholder shown until image loads */}
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', background: '#1e2130' }}>
                    {!imgLoaded && (
                        <div className="shimmer" style={{ position: 'absolute', inset: 0 }} />
                    )}
                    <img
                        src={thumbUrl}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImgLoaded(true)}
                        style={{
                            width: '100%',
                            height: '220px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            opacity: imgLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                </div>
            </Link>

            <div style={{ marginTop: '1rem' }}>
                <Link to={`/product/${product._id}`}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', lineHeight: 1.3 }}>
                        {product.name}
                    </h3>
                </Link>
                <p className="text-muted" style={{ fontSize: '0.875rem', height: '38px', overflow: 'hidden', lineHeight: 1.4 }}>
                    {product.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</span>
                    <Link to={`/product/${product._id}`} className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
