import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Switch, Route, Routes } from 'react-router-dom';
import axios from '../axiosConfig';

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
  const [newExpenseName, setNewExpenseName] = useState('')
  const [newExpenseAmount, setNewExpenseAmount] = useState('')

  const [guestExpenseId, setGuestExpenseId] = useState(1)

  const [hasExpenses, setHasExpenses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasEdited, setHasEdited] = useState(false)

  useEffect(() => {
    if(loginStatus){
      axios.get('expenses')
      .then((e) => {
        let expenseData = e.data
        setUserExpenses([...expenseData])
      })
    }
  }, [loginStatus])

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
    const updatedExpense = {name: editName, amount: editAmount, id}
    if(loginStatus){
      axios.put(`expenses/${id}`, {id, editName, editAmount})
      const newList = userExpenses.filter(expense => expense.id !== updatedExpense.id)
      setUserExpenses([...newList, updatedExpense]);
    }
    else{
      const newList = guestExpenses.filter(expense => expense.id !== updatedExpense.id)
      setGuestExpenses([...newList, updatedExpense]);
    }
    setNewExpenseName('')
    setNewExpenseAmount('')
    setIsEditing(false)
    setHasEdited(true)
  }

  useEffect(() => {
    if (loginStatus) {
      axios.get('user').then((e) => {
        if (e.data) {
          setUser(e.data);
          setUser_id(e.data.id);
        }
      });
      axios.get('expenses').then((e) => {
        setUserExpenses([...e.data]);
      });
    }
  }, [loginStatus]);
  

  useEffect(() => {
    if(userExpenses.length > 0){
      setHasExpenses(true)
    }
    else{
      setHasExpenses(false)
    }
  }, [userExpenses])

  useEffect(() => {
    const xsrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.common['XSRF-TOKEN'] = csrfToken;
  }, []);

  useEffect(() => {
    axios.get('checkLogin').then((e) => {
      const isLoggedIn = e.data;
      setLoginStatus(isLoggedIn);
    });
  }, []);
  
  return(
    <>
      <Switch>
        {loginStatus ? '' : <Navbar />}
        <Routes>
          <Route exact path="/" element={<App loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} user_id={user_id} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} userExpenses={userExpenses} setUserExpenses={setUserExpenses} guestExpenses={guestExpenses} setGuestExpenses={setGuestExpenses} handleDelete={handleDelete} newExpenseName={newExpenseName} setNewExpenseName={setNewExpenseName} newExpenseAmount={newExpenseAmount} setNewExpenseAmount={setNewExpenseAmount} guestExpenseId={guestExpenseId} setGuestExpenseId={setGuestExpenseId} hasExpenses={hasExpenses} setHasExpenses={setHasExpenses} handleEdit={handleEdit} isEditing={isEditing} setIsEditing={setIsEditing} />} />

          <Route path="/register" element={<RegisterForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation} setCsrfToken={setCsrfToken} />} />

          <Route path="/login" element={<LoginForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} setGuestExpenses={setGuestExpenses} />} />

          <Route path="/password-reset" element={<PasswordReset setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setCsrfToken={setCsrfToken} setGuestExpenses={setGuestExpenses} />} />
        </Routes>
      </Switch>
    </>
)}


