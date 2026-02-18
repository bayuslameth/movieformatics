import Navbar from '@/components/navbar';
import TrendingSeries from '@/components/topmovies/TrendingSeries';
import Footer from '@/components/footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <TrendingSeries />
      <Footer />
    </>
  );
}