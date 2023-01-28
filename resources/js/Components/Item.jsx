import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Item({ id, text, imgUrl, amount, deleteItem }) {
  return (
    <li className='item-container'>
      <p className='item-text'>{text}</p>
      <p className='item-price'>{amount}</p>
      <i className="fas fa-xmark delete-icon" onClick={deleteItem}></i>
    </li>
  )
}

export {Item}
