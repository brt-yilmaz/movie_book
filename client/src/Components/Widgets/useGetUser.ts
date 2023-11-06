import { useQuery } from "@tanstack/react-query";
import { apiGetUser } from "../../services/apiGetUser";
import { useState } from "react";

export const useGetUser = (userID: string) => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: [userID],
    queryFn: () => apiGetUser(userID),
  });

  const [friendStatus, setIsFriendStatus] = useState(false);

  if (user && user.friends.includes(userID)) {
    setIsFriendStatus(true);
  }

  return { isLoading, error, user, friendStatus };
};
