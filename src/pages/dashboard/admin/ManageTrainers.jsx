import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/trainers/all').then((r) => setTrainers(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleDemote = async (id) => {
    if (!confirm('Remove trainer privileges from this user?')) return;
    try {
      const res = await api.put(`/trainers/demote/${id}`);
      setTrainers(trainers.filter((t) => t._id !== id));
      toast.success('Trainer demoted to user');
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <>
      <Helmet><title>Manage Trainers - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Manage Trainers</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : trainers.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>No active trainers.</p></div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Specialty</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {trainers.map((t) => (
                  <tr key={t._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{t.name}</td>
                    <td className="p-4 text-muted">{t.email}</td>
                    <td className="p-4 text-muted">{t.trainerDetails?.specialty || 'N/A'}</td>
                    <td className="p-4">
                      <button onClick={() => handleDemote(t._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded text-xs font-semibold transition">Demote to User</button>
                    </td>
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
