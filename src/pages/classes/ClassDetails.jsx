import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function ClassDetails() {
  const { id } = useParams();
  return (
    <>
      <Helmet><title>Class Details - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-light mb-8">Class Details</h1>
        <p className="text-muted">Class ID: {id}</p>
      </div>
    </>
  );
}
