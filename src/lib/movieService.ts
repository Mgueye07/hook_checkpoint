import { supabase, Movie } from './supabase';

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching movies:', error);
      return [];
    }

    return data || [];
  },

  async addMovie(movie: Omit<Movie, 'id' | 'created_at'>): Promise<Movie | null> {
    const { data, error } = await supabase
      .from('movies')
      .insert([movie])
      .select()
      .single();

    if (error) {
      console.error('Error adding movie:', error);
      return null;
    }

    return data;
  },

  async updateMovie(id: string, movie: Partial<Movie>): Promise<Movie | null> {
    const { data, error } = await supabase
      .from('movies')
      .update(movie)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating movie:', error);
      return null;
    }

    return data;
  },

  async deleteMovie(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('movies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting movie:', error);
      return false;
    }

    return true;
  },

  async getMovieById(id: string): Promise<Movie | null> {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching movie:', error);
      return null;
    }

    return data;
  }
};
