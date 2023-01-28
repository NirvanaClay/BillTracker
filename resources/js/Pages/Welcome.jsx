import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Switch, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import {App} from '../Components/App.jsx';
import {RegisterForm} from '../Components/RegisterForm.jsx';
import {LoginForm} from '../Components/LoginForm.jsx';
import { Link, Head } from '@inertiajs/inertia-react';
import {Navbar} from '../Components/Navbar.jsx';

import '../App.css'


// const root = ReactDOM.createRoot(document.getElementById("root"));

export default function Welcome ()  {
  const [loginStatus, setLoginStatus] = useState(false)
  const [user, setUser] = useState()
  const [user_id, setUser_id] = useState()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [csrfToken, setCsrfToken] = useState('')
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    axios.get('checkLogin')
    .then((e) => {
      if(e.data){
        console.log("There is a user.")
        setLoginStatus(true)
      }
      else{
        console.log("There is not a user.")
        setLoginStatus(false)
      }
    })
  }, [])

  useEffect(() => {
    // if(loginStatus){
      axios.get('getCsrf')
      .then((e) => {
        setCsrfToken(e.data)
        console.log("return of getCsrf in effect is:")
        console.log(e.data)
        axios.defaults.headers.common['X-CSRF-TOKEN'] = e.data;
      })
    // }
  }, [loginStatus])

  useEffect(() => {
    if(loginStatus){
      axios.get('user')
      .then((e) => {
        if(e.data){
          let $currentUser = e.data
          console.log("currentUser in user effect is:")
          console.log($currentUser)
          setUser($currentUser)
          setUser_id($currentUser.id)
        }
      })    }
  }, [loginStatus])

  useEffect(() => {
    if(loginStatus){
      axios.get('expenses')
      .then((e) => {
        let userExpenses = e.data
        setExpenses([...userExpenses])
      })
    }
  }, [loginStatus])

  useEffect(() => {
    console.log("Expenses in effect are:")
    console.log(expenses)
  }, [expenses])
  
  return(
    <>
      <Switch>
        {loginStatus ? '' : <Navbar />}
        <Routes>
          <Route exact path="/" element={<App loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} user_id={user_id} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/register" element={<RegisterForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation} setCsrfToken={setCsrfToken} />} />
          <Route path="/login" element={<LoginForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} />} />
        </Routes>
      </Switch>
    </>
)}
