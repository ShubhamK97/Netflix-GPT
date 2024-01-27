import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";
//img src = "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"

const Header = () => {
  
  const user = useSelector((store)=>store.user);
  const showGPTSearch = useSelector((store)=>store.GPT.showGPTSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut=()=>{
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      //navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //Sign Up & Sign in 
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmount
    return ()=> unsubscribe();
  },[])

  const handleGPTSearchClick = () =>{
    //Toggle GPT Search
    dispatch(toggleGPTSearchView());
  }
  const handleLanguageChange=(e)=>{
      //console.log(e.target.value);
      dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img className="w-44" 
            src={LOGO}
            alt="logo"/>
      {user && <div className="flex p-2">
      
      { showGPTSearch && 
      <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang)=><option key={lang.identifier} value={lang.identifier}>
            {lang.name}
            </option>
          )} 
        </select>}

        <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" 
        onClick={handleGPTSearchClick}>
          {showGPTSearch ? "Home Page" : "GPT Search"}
        </button>
        <img className="w-12 h-12"
          src={USER_AVATAR}
          alt="usericon"/>
          <button onClick={handleSignOut} className="font-bold text-white">(Sign out)</button>
        </div> 
      }     
    </div>
  )
}

export default Header