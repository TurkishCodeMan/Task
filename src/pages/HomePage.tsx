import React, { useState, useEffect } from 'react';
import { NewsList } from '../components/NewsList';
import { SourceSelector } from '../components/SourceSelector';
import PublicationTimeChart from '../components/PublicationTimeChart';
import { useNews } from '../hooks/useNews';
import { NewsFilter } from '../types/news';
import { initNotifications, sendNewsNotification } from '../services/notificationService';
import '../styles/HomePage.css';

export const HomePage: React.FC = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastArticleId, setLastArticleId] = useState<string | null>(null);
  const [showSourceSelector, setShowSourceSelector] = useState(false);

  const filter: NewsFilter = {
    sources: selectedSources,
    q: searchQuery,
  };

  const { articles, loading, error } = useNews(filter);

  useEffect(() => {
    initNotifications();
  }, []);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const latestArticle = articles[0];
      const articleId = latestArticle.url;

      if (lastArticleId && articleId !== lastArticleId) {
        sendNewsNotification(latestArticle);
      }

      setLastArticleId(articleId);
    }
  }, [articles, lastArticleId]);

  const handleSourcesChange = (sources: string[]) => {
    setSelectedSources(sources);
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="source-toggle-btn"
          onClick={() => setShowSourceSelector(!showSourceSelector)}
        >
          Select Sources
        </button>
      </header>

      <div className="content-wrapper">
        {/* Desktop sol panel */}
        <aside className="desktop-sidebar">
          <div className="sidebar-section">
            <h2 className="section-title">News Sources</h2>
            <SourceSelector
              selectedSources={selectedSources}
              onSourcesChange={handleSourcesChange}
            />
          </div>
          <div className="sidebar-section">
            <h2 className="section-title">Publication Times</h2>
            <PublicationTimeChart articles={articles} />
          </div>
        </aside>

        {/* Ana içerik */}
        <main className="main-content">
          <div className="news-section">
            <NewsList articles={articles} loading={loading} error={error} />
          </div>
        </main>
      </div>

      {/* Mobil için kaynak seçici ve grafik */}
      <div className={`mobile-source-panel ${showSourceSelector ? 'show' : ''}`}>
        <div className="source-panel-header">
          <h2>News Sources</h2>
          <button 
            className="close-btn"
            onClick={() => setShowSourceSelector(false)}
          >
            ✕
          </button>
        </div>
        <SourceSelector
          selectedSources={selectedSources}
          onSourcesChange={handleSourcesChange}
        />
        <div className="mobile-chart">
          <PublicationTimeChart articles={articles} />
        </div>
      </div>
    </div>
  );
};
