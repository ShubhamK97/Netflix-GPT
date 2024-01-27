import React, { useRef } from 'react'
//import { SUPPORTED_LANGUAGES } from '../utils/constants'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGPTMovies } from '../utils/GPTSlice';

const GPTSearchBar = () => {

  const langKey = useSelector((store)=>store.config.lang);
  const searchText = useRef(null);
 const dispatch= useDispatch();
  //Search movie in TMDB
  const searchMovieTMDB=async (movie)=>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+
    '&include_adult=false&language=en-US&page=1',
     API_OPTIONS)
     const json = await data.json();
     return json.results;
  }

  const handleGPTSearchClick = async()=>{
      console.log(searchText.current.value);
      //Make an API call to GPT API and get movie Results
      const gptQuery = "Act as a movie recommendation system and suggest some movies for the query:"+searchText.current.value+'.Only give me names of 5 movies,comma seperated like the example result given ahead.Example Result:Gadar,Sholay,Don,Phir Hera Pheri,Koi Mil Gaya';
        const GPTResults = await openai.chat.completions.create({
          messages: [{ role: 'user', content: gptQuery }],
          model: 'gpt-3.5-turbo',
        });
        if(!GPTResults.choices){
          //TODO: Write Error Handling
        }
      console.log(GPTResults.choices?.[0]?.message?.content);
      // Andaz Apna Apna,Kabhi Khushi Kabhie Gham,Munna Bhai MBBS,3 Idiots,Badhaai Ho
      const GPTMovies=GPTResults.choices?.[0]?.message?.content.split(",");
      //the above will return result in array 
      const promiseArray = GPTMovies.map(movie=>searchMovieTMDB(movie));
      //This will return the 5 promises=> [Promise,Promise,Promise,Promise,Promise]
      const tmdbResults=await Promise.all(promiseArray);//This will finished only when all the 5 promise are resolved.
      console.log(tmdbResults);
      dispatch(addGPTMovies({movieNames:GPTMovies,movieResults:tmdbResults}));
  }  

  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12'
        onSubmit={(e)=>e.preventDefault()}
        >
            <input 
            ref={searchText}
            type='text' 
            className='p-4 m-4 col-span-9' 
            placeholder={lang[langKey].GPTSearchPlaceholder}/>
            <button className='col-span-3 m-4 px-4 py-2 bg-red-700 text-white rounded-lg'
            onClick={handleGPTSearchClick}>
              {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GPTSearchBar