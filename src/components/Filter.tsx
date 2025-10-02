import { Search, Star } from 'lucide-react';

interface FilterProps {
  titleFilter: string;
  ratingFilter: string;
  onTitleChange: (value: string) => void;
  onRatingChange: (value: string) => void;
}

export function Filter({ titleFilter, ratingFilter, onTitleChange, onRatingChange }: FilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="title-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Search by Title
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="title-filter"
              type="text"
              value={titleFilter}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter movie title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="rating-filter"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={ratingFilter}
              onChange={(e) => onRatingChange(e.target.value)}
              placeholder="0.0"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
