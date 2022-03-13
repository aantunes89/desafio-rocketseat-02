import { useEffect, useState } from "react";
import { Genre } from "../@types/Genres";
import { Movies } from "../@types/Movies";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: Genre;
  selectedGenreId: number;
}

export function Content({ selectedGenreId, selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    api
      .get<Movies[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
