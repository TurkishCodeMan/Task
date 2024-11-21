import React, { useState, useEffect } from 'react';
import { NewsSource } from '../types/news';
import { getSources } from '../services/newsService';
import '../styles/SourceSelector.css';

interface SourceSelectorProps {
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
}

export const SourceSelector: React.FC<SourceSelectorProps> = ({
  selectedSources,
  onSourcesChange,
}) => {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSources = async () => {
      try {
        setLoading(true);
        const data = await getSources();
        setSources(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sources'));
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  const filteredSources = sources.filter((source) =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSourceToggle = (sourceId: string) => {
    const newSources = selectedSources.includes(sourceId)
      ? selectedSources.filter((id) => id !== sourceId)
      : [...selectedSources, sourceId];
    onSourcesChange(newSources);
  };

  if (loading) {
    return <div className="source-selector__loading">Loading sources...</div>;
  }

  if (error) {
    return <div className="source-selector__error">Error: {error.message}</div>;
  }

  return (
    <div className="source-selector">
      <input
        type="text"
        className="source-selector__search"
        placeholder="Search news sources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="source-selector__list">
        {filteredSources.map((source) => (
          <label key={source.id} className="source-selector__item">
            <input
              type="checkbox"
              checked={selectedSources.includes(source.id)}
              onChange={() => handleSourceToggle(source.id)}
            />
            <span className="source-selector__name">{source.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
