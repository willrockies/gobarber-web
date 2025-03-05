import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

const Rotas: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
)

export default Rotas;