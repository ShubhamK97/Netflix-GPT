import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GPTSearch';
//import addPopularMovies from '../utils/moviesSlice';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

  const showGPTSearch = useSelector((store)=>store.GPT.showGPTSearch)

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header/>
      { showGPTSearch ? (
          <GPTSearch/>
        ):(
          <>
          <MainContainer/>
          <SecondaryContainer/>
          </>
        )}
      {/* 
        MainContainer
          - VideoBackGround
          - Video title
          - SecondaryContainer
          - MovieList * n
             - cards * n
      */}
    </div>
  )
}

export default Browse