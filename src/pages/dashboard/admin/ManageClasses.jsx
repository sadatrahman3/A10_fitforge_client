import { Helmet } from 'react-helmet-async';

export default function ManageClasses() {
  return (
    <>
      <Helmet><title>Manage Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Manage Classes</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>No classes to manage.</p>
        </div>
      </div>
    </>
  );
}
