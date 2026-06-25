import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function Payment() {
  const { id } = useParams();
  return (
    <>
      <Helmet><title>Payment - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-light mb-8">Payment</h1>
        <p className="text-muted">Complete payment for class: {id}</p>
      </div>
    </>
  );
}
