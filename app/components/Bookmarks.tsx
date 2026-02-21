import Navbar from './navbar';
import TopMovies from './onbooks';
import Footer from './footer';
import { getBookmarkMovies } from '../../lib/api';

export default async function Bookmarks() {
  const topMovies = await getBookmarkMovies();
  return (
    <>
      <Navbar watchList={[]} />
      <TopMovies
        topMovies={topMovies}
        watchList={[]}
      />
      <Footer />
    </>
  );
}
