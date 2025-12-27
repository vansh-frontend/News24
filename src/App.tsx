import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';

const API_KEY = 'ndh_QkQomjM1OY1V8qRpJqBQex9NhngP1JPLYnpGlYpNG98';
const BASE_URL = 'https://api.newsdatahub.com/v1/news';

const NewsSkeletonLoader = () => (
  <div className="skeleton-grid">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="skeleton-card">
        <div
          className="skeleton-image"
          style={{
            backgroundImage: `url(https://picsum.photos/600/360?random=${index})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="skeleton-line short" />
        <div className="skeleton-line xsmall" />
        <div className="skeleton-lines">
          <div className="skeleton-line" />
          <div className="skeleton-line shorter" />
        </div>
      </div>
    ))}
  </div>
);

interface Article {
  id: string;
  title: string;
  source_title: string;
  pub_date: string;
  description: string;
  article_link: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL, {
          headers: { 'X-Api-Key': API_KEY },
          params: {
            per_page: 10,
            fields: 'id,title,source_title,pub_date,description,article_link',
            language: 'en',
            country: 'us',
          },
        });

        // Keep it simple: set articles from API response
        const data = response.data?.data || [];
        setArticles(data as Article[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="app-bg">
      <div className="container page-content">
        {/* Header Section */}
        <Header />

        {/* Error Message */}
        {error && (
          <div className="error-wrap">
            <div className="error-box">
              <p className="error-text">
                <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="news-wrap">
          {loading ? (
            <NewsSkeletonLoader />
          ) : (
            <div className="news-grid">
              {articles.map(article => (
                <article key={article.id} className="article-card">
                  {/* Random image for visual interest (picsum) */}
                  <img
                    className={`article-image ${
                      ['grad-blue-to-teal', 'grad-purple-to-pink', 'grad-yellow-to-orange'][Math.floor(Math.random() * 3)]
                    }`}
                    src={`https://picsum.photos/600/360?random=${Math.floor(Math.random() * 100000)}`}
                    alt={article.title}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <a href={article.article_link} target="_blank" rel="noopener noreferrer" className="article-link">
                      <h2 className="article-title">{article.title}</h2>
                      <div className="article-meta">
                        <span className="article-source">{article.source_title}</span>
                        <span className="meta-sep">•</span>
                        <time className="article-date">
                          {new Date(article.pub_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>
                      <p className="article-desc">{article.description}</p>
                      <div className="read-more">
                        Read more
                        <svg className="read-more-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;