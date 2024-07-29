import React from 'react';
import { useAuth } from '../context/AuthContext'; // Correct the hook import
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Correct the hook usage

  if (!user) {
    return <Navigate to='/login' />; // Redirect to login page if not authenticated
  }

  return children;
}

export default ProtectedRoute;
