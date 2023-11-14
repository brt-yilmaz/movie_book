import MovieDetailsContainer from './MovieDetailsContainer'
import MovieContainer from './MovieContainer'
import Hero from './Hero'
import Details from './Details'
import Description from './Description'

import { useParams } from 'react-router-dom'
import { useGetMovieFromOursQuery } from '../../services/moviesApi'
import MovieSpinner from '../../ui/MovieSpinner'


export default function MovieDetailsPage({movie}: {movie: MovieData}) {
  const {imdbID} = useParams();
  const {isLoading,data:getMovieFromOurs} = useGetMovieFromOursQuery( imdbID);
  
  return (
    (isLoading && (
      <MovieSpinner spinnerColor={"primary"} />
    )) ||
    
    <MovieDetailsContainer>
      <MovieContainer posterPath={movie.poster_path}>
        <Hero movie={movie}>
          <Details vote_average={movie.vote_average} likeCount={getMovieFromOurs?.likedBy.length || 0  } movie={movie} />

          
        </Hero>
        <Description description={'description'}  likedUsers={getMovieFromOurs?.likedBy || []}  />
      </MovieContainer>
    </MovieDetailsContainer>
  )
}


