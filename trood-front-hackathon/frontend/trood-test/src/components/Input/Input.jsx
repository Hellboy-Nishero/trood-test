import React from 'react'
import "./Input.scss";

const Input = ({label, type, register, name, rules, value}) => {
  return (
    <div className='input'>
        <label>{label}</label>
        <input type={type}  {...register(`${name}`, {...rules})} defaultValue={value}/>
    </div>
  )
}

export default Input