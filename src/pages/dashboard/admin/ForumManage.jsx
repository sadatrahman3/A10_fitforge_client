import { Helmet } from 'react-helmet-async';

export default function ForumManage() {
  return (
    <>
      <Helmet><title>Forum Management - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Forum Management</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>No forum posts to manage.</p>
        </div>
      </div>
    </>
  );
}
