import React from 'react';
import { NewsCard } from './NewsCard';
import { Article } from '../types/news';
import '../styles/NewsList.css';

interface NewsListProps {
  articles: Article[];
  loading: boolean;
  error: Error | null;
}

export const NewsList: React.FC<NewsListProps> = ({ articles, loading, error }) => {
  if (loading) {
    return <div className="news-list__loading">Loading news...</div>;
  }

  if (error) {
    return <div className="news-list__error">Error: {error.message}</div>;
  }

  if (articles.length === 0) {
    return <div className="news-list__empty">No news articles found.</div>;
  }

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
};
