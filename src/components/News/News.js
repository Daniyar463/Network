import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './News.css';

const News = () => {
    const API_KEY = '990dfdb01ea14e0490ec7bc35acc4499';
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setNewsData(data.articles))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="news-container">
            <h2 style={{ color: 'white', fontSize: '35px', position: 'absolute', top: '-5px', left: "50%", transform: "translateX(-50%)" }}>News</h2>
            <h2>Worldwide news</h2>
            {newsData &&
                newsData.map(article => (
                    <article key={article.url} className="news-article">
                        <a className="hidden-xs" href={article.url} rel="bookmark">
                            <div className="entry-thumb-wrapper">
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    decoding="async"
                                    loading="lazy"
                                    className="entry-thumb"
                                />
                                <div className="icon-mark">
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                            </div>
                        </a>

                        <header className="entry-header">
                            <h2 className="entry-title">
                                <a href={article.url} rel="bookmark">{article.title}</a>
                            </h2>
                            <div className="entry-meta">
                                <span className="posted-on">
                                    <a href={article.url} rel="bookmark">
                                        <time className="entry-date published" dateTime={article.publishedAt}>
                                            {article.publishedAt}
                                        </time>
                                    </a>
                                </span>
                            </div>
                        </header>

                        <div className="entry-excerpt">
                            <p>{article.description}</p>
                        </div>
                    </article>
                ))}
        </div>
    );
}

export default News;
