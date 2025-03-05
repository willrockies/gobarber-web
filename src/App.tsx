import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from "./styles/global";

import Rotas from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Rotas />
    </AppProvider>
    <GlobalStyle />
  </Router>

)


export default App;
