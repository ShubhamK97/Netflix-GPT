import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState();
  const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
  }  
  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="logo"/>
        </div>
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{ isSignInForm ? 'Sign In':"Sign Up"}</h1>

            { !isSignInForm && <input type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-600'/>}
            <input type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-600'/>
            <input type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-600'/>
            <button className='p-2 my-4 bg-red-700 w-full rounded-lg'>{ isSignInForm ? 'Sign In':"Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            { isSignInForm ? 'New to Netflix? Sign Up Now':"Already registered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login