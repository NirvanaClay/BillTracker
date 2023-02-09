import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Item({ id, text, imgUrl, amount, loginStatus, userExpenses, setUserExpenses, guestExpenses, setGuestExpenses, handleDelete, handleEdit, handleAmountChange, handleSubmit, handleNameChange, nameInputRef, formatExpenseName, isEditing, setIsEditing }) {

  const [editName, setEditName] = useState(text)
  const [editAmount, setEditAmount] = useState(amount)

  const [isEditingItem, setIsEditingItem] = useState(false)

  useEffect(() => {
    console.log("editName is:")
    console.log(editName)
  }, [editName])

  // useEffect(() => {
  //   if(isEditing){
  //     console.log("In Item, isEditing is true.")
  //     setIsEditingItem(true)
  //   }
  //   else{
  //     console.log("In Item, isEditing is false.")
  //     setIsEditingItem(false)
  //   }
  // }, [isEditing])

  const handleNameEdit = (e) => {
    const expense = e;
    setEditName(formatExpenseName(expense));
  };

  const handleAmountEdit = (e) => {
    setEditAmount(e.target.value)
  }

  const handleItemEdit = (e) => {
    e.preventDefault()
    handleEdit({id, editName, editAmount})
    setIsEditingItem(false)
  }

  return (
    <li className='item-container'>
      {isEditingItem ?
      <div className='editForm-container'>
        <form onSubmit={(e) => handleItemEdit(e)} className='editExpense-form'>
          <input
            ref={nameInputRef}
            className='editExpense-text'
            value={editName}
            name='name'
            type='text'
            onChange={(e) => handleNameEdit(e.target.value)}
            placeholder="Expense"
          />
          <div className='editAmount-container'>
            <input
              value={editAmount}
              className='editExpense-price'
              type='number'
              name='amount'
              step="0.01" 
              min="0" max="10000" 
              onChange={handleAmountEdit}
              placeholder="Amount"
            />
          </div>
          <button className='editBtn-container'>
            <i className="fa-solid fa-check edit-btn"></i>
          </button>
        </form>
      </div>
      : <>
        <p className='item-text'>{text}</p>
        <p className='item-price'>${amount}</p>
        {/* <i className="fa-solid fa-pencil edit-icon" onClick={() => handleEdit({id})}></i> */}
        <i className="fa-solid fa-pencil edit-icon" onClick={() => setIsEditingItem(true)}></i>
        <i className="fas fa-xmark delete-icon" onClick={() => handleDelete({id})}></i>
      </>}
      {/* <i className="fas fa-xmark delete-icon" onClick={() => console.log("Id in deleted item component is:" + id)}></i> */}
    </li>
  )
}

export {Item}
