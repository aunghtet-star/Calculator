
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  const sizeClass = 'h-20 w-20';
  const isZero = label === '0';

  return (
    <button
      onClick={() => onClick(label)}
      className={`flex items-center justify-center rounded-full text-3xl sm:text-4xl font-medium focus:outline-none transition-colors duration-150 ${!isZero ? sizeClass : ''} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
