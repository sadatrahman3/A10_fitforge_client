import { Helmet } from 'react-helmet-async';

export default function Forum() {
  return (
    <>
      <Helmet><title>Community Forum - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-light mb-8">Community Forum</h1>
        <p className="text-muted">Read and discuss fitness topics with the community.</p>
      </div>
    </>
  );
}
