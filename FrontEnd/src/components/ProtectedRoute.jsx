import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided and user role is not in the list, redirect to their respective dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/dashboard/${role}`} replace />;
  }

  // If logged in and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
