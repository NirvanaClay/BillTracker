import { useState } from 'react';
import '../../Styles/login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';

import {App} from '../Components/App'


const LoginForm = ({ email, setEmail, password, setPassword, setCsrfToken, setLoginStatus, user, setUser }) => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    axios.post('login', {email, password})
    .then((e) => {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = e.data;
      document.head.querySelector('meta[name="csrf-token"]').content = e.data;
      console.log("e.data which is being set in the head after login request is:")
      console.log(e.data)
      setLoginStatus(true)
      setCsrfToken(e.data)
      navigate('/', { replace: true })
    })
  }

  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={handleLogin}>
        <div className='login-field'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' onChange={e => setEmail(e.target.value)} placeholder='Enter your email' required />
        </div>
        <div className='login-field'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' onChange={e => setPassword(e.target.value)} placeholder='Enter your password' required />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export {LoginForm};
