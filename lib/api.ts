// OMDB API (get free key at https://www.omdbapi.com/apikey.aspx)
const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '';
const OMDB_URL = 'https://www.omdbapi.com';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Genre?: string;
}
const MOCK_MOVIES: Movie[] = [
  {
    imdbID: '1',
    Title: 'Inception',
    Year: '2010',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
  },
  {
    imdbID: '2',
    Title: 'The Dark Knight',
    Year: '2008',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
  },
  {
    imdbID: '3',
    Title: 'Interstellar',
    Year: '2014',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
  },
  {
    imdbID: '6',
    Title: 'Forrest Gump',
    Year: '1994',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    imdbID: '7',
    Title: 'The Matrix',
    Year: '1999',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    imdbID: '8',
    Title: 'Gladiator',
    Year: '2000',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  // Yang sudah ada dari sebelumnya
  {
    imdbID: '9',
    Title: 'The Godfather',
    Year: '1972',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: '11',
    Title: '12 Angry Men',
    Year: '1957',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'
  },
  {
    imdbID: '13',
    Title: 'The Lord of the Rings: The Return of the King',
    Year: '2003',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: '14',
    Title: 'The Good, the Bad and the Ugly',
    Year: '1966',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SX300.jpg'
  },
  {
    imdbID: '15',
    Title: 'Fight Club',
    Year: '1999',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: '16',
    Title: 'The Lord of the Rings: The Fellowship of the Ring',
    Year: '2001',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg'
  },
  {
    imdbID: '18',
    Title: 'The Empire Strikes Back',
    Year: '1980',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: '26',
    Title: 'The Lord of the Rings: The Two Towers',
    Year: '2002',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    imdbID: '32',
    Title: 'City Lights',
    Year: '1931',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BY2I4MmM1N2EtM2YzOS00OWUzLTkzYzctNDc5NDg2N2IyODJmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: '33',
    Title: 'City of God',
    Year: '2002',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg'
  },
  {
    imdbID: '36',
    Title: 'Saving Private Ryan',
    Year: '1998',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg'
  },
];

export async function getMovies(search?: string): Promise<Movie[]> {
  if (OMDB_API_KEY) {
    try {
      const query = search ? `s=${encodeURIComponent(search)}` : 's=action';
      const res = await fetch(`${OMDB_URL}/?apikey=${OMDB_API_KEY}&${query}&type=movie`, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (!res.ok) return MOCK_MOVIES;
      const data = await res.json();
      if (data.Response === 'False' || !data.Search?.length) return MOCK_MOVIES;
      return data.Search.map((m: { imdbID: string; Title: string; Year: string; Type: string; Poster: string }) => ({
        imdbID: m.imdbID,
        Title: m.Title,
        Year: m.Year,
        Type: m.Type,
        Poster: m.Poster !== 'N/A' ? m.Poster : '/images/placeholder-poster.png',
      }));
    } catch {
      return MOCK_MOVIES;
    }
  }
  return MOCK_MOVIES;
}

export async function getMovieById(id: string): Promise<Movie | null> {
  if (OMDB_API_KEY) {
    try {
      const res = await fetch(`${OMDB_URL}/?apikey=${OMDB_API_KEY}&i=${id}`, { cache: 'no-store' });
      if (!res.ok) return null;
      const m = await res.json();
      if (m.Response === 'False') return null;
      return {
        imdbID: m.imdbID,
        Title: m.Title,
        Year: m.Year,
        Type: m.Type,
        Poster: m.Poster !== 'N/A' ? m.Poster : '/images/placeholder-poster.png',
        Genre: m.Genre,
      };
    } catch {
      return null;
    }
  }
  return MOCK_MOVIES.find((movie) => movie.imdbID === id) || null;
}
// Tambah di lib/api.ts
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}
export const MOCK_SERIES: Movie[] = [
  {
    imdbID: 'tt0944947',
    Title: 'Game of Thrones',
    Year: '2011–2019',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt4574334',
    Title: 'Stranger Things',
    Year: '2016–2025',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt1844624',
    Title: 'American Horror Story',
    Year: '2011–',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BODZlYzc2ODYtYmQyZS00ZTM4LTk4ZDQtMTMyZDdhMDgzZTU0XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt2306299',
    Title: 'Vikings',
    Year: '2013–2020',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BODk4ZjU0NDUtYjdlOS00OTljLTgwZTUtYjkyZjk1NzExZGIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0141842',
    Title: 'The Sopranos',
    Year: '1999–2007',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
  },

  // duplicates → unique ids
  { imdbID: 'tt9000001', Title: 'Game of Thrones', Year: '2011–2019', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg' },
  { imdbID: 'tt9000002', Title: 'Stranger Things', Year: '2016–2025', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { imdbID: 'tt9000003', Title: 'American Horror Story', Year: '2011–', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BODZlYzc2ODYtYmQyZS00ZTM4LTk4ZDQtMTMyZDdhMDgzZTU0XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg' },
  { imdbID: 'tt9000004', Title: 'Vikings', Year: '2013–2020', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BODk4ZjU0NDUtYjdlOS00OTljLTgwZTUtYjkyZjk1NzExZGIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg' },
  { imdbID: 'tt9000005', Title: 'The Sopranos', Year: '1999–2007', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg' },

  { imdbID: 'tt9000006', Title: 'Game of Thrones', Year: '2011–2019', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg' },
  { imdbID: 'tt9000007', Title: 'Stranger Things', Year: '2016–2025', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg' },
  { imdbID: 'tt9000008', Title: 'American Horror Story', Year: '2011–', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BODZlYzc2ODYtYmQyZS00ZTM4LTk4ZDQtMTMyZDdhMDgzZTU0XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg' },
  { imdbID: 'tt9000009', Title: 'Vikings', Year: '2013–2020', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BODk4ZjU0NDUtYjdlOS00OTljLTgwZTUtYjkyZjk1NzExZGIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg' },
  { imdbID: 'tt9000010', Title: 'The Sopranos', Year: '1999–2007', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg' },
];


export async function getSeries(): Promise<Movie[]> {
  if (OMDB_API_KEY) {
    try {
      const res = await fetch(
        `${OMDB_URL}/?apikey=${OMDB_API_KEY}&s=series&type=series`,
        {
          next: { revalidate: 3600 }, // cache SSR 1 jam
        }
      );
      const data = await res.json();
      if (data.Response !== 'False' && data.Search?.length) {
        return data.Search;
      }
    } catch { }
  }
  return MOCK_SERIES; // fallback dummy
}