import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';

import axios from '../axiosConfig';

const RegisterForm = ({ email, setEmail, password, setPassword, password_confirmation, setPasswordConfirmation, setCsrfToken, setLoginStatus, user, setUser }) => {

  const navigate = useNavigate()

  const [registerErrors, setRegisterErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('register', {email, password, password_confirmation})
    .then((e) => {
      setCsrfToken(e.data)
      setLoginStatus(true)
      navigate('/', { replace: true })
    })
    .catch((e) => {
      setRegisterErrors(Object.values(e.response.data.errors).flat());
    })
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export {RegisterForm};
