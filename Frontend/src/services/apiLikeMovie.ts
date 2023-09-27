export async function apiLikeMovie(imdbID: string, token: string | null) {
  const url = "http://localhost:3001/api/v1/users/likeMovie/" + imdbID;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
