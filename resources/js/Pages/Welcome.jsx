import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Switch, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import {App} from '../Components/App.jsx';
import {RegisterForm} from '../Components/RegisterForm.jsx';
import {LoginForm} from '../Components/LoginForm.jsx';
import {PasswordReset} from '../Components/PasswordReset.jsx';
import { Link, Head } from '@inertiajs/inertia-react';
import {Navbar} from '../Components/Navbar.jsx';

import '../App.css'
import '../../Styles/login.css';
import '../../Styles/register.css';
import '../../Styles/item.css';


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

  const [guestExpenseId, setGuestExpenseId] = useState(1)

  const [hasExpenses, setHasExpenses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasEdited, setHasEdited] = useState(false)

  const handleDelete = ({ id }) => {
    if(loginStatus) {
      axios.delete(`expenses/${id}`)
      setUserExpenses(userExpenses.filter(userExpense => userExpense.id !== id))
      setIsEditing(true)
    }
    else{
      setGuestExpenses(guestExpenses.filter(guestExpense => guestExpense.id !== id))
    }
  }

  const handleEdit = ({id, editName, editAmount}) => {
    axios.put(`expenses/${id}`, {id, editName, editAmount})
    setIsEditing(false)
    setHasEdited(true)
  }

  useEffect(() => {
    if(loginStatus){
      axios.get('user')
      .then((e) => {
        if(e.data){
          let $currentUser = e.data
          setUser($currentUser)
          setUser_id($currentUser.id)
        }
      })    }
  }, [loginStatus])

  useEffect(() => {
    if(userExpenses.length > 0){
      setHasExpenses(true)
    }
    else{
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
  }, [loginStatus, hasEdited])

  useEffect(() => {
    axios.get('checkLogin')
    .then((e) => {
      if(e.data){
        setLoginStatus(true)
      }
      else{
      }
    })
  }, [])

  useEffect(() => {
    axios.get('getCsrf')
    .then((e) => {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = e.data;
    })
  }, [loginStatus])
  
  return(
    <>
      <Switch>
        {loginStatus ? '' : <Navbar />}
        <Routes>
          <Route exact path="/" element={<App loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} user_id={user_id} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} userExpenses={userExpenses} setUserExpenses={setUserExpenses} guestExpenses={guestExpenses} setGuestExpenses={setGuestExpenses} handleDelete={handleDelete} name={name} setName={setName} amount={amount} setAmount={setAmount} guestExpenseId={guestExpenseId} setGuestExpenseId={setGuestExpenseId} hasExpenses={hasExpenses} setHasExpenses={setHasExpenses} handleEdit={handleEdit} isEditing={isEditing} setIsEditing={setIsEditing} />} />

          <Route path="/register" element={<RegisterForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation} setCsrfToken={setCsrfToken} />} />

          <Route path="/login" element={<LoginForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} setGuestExpenses={setGuestExpenses} />} />

          <Route path="/password-reset" element={<PasswordReset setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} setGuestExpenses={setGuestExpenses} />} />
        </Routes>
      </Switch>
    </>
)}


