import React from 'react'
import Header from '../components/Header'
import SignupSigninComponent from '../components/SignupSignin'

const Signup = () => {
  return (
    <div className='background'>
      <Header/>
      <div className='wrapper'>
        <SignupSigninComponent/>
        </div> {/* For centering the form wrapper className is used & customized in App.css file */}
    </div>
  )
}

export default Signup