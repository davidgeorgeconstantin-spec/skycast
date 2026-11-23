import { Link } from 'react-router';
import { PageTransition } from '@/components/layout/PageTransition';

export function NotFoundPage() {
  return (
    <PageTransition>
      <div className="py-24 text-center">
        <p className="text-7xl font-bold">404</p>
        <p className="mt-2 text-white/70">This page drifted away like a cloud.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-white px-5 py-2 font-semibold text-slate-900">
          Go home
        </Link>
      </div>
    </PageTransition>
  );
}
