import { useState, useEffect } from 'react';
import { Article, NewsFilter } from '../types/news';
import { getTopHeadlines, getEverything } from '../services/newsService';

export const useNews = (filter: NewsFilter, refreshInterval = 60000) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = filter.q
        ? await getEverything(filter)
        : await getTopHeadlines(filter);
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, refreshInterval);
    return () => clearInterval(interval);
  }, [JSON.stringify(filter)]);

  return { articles, loading, error, refetch: fetchNews };
};
