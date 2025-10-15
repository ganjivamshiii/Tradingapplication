import React from 'react';

function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  type = 'button',
  className = '' 
}) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;