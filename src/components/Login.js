import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValiData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  const handleButtonClick = ()=>{
    //Validate the form data
   // console.log(email.current.value);
    //console.log(password.current.value); name.current.value,
    const message = checkValiData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message) return;
    
    if(!isSignInForm){
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      // ...
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode +"-"+ errorMessage);
      // ..
      });

    }else{
      // Sign In Logic

      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode+"-"+errorMessage);
      });
    }
  }
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
        <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{ isSignInForm ? 'Sign In':"Sign Up"}</h1>

            { !isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-600'/>}
            <input ref={email} type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-600'/>
            <input ref={password} type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-600'/>
            <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-2 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{ isSignInForm ? 'Sign In':"Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            { isSignInForm ? 'New to Netflix? Sign Up Now':"Already registered? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login