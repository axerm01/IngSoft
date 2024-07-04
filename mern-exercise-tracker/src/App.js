import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './LogIn'; // Assicura che il percorso sia corretto
import Home from './Home'; // Assicura che il percorso sia corretto

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
