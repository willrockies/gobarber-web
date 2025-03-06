import React from 'react';
import { useAuth } from '../hooks/auth';
import {

    Navigate,
    useLocation
} from 'react-router-dom';
import { } from 'react-router-dom';

type PrivateRouteProps = {
  
    component: React.ComponentType;
    isPrivate?: boolean;
  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isPrivate = false  }: PrivateRouteProps) => {
    const { user } = useAuth();
    const location = useLocation();
    if (isPrivate && !user) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (!isPrivate && user) {
        return <Navigate to="/dashboard" state={{ from: location }} />;
    }

    return <Component />;
}

export default PrivateRoute;