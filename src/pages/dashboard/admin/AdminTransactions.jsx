import { Helmet } from 'react-helmet-async';

export default function AdminTransactions() {
  return (
    <>
      <Helmet><title>Transactions - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Transactions</h1>
        <div className="bg-card rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-darker"><tr className="text-muted text-sm"><th className="p-4">User Email</th><th className="p-4">Amount</th><th className="p-4">Date</th><th className="p-4">Transaction ID</th></tr></thead>
            <tbody><tr><td colSpan="4" className="p-8 text-center text-muted">No transactions yet.</td></tr></tbody>
          </table>
        </div>
      </div>
    </>
  );
}
