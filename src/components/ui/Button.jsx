import React from 'react';

export const Button = ({ variant = "default", size = "default", className, ...props }) => {
  const variantClasses = {
    default: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
  };

  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
  };

  return (
    <button
      className={`rounded-md text-white ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};