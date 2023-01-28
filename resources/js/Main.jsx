import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import Routing from './Routing';
import './App.css';
import Item from './Components/Item'
import Layout from './Layout'

function Main() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [formError, setFormError] = useState(null);

  const addItem = (e) => {
    e.preventDefault()
    if (!newItemText || !newItemPrice) {
      setFormError("Both text and price fields are required.");
      return;
    }
    const price = Number(newItemPrice)
    if (isNaN(price) || price < 0) {
      setFormError("Price should only contain numbers.");
      return;
    }
    setItems([
      ...items,
      { text: newItemText, price: newItemPrice },
    ]);
    setNewItemText("");
    setNewItemPrice("");
    setFormError(null);
  }

  const deleteItem = (index) => {
    setItems(items.filter((item, i) => i !== index))
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const match = value.match(/^\d+(\.\d{0,2})?$/);
    if (match) {
      setNewItemPrice(value);
      setFormError(null);
    }
  }

  return (
    <div className='list'>
      <h1>Expense Tracker</h1>
      <ul className='items-container'>
        {items.map((item, index) => (
          <Item key={index} text={item.text} imgUrl={item.imgUrl} price={item.price} onDelete={() => deleteItem(index)} />
        ))}
      </ul>
      <form onSubmit={addItem}>
        <div className='form-container'>
          <input
            className='item-text'
            value={newItemText}
            type='text'
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Expense"
          />
          <div className='price-container'>
          <input
            value={newItemPrice}
            type='number'
            step="0.01" 
            min="0" max="10000" 
            onChange={handlePriceChange}
            // onChange={(e) => handlePriceChange(e.target.value)}
            // onSubmit={handlePriceChange}
            placeholder="Amount"
          />
          </div>
        </div>
        {formError && <div className='error-message'>{formError}</div>}
        <input type="submit" value="Add Item" className='submit-btn' />
      </form>
    </div>
    )};

export default Main;
