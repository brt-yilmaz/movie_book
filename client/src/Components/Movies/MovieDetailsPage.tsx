import MovieDetailsContainer from './MovieDetailsContainer'
import MovieContainer from './MovieContainer'
import Hero from './Hero'
import Details from './Details'
import Description from './Description'

import { useParams } from 'react-router-dom'
import { useGetMovieFromOursQuery } from '../../services/movieMongoDBApi'
import MovieSpinner from '../../ui/MovieSpinner'


export default function MovieDetailsPage({movie}: {movie: MovieData}) {
  const {imdbID} = useParams();
  const {isLoading,data:getMovieFromOurs} = useGetMovieFromOursQuery( imdbID);
  console.log(getMovieFromOurs)
  return (
    (isLoading && (
      <MovieSpinner spinnerColor={"primary"} />
    )) ||
    
    <MovieDetailsContainer>
      <MovieContainer posterPath={movie.poster_path}>
        <Hero movie={movie}>
          <Details vote_average={movie.vote_average} likeCount={getMovieFromOurs?.likedBy.length } movie={movie} />

          
        </Hero>
        <Description genres={movie.genres} description={movie.overview}  likedUsers={getMovieFromOurs?.likedBy || []}  />
      </MovieContainer>
    </MovieDetailsContainer>
  )
}


