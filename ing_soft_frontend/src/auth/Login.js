import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../style/Home.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  //const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password },  { withCredentials: true });
      //const { token } = response.data;
      //login(token);
      navigate('/home'); // Reindirizza alla home page
    } catch (error) {
      setError('Invalid credentials on login.js');
    }
  };

  return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
  );
};

export default Login;
