'use client';

import { FormEvent, useState } from 'react';
import MovieCard from '@/components/moviecard';
import type { Movie } from '../../lib/api';

// SEARCH PAGE (CSR)
// This page is rendered entirely on the client. It demonstrates
// Client-Side Rendering with dynamic user input, loading and error states.

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a search keyword.');
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // CSR: fetch is executed in the browser, based on user input.
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(
          trimmed
        )}`
      );

      if (!res.ok) {
        throw new Error('Failed to search movies.');
      }

      const data = await res.json();
      const movies: Movie[] = (data.products || []).map((product: any) => ({
        imdbID: String(product.id),
        Title: product.title,
        Year: new Date().getFullYear().toString(),
        Type: 'movie',
        Poster: product.thumbnail,
        Category: product.category,
        Description: product.description,
        Brand: product.brand,
        Rating: product.rating,
        Price: product.price,
      }));

      setResults(movies);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="search-page">
      <div className="container">
        <section className="search-header">
          <h1>Search Movies</h1>
          <p className="subtitle">
            Type a keyword to search mock movies from{' '}
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              dummyjson.com
            </a>
            .
          </p>
        </section>

        <section className="search-form-section">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies by title, brand, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>

          <div className="search-status">
            {isLoading && <p>Loading movies...</p>}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && !error && results.length === 0 && query && (
              <p>No movies found. Try another keyword.</p>
            )}
          </div>
        </section>

        {results.length > 0 && (
          <section className="search-results">
            <h2 className="section-title">Search Results</h2>
            <div className="row movies-grid">
              {results.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  watchList={watchList}
                  setWatchList={setWatchList}
                />
              ))}
            </div>
          </section>
        )}

        {/* Rendering explanation for CSR (Client-Side Rendering) */}
        <section className="render-note">
          <strong>Rendering: CSR</strong>
          <p>
            This search page uses <b>Client-Side Rendering (CSR)</b> because the
            UI depends heavily on user interaction and dynamic state updates.
            Movie data is fetched from <code>dummyjson.com</code> directly in
            the browser using <code>fetch</code> after the user submits a
            search, so the initial HTML can remain lightweight while subsequent
            updates happen instantly without a full page reload.
          </p>
        </section>
      </div>
    </main>
  );
}

