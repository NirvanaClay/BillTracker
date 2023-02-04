import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Item({ id, text, imgUrl, amount, loginStatus, userExpenses, setUserExpenses, guestExpenses, setGuestExpenses, handleDelete }) {

  useEffect(() => {
    console.log("id, text, and amount in Item effect is:")
    console.log(id)
    console.log(text)
    console.log(amount)
  }, [userExpenses])

  return (
    <li className='item-container'>
      <p className='item-text'>{text}</p>
      <p className='item-price'>{amount}</p>
      <i className="fas fa-xmark delete-icon" onClick={() => handleDelete({id})}></i>
      {/* <i className="fas fa-xmark delete-icon" onClick={() => console.log("Id in deleted item component is:" + id)}></i> */}
    </li>
  )
}

export {Item}
