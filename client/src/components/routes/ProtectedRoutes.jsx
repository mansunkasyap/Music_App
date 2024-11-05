import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// The ProtectedRoutes component
const ProtectedRoutes = ({ element: Element, ...rest }) => {
  // Example of an authentication check (replace with your actual logic)
  const isAuthenticated = localStorage.getItem('token'); // You can use any state or context to manage authentication
  console.log("Protected routes ", {...rest});
  // console.log(elementx);
  
  return (
   
      // {...rest} // Spread remaining props like 'path'
       isAuthenticated ? <Element /> : <Navigate to="/login" /> // Conditional rendering based on auth
    
  );
};

export default ProtectedRoutes;
