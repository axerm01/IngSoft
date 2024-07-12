// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Scene from './pages/Scene';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import CreateStoryPage from './pages/CreateStory'; // Importa la nuova pagina

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stories" element={<PrivateRoute><StoriesPage /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/scene" element={<PrivateRoute><Scene /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/createStory" element={<CreateStoryPage />} /> {/* Aggiungi la nuova rotta */}
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
