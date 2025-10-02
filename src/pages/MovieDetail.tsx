import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar } from 'lucide-react';
import { movieService } from '../lib/movieService';
import { Movie } from '../lib/supabase';

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMovie(id);
    }
  }, [id]);

  const loadMovie = async (movieId: string) => {
    setLoading(true);
    const data = await movieService.getMovieById(movieId);
    setMovie(data);
    setLoading(false);
  };

  const getEmbedUrl = (url: string | undefined): string | null => {
    if (!url) return null;

    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (url.includes('youtube.com/embed/')) {
      return url;
    }

    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Movie not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(movie.trailer_url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{movie.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.title}</h1>

              {movie.created_at && (
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <Calendar className="w-5 h-5" />
                  <span>Added: {new Date(movie.created_at).toLocaleDateString()}</span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{movie.description}</p>
              </div>

              {embedUrl && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Trailer</h2>
                  <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={embedUrl}
                      title={`${movie.title} Trailer`}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
