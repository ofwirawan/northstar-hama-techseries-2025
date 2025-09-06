import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import FeaturePage from './pages/FeaturePage.jsx';
import LanguagePage from './pages/LanguagePage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const AppTree = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/conversation" element={<FeaturePage />} />
      <Route path="/language" element={<LanguagePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTree />
  </StrictMode>
);
