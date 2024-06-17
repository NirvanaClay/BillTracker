import React, { useState } from 'react';
import '../Styles/button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function MyButton() {
  const [buttonText, setButtonText] = useState('Click me');

  return (
    <FontAwesomeIcon icon={faXmark} />
  );
}

export default MyButton
