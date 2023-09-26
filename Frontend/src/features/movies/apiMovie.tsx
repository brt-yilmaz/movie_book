export async function apiMovie(imdbID: string) {
  const res = await fetch(
    "https://www.omdbapi.com/?i=" + `${imdbID}&apikey=71177485`
  );
  const data = await res.json();
  console.log(data);
  return data;
}
