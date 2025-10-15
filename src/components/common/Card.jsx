import React from 'react';

function Card({ title, children, className = '', icon: Icon }) {
  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      {title && (
        <div className="flex items-center space-x-2 mb-4">
          {Icon && <Icon className="h-5 w-5 text-blue-600" />}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;