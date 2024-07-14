// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Scene from './pages/Scene';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import Items from './pages/Item';
import CreazioneStoria from './pages/CreateStory';

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
          <Route path="/createScene/:storyTitle" element={<PrivateRoute><Scene /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/item" element={<PrivateRoute><Items /></PrivateRoute>} />
          <Route path="/createStory" element={<PrivateRoute><CreazioneStoria /></PrivateRoute>} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
