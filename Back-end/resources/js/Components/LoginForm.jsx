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
      return axios.get('getCsrf')
    })
    .then((e) => {
      console.log("About to set loginStatus to true.")
      setLoginStatus(true)
      setCsrfToken(e.data)
      navigate('/', { replace: true });
    })
  }

  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={handleLogin} autocomplete='off'>
        <div className='login-field'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' onChange={e => setEmail(e.target.value)} placeholder='Enter your email' autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false"
          />
        </div>
        <div className='login-field'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' onChange={e => setPassword(e.target.value)} placeholder='Enter your password' autocapitalize="off" autocomplete="off" autocorrect="off" autofocus="" role="combobox" spellcheck="false"/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export {LoginForm};
