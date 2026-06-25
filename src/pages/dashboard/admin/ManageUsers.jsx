import { Helmet } from 'react-helmet-async';

export default function ManageUsers() {
  return (
    <>
      <Helmet><title>Manage Users - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Manage Users</h1>
        <div className="bg-card rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-darker"><tr className="text-muted text-sm"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
            <tbody><tr><td colSpan="5" className="p-8 text-center text-muted">No users found.</td></tr></tbody>
          </table>
        </div>
      </div>
    </>
  );
}
