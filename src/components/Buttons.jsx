import React from 'react'

const Buttons = ({ onClickHandler, buttonText }) => {
 return (
    <button className='btn' onClick={onClickHandler}>{buttonText}</button>
  )
} 

export default Buttons