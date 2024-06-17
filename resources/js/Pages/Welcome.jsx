import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Switch, Route, Routes } from 'react-router-dom';
import axios from '../axiosConfig';

import {App} from '../Components/App.jsx';
import {RegisterForm} from '../Components/RegisterForm.jsx';
import {LoginForm} from '../Components/LoginForm.jsx';
import {PasswordReset} from '../Components/PasswordReset.jsx';
import {Navbar} from '../Components/Navbar.jsx';

import '../App.css'
import '../../Styles/login.css';
import '../../Styles/register.css';
import '../../Styles/item.css';


export default function Welcome ()  {
  //State Variables
  const [loginStatus, setLoginStatus] = useState(false)
  const [user, setUser] = useState()
  const [user_id, setUser_id] = useState()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [userExpenses, setUserExpenses] = useState([])
  const [guestExpenses, setGuestExpenses] = useState([])
  const [newExpenseName, setNewExpenseName] = useState('')
  const [newExpenseAmount, setNewExpenseAmount] = useState('')

  const [guestExpenseId, setGuestExpenseId] = useState(1)

  const [totalExpenses, setTotalExpenses] = useState(0)
  const [hasExpenses, setHasExpenses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  //Effects
  useEffect(() => {
    axios.get('checkLogin').then((e) => {
      const isLoggedIn = e.data;
      setLoginStatus(isLoggedIn);
    });
  }, []);

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
  }
  
  return(
    <>
      <Switch>
        {loginStatus ? '' : <Navbar />}
        <Routes>
          <Route exact path="/" element={<App loginStatus={loginStatus} setLoginStatus={setLoginStatus} user_id={user_id} userExpenses={userExpenses} setUserExpenses={setUserExpenses} guestExpenses={guestExpenses} setGuestExpenses={setGuestExpenses} handleDelete={handleDelete} newExpenseName={newExpenseName} setNewExpenseName={setNewExpenseName} newExpenseAmount={newExpenseAmount} setNewExpenseAmount={setNewExpenseAmount} guestExpenseId={guestExpenseId} setGuestExpenseId={setGuestExpenseId} hasExpenses={hasExpenses} setHasExpenses={setHasExpenses} handleEdit={handleEdit} isEditing={isEditing} setIsEditing={setIsEditing} totalExpenses={totalExpenses} setTotalExpenses={setTotalExpenses} />} />

          <Route path="/register" element={<RegisterForm setLoginStatus={setLoginStatus} email={email} setEmail={setEmail} password={password} setPassword={setPassword} password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation} totalExpenses={totalExpenses} setTotalExpenses={setTotalExpenses} setUserExpenses={setUserExpenses} setGuestExpenses={setGuestExpenses} />} />

          <Route path="/login" element={<LoginForm setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setGuestExpenses={setGuestExpenses} />} />

          <Route path="/password-reset" element={<PasswordReset setLoginStatus={setLoginStatus} user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setGuestExpenses={setGuestExpenses} />} />
        </Routes>
      </Switch>
    </>
)}


