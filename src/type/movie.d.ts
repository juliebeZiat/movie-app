export type Movie = {
  _id: string;
  backdrop_path: string;
  poster_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  rating: number;
};
