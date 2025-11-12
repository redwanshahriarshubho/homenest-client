import React from 'react';

const LoadingSpinner = ({ size = 'large' }) => {
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    medium: 'h-12 w-12 border-3',
    large: 'h-16 w-16 border-4'
  };

  return (
    <div className="flex justify-center items-center h-64">
      <div className={`animate-spin rounded-full border-t-blue-600 border-b-blue-600 border-gray-200 ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;