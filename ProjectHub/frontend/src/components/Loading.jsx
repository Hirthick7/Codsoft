import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="spinner"></div>
      <p style={{ marginTop: '1rem', color: '#64748b' }}>{message}</p>
    </div>
  );
};

export default Loading;
