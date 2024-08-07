import React from 'react'
import "./style.css"

const Header = () => {
  function logoutFunc() {
    alert("Logout!")
  }

  return (
    <div className='navbar'>
      <p className='logo'>WalletWise.</p>
      <p className='link' onClick={logoutFunc}>Logout</p>
    </div>
  )
}

export default Header