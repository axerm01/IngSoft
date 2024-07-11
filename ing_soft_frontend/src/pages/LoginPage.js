import React from 'react';
import Login from '../auth/Login';

const LoginPage = ({ onLogin }) => {
    return (
        <div>
            <Login onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;
