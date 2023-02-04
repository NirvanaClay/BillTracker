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
  const [userExpenses, setUserExpenses] = useState([])
  const [guestExpenses, setGuestExpenses] = useState([])
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [guestExpenseId, setGuestExpenseId] = useState(0)

  const [hasExpenses, setHasExpenses] = useState(false)

  const handleDelete = ({ id }) => {
    console.log("In handleDelete, id is:")
    console.log(id)
    if(loginStatus) {
      console.log("Running if statement in handleDelete")
      axios.delete(`expenses/${id}`)
      setUserExpenses(userExpenses.filter(userExpense => userExpense.id !== id))
    }
    else{
      console.log("Running else statement in handleDelete")
      setGuestExpenses(guestExpenses.filter(guestExpense => guestExpense.id !== id))
    }
  }

  useEffect(() => {
    axios.get('getCsrf')
    .then((e) => {
      setCsrfToken(e.data)
      console.log("return of getCsrf in effect is:")
      console.log(e.data)
      axios.defaults.headers.common['X-CSRF-TOKEN'] = e.data;
    })
  }, [])

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
    console.log("In Welcome effect, userExpenses are:")
    console.log(userExpenses)
    if(userExpenses.length > 0){
      console.log("userExpenses.length > 0, so setting hasExpenses to true")
      setHasExpenses(true)
    }
    else{
      console.log("userExpenses.length == 0, so setting hasExpenses to false")
      setHasExpenses(false)
    }
  }, [userExpenses])

  useEffect(() => {
    if(loginStatus){
      axios.get('expenses')
      .then((e) => {
        let expenseData = e.data
        setUserExpenses([...expenseData])
      })
    }
  }, [loginStatus])
  
  return(
    <>
      <Switch>
        {loginStatus ? '' : <Navbar />}
        <Routes>
          <Route exact path="/" element={<App loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} user_id={user_id} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} userExpenses={userExpenses} setUserExpenses={setUserExpenses} guestExpenses={guestExpenses} setGuestExpenses={setGuestExpenses} handleDelete={handleDelete} name={name} setName={setName} amount={amount} setAmount={setAmount} guestExpenseId={guestExpenseId} setGuestExpenseId={setGuestExpenseId} hasExpenses={hasExpenses} setHasExpenses={setHasExpenses} />} />
          <Route path="/register" element={<RegisterForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation} setCsrfToken={setCsrfToken} />} />
          <Route path="/login" element={<LoginForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} />} />
        </Routes>
      </Switch>
    </>
)}


