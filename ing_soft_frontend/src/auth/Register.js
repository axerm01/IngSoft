import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/register`, { username, password });
            setMessage('User registered successfully');
        } catch (error) {
            setError('Error registering user');
        }
    };

    return (
        <div className="register-container">
            <div className="title">REGISTRATI AD AGAFABULA</div>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <Link to="/login" className="login-link">
                <button className="go-to-login-button">Vai al Login</button>
            </Link>
            </form>
           
        </div>
    );
};

export default Register;
