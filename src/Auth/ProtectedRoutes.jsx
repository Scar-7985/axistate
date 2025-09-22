import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from './Define';

const ProtectedRoutes = () => {

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
