import React from 'react';

const Button = ({ onClick, children }) => (
  <button onClick={onClick} style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#ffffff', border: 'none', borderRadius: '5px' }}>
    {children}
  </button>
);

export default Button;
