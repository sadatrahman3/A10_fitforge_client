import { Helmet } from 'react-helmet-async';

export default function MyClasses() {
  return (
    <>
      <Helmet><title>My Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">My Classes</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>You haven't created any classes yet.</p>
        </div>
      </div>
    </>
  );
}
