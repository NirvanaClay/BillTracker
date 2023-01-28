import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate, Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import axios from 'axios';
import '../../Styles/navbar.css';
import '../../Styles/login.css';
import '../../Styles/register.css';
import {Item} from '../Components/Item'

function App({ users, email, setEmail, password, setPassword, setCsrfToken, user, user_id, setUser, loginStatus, setLoginStatus, expenses, setExpenses }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState(null);

  const [totalExpenses, setTotalExpenses] = useState(0)

  const nameInputRef = useRef(null);

  // const formatPrice = (price) => {
  //   let numPrice = Number(price)
  //   let stringPrice = numPrice.toFixed(2)
  //   setAmount(stringPrice)
  // }

  const addItem = (e) => {
    e.preventDefault()
    console.log("In addItem, user_id is:")
    console.log(user_id)
    if (!name || !amount) {
      setFormError("Both text and amount fields are required.");
      return;
    }
    if (isNaN(amount) || amount < 0) {
      setFormError("amount should only contain numbers.");
      return;
    }
    if(loginStatus){
      axios.post('/addExpense', {name, amount, user_id})
    }
    let numPrice = Number(amount)
    let stringPrice = numPrice.toFixed(2)
    setAmount(stringPrice)
    setExpenses([
      ...expenses,
      { name, amount: stringPrice },
    ]);
    setName("");
    setAmount("");
    setFormError(null);
    nameInputRef.current.focus();
  }

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
    axios.delete(`expenses/${id}`)
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const match = value.match(/^\d+(\.\d{0,2})?$/);
    if (match) {
      setAmount(value);
      setFormError(null);
    }
  }

  const navigate = useNavigate()

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
      setExpenses([])
      navigate('/', { replace: true });
    })
  }

  useEffect(() => {
    let total=0
    if(expenses){
      for(let expense of expenses){
        total += Number(expense.amount)
      }
    }
    total = total.toFixed(2)
    setTotalExpenses(total)
  }, [expenses])

  return (
    <div className='list'>
      {loginStatus ? <h1>My Expenses</h1> : <h1>Expense Tracker</h1>}
      <p className='app-description'>
        Gain clarity by keeping track of your monthly expenses.  
      </p>
      {!loginStatus && 
      <p className='guest-message'><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to save your expenses.</p>}
      <ul className={`items-container ${expenses.length < 1 && 'no-expenses'}`}>
        {expenses.map((expense, index) => (
          <Item key={index} id={expense.id} text={expense.name} amount={expense.amount} deleteItem={() => handleDelete(expense.id)} />
        ))}
        {expenses.length > 0 && <p className='total-expenses'>Total Expenses: {totalExpenses}</p>}
      </ul>
      <div className='form-container'>
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
            className='item-amount'
            type='number'
            name='amount'
            step="0.01" 
            min="0" max="10000" 
            onChange={(e) => 
              setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        {formError && <div className='error-message'>{formError}</div>}
      </div>
      <button className='submit-btn' onClick={addItem}>Add Item</button>
      {loginStatus && <form onSubmit={handleLogout}>
        <button type='submit' className='logout-btn'>Logout</button>
      </form>}
    </div>
    )};


    export {App}
// export default App;
