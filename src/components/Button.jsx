import React from 'react'

const Button = ({
    
    children,
    type = "button",
    bgColor = 'bg-blyue-600',
    textColor = 'white',
    className = '',
    ...props

}) => {
  return (
   
    <button className= {`px-4 py-2 ${className} ${textColor} ${bgColor} ${type}`} {...props}>{children}</button>
  )
}

export default Button