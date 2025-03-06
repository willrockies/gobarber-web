import React from 'react';

import { Routes as RouterDomRoutes, Route } from 'react-router-dom';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../Dashboard';
import PrivateRoute from './PrivateRoute';

const Rotas: React.FC = () => (
    <RouterDomRoutes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute  isPrivate component={ Dashboard } />} 
    />
    </RouterDomRoutes>
)

export default Rotas;