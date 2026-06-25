import { Helmet } from 'react-helmet-async';

export default function AllClasses() {
  return (
    <>
      <Helmet><title>All Classes - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-light mb-8">All Fitness Classes</h1>
        <p className="text-muted">Browse and search all available classes.</p>
      </div>
    </>
  );
}
