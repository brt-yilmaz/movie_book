export const apiGetFriends = async (userId: string | undefined) => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/${userId}/friends`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  console.log(data);
  return data;
};
