import { apiMovie } from "../../services/apiMovie";
import { useQuery } from "@tanstack/react-query";

export function useApiMovie(imdbID: string) {
  const {
    isLoading,
    data: movieDetails,
    error,
  } = useQuery({
    queryKey: [imdbID],
    queryFn: () => apiMovie(imdbID),
  });
  return { isLoading, error, movieDetails };
}
