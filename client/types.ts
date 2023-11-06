interface CastMember {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  name: string;
  order: number;
  profile_path: string | null;
}

interface CrewMember {
  credit_id: string;
  department: string;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string | null;
}

interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieData {
  credits: Credits;
  production_countries: ProductionCountry[];
  genres: Genre[];
  spoken_languages: SpokenLanguage[];
  backdrop_path: string;
  title: string;
  Year: string;
  vote_count: number;
  vote_average: number;
  imdb_id: string;
  release_date: string;
}
