import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
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