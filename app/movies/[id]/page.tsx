import { notFound } from 'next/navigation';
import MovieDetails from '@/components/moviedetails';
import RenderingNote from '@/components/RenderingNote';
import { getMovieById } from '../../../lib/api';

type MovieDetailPageProps = {
  params: {
    id: string;
  };
};

// MOVIE DETAIL PAGE (SSR)
// This page is rendered on every request so that the data
// is always fresh and SEO-friendly.
export const dynamic = 'force-dynamic';

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = await getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <>
      <MovieDetails movie={movie} />
      <RenderingNote technique="SSR">
        This movie detail page uses <b>Server-Side Rendering (SSR)</b> with{' '}
        <code>fetch(&quot;https://dummyjson.com/products/{params.id}&quot;, {'{'} cache: &quot;no-store&quot; {'}'})</code>{' '}
        inside the data access layer so that every request gets the most up-to-date
        information and the HTML is fully rendered on the server for better SEO.
      </RenderingNote>
    </>
  );
}

