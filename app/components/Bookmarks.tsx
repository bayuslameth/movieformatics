'use client';

import { useEffect, useState } from 'react';
import Navbar from './navbar';
import TopMovies from './onbooks';
import Footer from './footer';
import { getMovies } from '../../lib/api';

export default function MovflxHome() {
  const [watchList, setWatchList] = useState<{ imdbID: string; Title: string; Year: string; Type: string; Poster: string }[]>([]);
  const [filterCtg, setFilterCtg] = useState('Action');
  const [topMovies, setTopMovies] = useState<{ imdbID: string; Title: string; Year: string; Type: string; Poster: string }[] | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('watchList') : null;
    if (stored) {
      try {
        setWatchList(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    getMovies(filterCtg).then(setTopMovies);
  }, [filterCtg]);

  return (
    <>
      <Navbar setShowSearch={setShowSearch} watchList={watchList} />
      <TopMovies
        filterCtg={filterCtg}
        setFilterCtg={setFilterCtg}
        topMovies={topMovies}
        setWatchList={setWatchList}
        watchList={watchList}
      />
      <Footer />
    </>
    
  );
}
