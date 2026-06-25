import { Helmet } from 'react-helmet-async';

export default function AppliedTrainers() {
  return (
    <>
      <Helmet><title>Applied Trainers - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Trainer Applications</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>No pending applications.</p>
        </div>
      </div>
    </>
  );
}
