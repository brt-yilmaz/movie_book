import { useQuery } from "@tanstack/react-query";
import { apiGetUser } from "../../services/apiGetUser";

export const useGetUser = (userID: string) => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: [userID],
    queryFn: () => apiGetUser(userID),
  });

  return { isLoading, error, user };
};
