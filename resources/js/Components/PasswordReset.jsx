import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';

import {App} from '../Components/App'


const PasswordReset = ({ email, setEmail, password, setPassword, setCsrfToken, setLoginStatus, user, setUser, setGuestExpenses }) => {

  const [loginError, setLoginError] = useState('')

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  return (
    <div className='passwordReset-container'>
      <form className="passwordReset-form" onSubmit={handleLogin}>
      <div className='register-field'>
          <label htmlFor='email'>
            Email:
          </label>
            <input 
              type="email" 
              name='email'
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
        </div>
        <div className='register-field'>
          <label htmlFor='password'>Password:</label>
            <input 
              type="password" 
              name='password'
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
        </div>
        <div className='register-field'>
          <label htmlFor='password_confirmation'>
            Confirm Password:
          </label>
            <input 
              type="password" 
              name='password_confirmation'
              value={password_confirmation} 
              onChange={e => setPasswordConfirmation(e.target.value)} 
              required 
            />
        </div>
        {registerErrors.length > 0 && (
          <ul>
            {registerErrors.map((message, index) => (
              <li key={index} className='register-error'>*{message}</li>
            ))}
          </ul>
        )}
        {/* // {registerError && <p className='register-error'>*{registerError}</p>} */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export {PasswordReset};