import React from 'react';
import Link from 'next/link';
import './style.css';

const HomeBanner = () => {
  return (
    <header className="page-header home-header">
      <div className="container">
        <div className="banner-content">
          <h4 className="sub-title">Movieformatics</h4>
          <h2 className="title">Movie-nya {<span>Anak Informatics</span>}</h2>
          <Link className="btn" href='/#movies'>
          <i className="ri-arrow-right-line"></i>
            Browse Movies
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HomeBanner;