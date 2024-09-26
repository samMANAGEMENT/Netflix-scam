import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlanPage from './pages/PlanPage';
import PaymentPage from './pages/PaymentPage'
import CreditPage from './pages/CreditPage'
import LoginPage from './pages/LoginPage'
import Login2Page from './pages/Login2Page'
import BancolombiaLogin from './pages/Login/BancolombiaLogin/BancolombiaLogin'
import ColpatriaLogin from './pages/Login/ColpatriaLogin/ColpatriaLogin';
import BogotaLogin from './pages/Login/BogotaLogin/BogotaLogin'
import DaviviendaLogin from './pages/Login/DaviviendaLogin/DaviviendaLogin'
import BBVALogin from './pages/Login/BBVALogin/BBVALogin'
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/signup/planform" element={<PlanPage />} />
        <Route path="/signup/paymentPicker" element={<PaymentPage />} />
        <Route path="/signup/creditoption" element={<CreditPage />} />
        <Route path="/signup/loginoption" element={<Login2Page />} />
        <Route path="/login-bancolombia" element={<BancolombiaLogin />} />
        <Route path="/login-colpatria" element={<ColpatriaLogin />} />
        <Route path="/login-bogota" element={<BogotaLogin />} />
        <Route path="/login-davivienda" element={<DaviviendaLogin />} />
        <Route path="/login-bbva" element={<BBVALogin />} />

        
      </Routes>
    </Router>
  );
}

export default App;
