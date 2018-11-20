import { Movie } from "./movie.model";

export interface User {
  id: string;
  watchlist: Movie[];
}
