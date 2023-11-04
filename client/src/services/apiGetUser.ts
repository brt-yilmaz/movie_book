export const apiGetUser = async (userID: string) => {
  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/users/${userID}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(url, options);
  const { data } = await res.json();
  console.log(data);
  return data;
};
