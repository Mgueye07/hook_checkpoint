import { Star, Trash2 } from 'lucide-react';
import { Movie } from '../lib/supabase';

interface MovieCardProps {
  movie: Movie;
  onDelete?: (id: string) => void;
}

export function MovieCard({ movie, onDelete }: MovieCardProps) {
  const handleDelete = () => {
    if (movie.id && onDelete) {
      onDelete(movie.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-96 overflow-hidden">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{movie.description}</p>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
