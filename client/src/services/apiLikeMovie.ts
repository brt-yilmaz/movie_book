export async function apiLikeMovie(imdbID: string, token: string | null) {
  const url = `http://18.192.127.148/api/v1/users/likeMovie/${imdbID}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
