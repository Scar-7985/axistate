import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Define';

const NonProtectedRoutes = () => {
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default NonProtectedRoutes;
