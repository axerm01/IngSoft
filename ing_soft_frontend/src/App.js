import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Assicura che il percorso sia corretto
import Scene from './pages/Scene';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from './context/AuthContext';

/*const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stories" element={<StoriesPage /> } />
        <Route path="/Home" element={<Home />} />
        <Route path="/Scene" element={<Scene />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/createStory" element={<div>Create Story Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
