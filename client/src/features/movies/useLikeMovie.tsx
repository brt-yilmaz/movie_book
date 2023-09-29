import { useState } from "react";
import { apiLikeMovie } from "../../services/apiLikeMovie";
import { useAppDispatch } from "../../state/store";
import { updateUserLikedMovies } from "../../state/userSlice";

export default async function useLikeMovie(
  imdbID: string,
  token: string | null
) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  setIsLoading(true);

  try {
    const res = await apiLikeMovie(imdbID, token);
    dispatch(updateUserLikedMovies(res));
  } catch (error) {
    setError(error as Error);
  } finally {
    setIsLoading(false);
  }

  return { isLoading, error };
}
