const genreColors: Record<string, string> = {
  Action: "#FF0000",
  Adventure: "#00FF00",
  Animation: "#0000FF",
  Comedy: "#FFFF00",
  Crime: "#800080",
  Documentary: "#FFA500",
  Drama: "#008080",
  Family: "#FFC0CB",
  Fantasy: "#4B0082",
  Horror: "#808080",
  Mystery: "#A52A2A",
  Romance: "#FF007F",
  "Sci-Fi": "#00FFFF",
  Thriller: "#32CD32",
  Western: "#FFBF00",
};

export const getGenreColor = (genres: Genre[]): string | null => {
  const genreFirst = genres.map((g) => g.name).sort()[0];
  return genreColors[genreFirst] || null;
};
