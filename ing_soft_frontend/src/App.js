import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn'; // Assicura che il percorso sia corretto
import Home from './pages/Home'; // Assicura che il percorso sia corretto
import Scene from './pages/Scene'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Scene" element={<Scene />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
