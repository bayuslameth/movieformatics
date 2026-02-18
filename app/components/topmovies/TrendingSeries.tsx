// TIDAK ADA 'use client' = ini Server Component
import { getSeries } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function TrendingSeries() {
  // Data di-fetch langsung di server sebelum dikirim ke browser
  const series = await getSeries();

  return (
    <section className="new-sec top-rated-sec" id="series">
      <div className="container">
        <div className="section-title">
          <h5 className="sub-title">ON GOING SERIES</h5>
          <h2 className="title">TRENDING SERIES</h2>
          <p>This section shows trending series by server side rendering.</p>
        </div>
        <div className="row movies-grid">
          {series.map((s) => (
            <div className="single-movie" key={s.imdbID}>
              <div className="movie-poster">
                <img src={s.Poster} alt={s.Title} />
              </div>
              <div className="movie-content">
                <div className="top row">
                  <h5 className="title">
                    <Link href={`/movie/${s.imdbID}`} className="link">
                      {s.Title.length > 20
                        ? s.Title.slice(0, 20) + '...'
                        : s.Title}
                    </Link>
                  </h5>
                  <h6 className="year">{s.Year}</h6>
                </div>
                <div className="bottom row">
                  <span className="quality">HD</span>
                  <span className="type">{s.Type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}