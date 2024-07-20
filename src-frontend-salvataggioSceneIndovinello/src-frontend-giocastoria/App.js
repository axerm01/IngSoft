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
import CreateStory from './pages/CreateStory';
import FirstScene from './pages/FirstScene';
import RiddleScene from './pages/RiddleScene';
import ChoiceScene from './pages/ChoiceScene';
import EditScene from './pages/EditScene';
import Game from './pages/Game';


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
          <Route path="/createScene" element={<PrivateRoute><Scene /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/item" element={<PrivateRoute><Items /></PrivateRoute>} />
          <Route path="/createStory" element={<PrivateRoute><CreateStory /></PrivateRoute>} />
          <Route path="/firstScene" element={<FirstScene />} />
          <Route path="/riddle" element={<RiddleScene />} />
          <Route path="/choice" element={<ChoiceScene />} />
          <Route path="/editScene" element={<EditScene />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
