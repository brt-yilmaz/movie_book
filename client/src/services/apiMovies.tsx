export async function apiMovies(query: string) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
  if (query === "") {
    return [];
  }
  const res = await fetch(url, options);
  const data = await res.json();
  console.log(data);
  return data.results;
}
