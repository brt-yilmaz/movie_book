import { useQuery } from "@tanstack/react-query";
import { apiGetFriends } from "../../services/apiGetFriends";

export const useGetFriends = (userId: string | undefined) => {
  const {
    isLoading,
    data: friends,
    error,
  } = useQuery({
    queryKey: [userId],
    queryFn: () => apiGetFriends(userId),
  });

  return { isLoading, error, friends };
};
