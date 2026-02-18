'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './style.css';

const Navbar = ({ setShowSearch, watchList }) => {
  const [sticky, setSticky] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [showSide, setShowSide] = useState(false);

  const handleResponsive = () => {
    if (window.innerWidth < 820) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  };

  useEffect(() => {
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
    return () => {
      window.removeEventListener('resize', handleResponsive);
    }
  })

  const handleScroll = () => {
    if (window.scrollY > 245) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (showSide) {
      document.body.style = 'overflow: hidden';
    }

    return () => {
      document.body.style = 'overflow: auto';
    }
  }, [showSide]);

  const handleShowSearch = () => {
    setShowSide(false);
    setShowSearch(true);
  }

  return (
    <nav className={sticky ? 'navbar sticky' : 'navbar'}>
      <div className='container'>
        <div className='row'>
          <div className='navbar-brand'>
            <Link className='navbar-item link' href='/'>
              <Image src='/logo.png' alt='Movieformatics' className='logo' style={{ marginLeft: "10px" }} width={40} height={40} />
            </Link>
          </div>
          <ul className={responsive ? (showSide ? 'navbar-menu sidebar show' : 'navbar-menu sidebar') : 'navbar-menu'}>
            {
              responsive
                ?
                (
                  <button className="btn close-btn" onClick={() => setShowSide((prev) => false)}>
                    <i className="ri-close-line"></i>
                  </button>
                )
                :
                null
            }
            <li className='navbar-item'>
              <Link className='navbar-link' href='/' onClick={() => setShowSide((prev) => false)}>
                Home
              </Link>
            </li>
            <li className='navbar-item'>
              <Link className='navbar-link' href='/#movies' onClick={() => setShowSide((prev) => false)}>
                Movies
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                className="navbar-link btn"
                href="/favourites"
                onClick={() => setShowSide(false)}
              >
                Favourites
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                className="navbar-link btn"
                href="/bookmarks"
                onClick={() => setShowSide(false)}
              >
                Bookmarks
              </Link>
            </li>
          </ul>
          {responsive ? (
            <div className='right-btns'>
              <button className='btn menu-toggle' onClick={() => setShowSide((prev) => true)}>
                <i className='ri-menu-3-line'></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;