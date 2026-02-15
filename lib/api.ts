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

// Mock data when no API key (so app runs out of the box)
const MOCK_MOVIES: Movie[] = [
  { imdbID: '1', Title: 'Inception', Year: '2010', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg' },
  { imdbID: '2', Title: 'The Dark Knight', Year: '2008', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg' },
  { imdbID: '3', Title: 'Interstellar', Year: '2014', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { imdbID: '4', Title: 'The Shawshank Redemption', Year: '1994', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNkLWJiNDEtZDVmZjk2YjUwZEFhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg' },
  { imdbID: '5', Title: 'Pulp Fiction', Year: '1994', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzBjMjQ3YzhjODlmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
  { imdbID: '6', Title: 'Forrest Gump', Year: '1994', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
  { imdbID: '7', Title: 'The Matrix', Year: '1999', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
  { imdbID: '8', Title: 'Gladiator', Year: '2000', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
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
