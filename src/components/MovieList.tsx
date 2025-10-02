import { Movie } from '../lib/supabase';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onDeleteMovie: (id: string) => void;
}

export function MovieList({ movies, onDeleteMovie }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No movies found. Add your first movie!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onDelete={onDeleteMovie} />
      ))}
    </div>
  );
}
