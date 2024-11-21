import React, { useState } from 'react';
import '../styles/SearchNews.css';

interface SearchNewsProps {
  onSearch: (query: string) => Promise<void>;
}

const SearchNews: React.FC<SearchNewsProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await onSearch(query.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-news">
      <form onSubmit={handleSubmit} className="search-news__form">
        <input
          type="text"
          className="search-news__input"
          placeholder="Search for news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`search-news__button ${isLoading ? 'search-news__button--loading' : ''}`}
          disabled={isLoading}
        >
          <span className="search-news__button-icon">
            {isLoading ? '🔄' : '🔍'}
          </span>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="search-news__error">{error}</div>}
    </div>
  );
};

export default SearchNews;
