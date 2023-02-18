import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate, Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import axios from 'axios';
import '../../Styles/navbar.css';
import '../../Styles/login.css';
import '../../Styles/register.css';
import {Item} from '../Components/Item'

function App({ users, email, setEmail, password, setPassword, setCsrfToken, user, user_id, setUser, loginStatus, setLoginStatus, guestExpenses, setGuestExpenses, userExpenses, setUserExpenses, handleDelete, guestExpenseId, setGuestExpenseId, hasExpenses, setHasExpenses, handleEdit, isEditing, setIsEditing, newExpenseName, setNewExpenseName, newExpenseAmount, setNewExpenseAmount }) {
  const nameInputRef = useRef(null);
  const [formError, setFormError] = useState(null);

  const [totalExpenses, setTotalExpenses] = useState(0)

  const navigate = useNavigate()

  const formatExpenseName = (expense) => {
    expense = expense.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return expense
  }

  const handleNameChange = (e) => {
    const expense = e;
    setNewExpenseName(formatExpenseName(expense))
  };

  const handleAmountChange = (e) => {
    setNewExpenseAmount(e.target.value)
  }

  const addItem = () => {
    console.log("In addItem, newExpenseName is:")
    console.log(newExpenseName)
    console.log("and newExpenseAmount is:")
    console.log(newExpenseAmount)
    if (!newExpenseName || !newExpenseAmount) {
      setFormError("Both text and amount fields are required.");
      return;
    }
    if (isNaN(newExpenseAmount) || newExpenseAmount < 0) {
      setFormError("amount should only contain numbers.");
      return;
    }
    let numPrice = Number(newExpenseAmount)
    let stringPrice = numPrice.toFixed(2)
    console.log("Which gives a numPrice of:")
    console.log(numPrice)
    console.log("And a stringPrice of:")
    console.log(stringPrice)
    setNewExpenseAmount(stringPrice)
    if(loginStatus){
      axios.post('/addExpense', {name: newExpenseName, amount: newExpenseAmount, user_id})
      .then((e => {
        let expense = e.data
        setUserExpenses([
          ...userExpenses,
          { name: newExpenseName, amount: stringPrice, id: expense.id },
        ]);
      }))
    }
    else{
      setGuestExpenses([
        ...guestExpenses,
        { name: newExpenseName, amount: stringPrice, id: guestExpenseId },
      ]);
      setGuestExpenseId((guestExpenseId + 1))
    }
    setHasExpenses(true)
    setNewExpenseName("");
    setNewExpenseAmount("");
    setFormError(null);
    console.log("nameInputRef.current is:")
    console.log(nameInputRef.current)
    nameInputRef.current.focus();
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    axios.post('logout')
    .then(() => {
      return axios.get('csrf-token')
    })
    .then((e) => {
      setLoginStatus(false)
      setCsrfToken(e.data)
      setUserExpenses([])
      setGuestExpenses([])
      navigate('/', { replace: true });
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpenseName !== "" && newExpenseAmount !== "") {
      addItem();
    }
  }

  useEffect(() => {
    let total=0
    if(userExpenses.length > 0){
      for(let expense of userExpenses){
        total += Number(expense.amount)
      }
    }
    else if(guestExpenses.length > 0){
      for(let expense of guestExpenses){
        total += Number(expense.amount)
      }
    }
    total = total.toFixed(2)
    setTotalExpenses(total)
  }, [userExpenses, guestExpenses])

  return (
    <div className='list'>
      {loginStatus ? <h1>My Expenses</h1> : <h1>Expense Tracker</h1>}
      <p className='app-description'>
        Gain clarity by keeping track of your monthly expenses.  
      </p>
      {!loginStatus && 
      <p className='guest-message'><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to save your expenses.</p>}
      <ul className={`items-container ${(userExpenses.length == 0 && guestExpenses.length == 0) && 'no-expenses'}`}>
      {hasExpenses ? (
        loginStatus ? (
          userExpenses.map((userExpense, index) => (
            <Item key={index} id={userExpense.id} text={userExpense.name} amount={userExpense.amount} loginStatus={loginStatus} userExpenses={userExpenses} setUserExpenses={setUserExpenses} handleDelete={handleDelete} handleEdit={handleEdit} handleSubmit={handleSubmit} handleAmountChange={handleAmountChange} handleNameChange={handleNameChange} nameInputRef={nameInputRef} formatExpenseName={formatExpenseName} isEditing={isEditing} setIsEditing={setIsEditing} />
          ))
        ) : (
          guestExpenses.map((guestExpense, index) => (
            <Item key={index} id={guestExpense.id} text={guestExpense.name} amount={guestExpense.amount} loginStatus={loginStatus} guestExpenses={guestExpenses} setGuestExpenses={setGuestExpenses} handleDelete={handleDelete} handleEdit={handleEdit}handleSubmit={handleSubmit} handleAmountChange={handleAmountChange} handleNameChange={handleNameChange} nameInputRef={nameInputRef} formatExpenseName={formatExpenseName} isEditing={isEditing} setIsEditing={setIsEditing} />
          ))
        )
      ) : null}

        {(userExpenses.length > 0 || guestExpenses.length > 0) && <p className='total-expenses'>Total Expenses: {totalExpenses}</p>}
      </ul>
      <div className='form-container'>
        <form className='addExpense-form' onSubmit={handleSubmit}>
          <input
            ref={nameInputRef}
            className='newExpense-text'
            value={newExpenseName}
            name='name'
            type='text'
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Expense"
          />
          <div className='amount-container'>
            <input
              value={newExpenseAmount}
              className='item-price'
              type='number'
              name='amount'
              step="0.01" 
              min="0" max="10000" 
              onChange={handleAmountChange}
              placeholder="Amount"
            />
          </div>
          <button className='submit-btn'>Add Item</button>
          {formError && <div className='error-message'>{formError}</div>}
        </form>
      </div>
      {loginStatus && <form className='deleteExpense-form' onSubmit={handleLogout}>
        <button type='submit' className='logout-btn'>Logout</button>
      </form>}
    </div>
    )};


    export {App}
