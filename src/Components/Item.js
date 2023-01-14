import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Item({ text, imgUrl, price, onDelete }) {
  return (
    <li className='item-container'>
      <p className='item-text'>{text}</p>
      <p className='item-price'>{price}</p>
      <FontAwesomeIcon icon={faXmark} onClick={onDelete} className='delete-icon' />
    </li>
  )
}

export default Item
