import { apiMovie } from "../../services/apiMovie";
import { useQuery } from "@tanstack/react-query";

export function useApiMovie(id: string) {
  const {
    isLoading,
    data: movieDetails,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: () => apiMovie(id),
  });
  return { isLoading, error, movieDetails };
}
