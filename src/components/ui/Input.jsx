import React from 'react';

export const Input = ({ className, ...props }) => (
  <input
    className={`w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);