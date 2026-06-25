import { Helmet } from 'react-helmet-async';

export default function FavoriteClasses() {
  return (
    <>
      <Helmet><title>Favorite Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Favorite Classes</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>No favorite classes yet.</p>
        </div>
      </div>
    </>
  );
}
