import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';

import '../../Styles/register.css';
import axios from 'axios';

const RegisterForm = ({ email, setEmail, password, setPassword, password_confirmation, setPasswordConfirmation, setCsrfToken, setLoginStatus, user, setUser }) => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      console.error('Passwords do not match');
      return;
    }

    axios.post('register', {email, password, password_confirmation})
    .then((e) => {
      setCsrfToken(e.data)
      axios.defaults.headers.common['X-CSRF-TOKEN'] = e.data;
      document.head.querySelector('meta[name="csrf-token"]').content = e.data;
      console.log("Setting loginStatus to true from register.")
      setLoginStatus(true)
      navigate('/', { replace: true })
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export {RegisterForm};
