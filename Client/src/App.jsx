// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public pages
import Landing from './pages/Landing';
import Login from './auth/Login';
import Signup from './auth/Signup';
import About from './pages/About';
import Contact from './pages/Contact';

// Protected layout and pages
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import Alerts from './pages/Alerts';
import Insights from './pages/Insights';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected Routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/insights" element={<Insights />} />
      </Route>

      {/* Optional 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
