import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';

// import '../../Styles/register.css';
import axios from 'axios';

const RegisterForm = ({ email, setEmail, password, setPassword, password_confirmation, setPasswordConfirmation, setCsrfToken, setLoginStatus, user, setUser }) => {

  const navigate = useNavigate()

  const [registerErrors, setRegisterErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password !== password_confirmation) {
    //   setRegisterError('Passwords do not match');
    //   return;
    // }

    axios.post('register', {email, password, password_confirmation})
    .then((e) => {
      setCsrfToken(e.data)
      axios.defaults.headers.common['X-CSRF-TOKEN'] = e.data;
      document.head.querySelector('meta[name="csrf-token"]').content = e.data;
      console.log("Setting loginStatus to true from register.")
      setLoginStatus(true)
      navigate('/', { replace: true })
    })
    .catch((e) => {
      // setErrorMessages(Object.values(data.errors).flat());
      setRegisterErrors(Object.values(e.response.data.errors).flat());
      // if (e.response.status === 422) {
      //   setRegisterError(e.response.data.errors.email[0]);
      // } else {
      //   setRegisterError("An error occurred during registration");
      // }
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
              <li key={index} className='register-error'>{message}</li>
            ))}
          </ul>
        )}
        {/* // {registerError && <p className='register-error'>*{registerError}</p>} */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export {RegisterForm};
