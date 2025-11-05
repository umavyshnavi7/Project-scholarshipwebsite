import React, { memo } from 'react';
import './AnimatedCard.css';

const AnimatedCard = memo(({ children, delay = 0, className = '' }) => {
  return (
    <div 
      className={`animated-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});

export default AnimatedCard;