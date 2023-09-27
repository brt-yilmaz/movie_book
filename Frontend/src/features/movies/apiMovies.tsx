export async function apiMovies(query: string) {
  const res = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=71177485&s=${query}`
  );
  const data = await res.json();
  console.log(data);
  return data.Search;
}
