export async function apiMovie(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}
