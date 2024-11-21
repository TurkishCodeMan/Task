import React from 'react';
import { Article } from '../types/news';
import '../styles/NewsCard.css';

interface NewsCardProps {
  article: Article;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="news-card">
      {article.urlToImage && (
        <div className="news-card__image">
          <img src={article.urlToImage} alt={article.title} />
        </div>
      )}
      <div className="news-card__content">
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__source">
          {article.source.name} • {formatDate(article.publishedAt)}
        </p>
        {article.description && (
          <p className="news-card__description">{article.description}</p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__link"
        >
          Read more
        </a>
      </div>
    </div>
  );
};
