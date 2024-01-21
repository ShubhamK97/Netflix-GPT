import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store=>store.movies);
  return (
   movies.nowPlayingMovies &&
    <div className='bg-black'>
      <div className='-mt-52 pl-12 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      {/* <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/> */}
      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
      </div>
      {/* 
        MovieList - Popular
        MovieCard*n
        MovieList - Now Playing
        MovieList - Trending
        MovieList - Horror


        */
        
      }
    </div>
  )
}

export default SecondaryContainer