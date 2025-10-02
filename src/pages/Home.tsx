import { useState, useEffect, useMemo } from 'react';
import { Film } from 'lucide-react';
import { MovieList } from '../components/MovieList';
import { Filter } from '../components/Filter';
import { AddMovie } from '../components/AddMovie';
import { movieService } from '../lib/movieService';
import { Movie } from '../lib/supabase';

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    const data = await movieService.getAllMovies();
    setMovies(data);
    setLoading(false);
  };

  const handleAddMovie = async (movie: Omit<Movie, 'id' | 'created_at'>) => {
    const newMovie = await movieService.addMovie(movie);
    if (newMovie) {
      setMovies([newMovie, ...movies]);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    const success = await movieService.deleteMovie(id);
    if (success) {
      setMovies(movies.filter(movie => movie.id !== id));
    }
  };

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesRating = ratingFilter === '' || movie.rating >= parseFloat(ratingFilter);
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, ratingFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Film className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">My Movie Collection</h1>
          </div>
          <p className="text-gray-600 text-lg">Discover and manage your favorite movies</p>
        </header>

        <Filter
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          onTitleChange={setTitleFilter}
          onRatingChange={setRatingFilter}
        />

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Loading movies...</p>
          </div>
        ) : (
          <MovieList movies={filteredMovies} onDeleteMovie={handleDeleteMovie} />
        )}

        <AddMovie onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
}
