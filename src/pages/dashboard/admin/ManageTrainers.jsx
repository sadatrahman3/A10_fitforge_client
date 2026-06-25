import { Helmet } from 'react-helmet-async';

export default function ManageTrainers() {
  return (
    <>
      <Helmet><title>Manage Trainers - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Manage Trainers</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>No active trainers.</p>
        </div>
      </div>
    </>
  );
}
