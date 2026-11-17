import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PortfolioErrorBoundary } from './components/PortfolioErrorBoundary';
import './styles/main.css';
import './styles/museum.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortfolioErrorBoundary>
      <App />
    </PortfolioErrorBoundary>
  </React.StrictMode>
);
