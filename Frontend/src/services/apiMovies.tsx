export async function apiMovies(query: string) {
  if (query === "") {
    return [];
  }
  const res = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=71177485&s=${query}`
  );
  const data = await res.json();
  return data.Search;
}
