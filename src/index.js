// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema da sua escolha
import 'primereact/resources/primereact.min.css';         // Estilos principais do PrimeReact
import 'primeicons/primeicons.css';                       // Ícones



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
