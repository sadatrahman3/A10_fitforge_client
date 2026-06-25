import { Helmet } from 'react-helmet-async';

export default function TrainerMyPosts() {
  return (
    <>
      <Helmet><title>My Forum Posts - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">My Forum Posts</h1>
        <div className="bg-card rounded-xl p-8 text-center text-muted">
          <p>You haven't published any posts yet.</p>
        </div>
      </div>
    </>
  );
}
