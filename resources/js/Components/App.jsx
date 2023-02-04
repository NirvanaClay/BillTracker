import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate, Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import axios from 'axios';
import '../../Styles/navbar.css';
import '../../Styles/login.css';
import '../../Styles/register.css';
import {Item} from '../Components/Item'

function App({ users, email, setEmail, password, setPassword, setCsrfToken, user, user_id, setUser, loginStatus, setLoginStatus, guestExpenses, setGuestExpenses, userExpenses, setUserExpenses, handleDelete, guestExpenseId, setGuestExpenseId, hasExpenses, setHasExpenses }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState(null);

  const [totalExpenses, setTotalExpenses] = useState(0)
  const nameInputRef = useRef(null);

  const navigate = useNavigate()

  const addItem = (e) => {
    e.preventDefault()
    if (!name || !amount) {
      setFormError("Both text and amount fields are required.");
      return;
    }
    if (isNaN(amount) || amount < 0) {
      setFormError("amount should only contain numbers.");
      return;
    }
    let numPrice = Number(amount)
    let stringPrice = numPrice.toFixed(2)
    setAmount(stringPrice)
    if(loginStatus){
      console.log("loginStatus, so about to post to addExpense")
      axios.post('/addExpense', {name, amount, user_id})
      .then((e => {
        let expense = e.data
        setUserExpenses([
          ...userExpenses,
          { name, amount: stringPrice, id: expense.id },
        ]);
      }))
    }
    else{
      console.log("Running else statement in handleDelete, where guestExpenseId is:")
      console.log(guestExpenseId)
      setGuestExpenses([
        ...guestExpenses,
        { name, amount: stringPrice, id: guestExpenseId },
      ]);
      setGuestExpenseId((guestExpenseId + 1))
    }
    setHasExpenses(true)
    setName("");
    setAmount("");
    setFormError(null);
    nameInputRef.current.focus();
  }

  useEffect(() => {
    console.log("Guest expenses are:")
    console.log(guestExpenses)
  }, [guestExpenses])

  const handleLogout = async (e) => {
    e.preventDefault()
    axios.post('logout')
    .then(() => {
      return axios.get('csrf-token')
    })
    .then((e) => {
      console.log("About to set loginStatus to false.")
      setLoginStatus(false)
      setCsrfToken(e.data)
      setUserExpenses([])
      setGuestExpenses([])
      navigate('/', { replace: true });
    })
  }

  useEffect(() => {
    let total=0
    if(userExpenses){
      for(let expense of userExpenses){
        total += Number(expense.amount)
      }
    }
    else if(guestExpenses){
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
            <Item key={index} id={userExpense.id} text={userExpense.name} amount={userExpense.amount} loginStatus={loginStatus} userExpenses={userExpenses} setUserExpenses={setUserExpenses} handleDelete={handleDelete} />
          ))
        ) : (
          guestExpenses.map((guestExpense, index) => (
            <Item key={index} id={guestExpense.id} text={guestExpense.name} amount={guestExpense.amount} loginStatus={loginStatus} guestExpenses={guestExpenses} setGuestExpenses={setGuestExpenses} handleDelete={handleDelete} />
          ))
        )
      ) : null}

        {(userExpenses.length > 0 || guestExpenses.length > 0) && <p className='total-expenses'>Total Expenses: {totalExpenses}</p>}
      </ul>
      <div className='form-container'>
        <form className='addExpense-form' onSubmit={addItem}>
          <input
            ref={nameInputRef}
            className='item-text'
            value={name}
            name='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            placeholder="Expense"
          />
          <div className='amount-container'>
            <input
              value={amount}
              className='item-price'
              type='number'
              name='amount'
              step="0.01" 
              min="0" max="10000" 
              onChange={(e) => 
                setAmount(e.target.value)}
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
// export default App;
