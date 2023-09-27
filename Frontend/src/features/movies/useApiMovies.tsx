import { useAppSelector } from "../../state/store";
import { apiMovies } from "./apiMovies";
import { useQuery } from "@tanstack/react-query";

export function useApiMovies() {
  const query = useAppSelector((state) => state.searchQuery);
  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: [query],
    queryFn: () => apiMovies(query),
  });
  return { isLoading, error, movies };
}