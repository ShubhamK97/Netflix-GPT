import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValiData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {BACKGROUND_IMG, USER_AVATAR} from "../utils/constants"
const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      updateProfile(user, {
        displayName: name.current.value, photoURL:USER_AVATAR
      }).then(() => {
        // Profile updated!
        const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        //navigate("/browse");
      }).catch((error) => {
        // An error occurred
        setErrorMessage(error.message)
      });
      
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
      //navigate("/browse");
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
        <img src={BACKGROUND_IMG}
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