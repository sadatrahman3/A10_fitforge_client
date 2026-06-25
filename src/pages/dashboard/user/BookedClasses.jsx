import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function BookedClasses() {
  return (
    <>
      <Helmet><title>Booked Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Booked Classes</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>No booked classes yet. Browse classes to get started!</p>
          <Link to="/classes" className="text-primary hover:underline mt-2 inline-block font-semibold">Browse Classes</Link>
        </div>
      </div>
    </>
  );
}
