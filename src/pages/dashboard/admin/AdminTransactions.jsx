import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import api from '../../../utils/axios';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/transactions').then((r) => setTransactions(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Transactions - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Transactions</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : transactions.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>No transactions yet.</p></div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">User Email</th><th className="p-4">Amount</th><th className="p-4">Date</th><th className="p-4">Transaction ID</th></tr></thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} className="border-t border-accent/10">
                    <td className="p-4 text-muted">{t.userEmail}</td>
                    <td className="p-4 text-primary font-bold">${t.amount}</td>
                    <td className="p-4 text-muted text-sm">{new Date(t.paymentDate).toLocaleDateString()}</td>
                    <td className="p-4 text-muted text-xs font-mono">{t.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
