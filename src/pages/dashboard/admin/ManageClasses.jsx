import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/classes').then((r) => setClasses(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await api.put(`/admin/classes/approve/${id}`);
      setClasses(classes.map((c) => c._id === id ? res.data : c));
      toast.success('Class approved');
    } catch (err) { toast.error('Failed'); }
  };

  const handleReject = async (id) => {
    try {
      const res = await api.put(`/admin/classes/reject/${id}`);
      setClasses(classes.map((c) => c._id === id ? res.data : c));
      toast.success('Class rejected');
    } catch (err) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this class?')) return;
    try {
      await api.delete(`/admin/classes/${id}`);
      setClasses(classes.filter((c) => c._id !== id));
      toast.success('Class deleted');
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <>
      <Helmet><title>Manage Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Manage Classes</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : classes.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>No classes to manage.</p></div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">Class</th><th className="p-4">Trainer</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{cls.className}</td>
                    <td className="p-4 text-muted">{cls.trainerName}</td>
                    <td className="p-4 text-muted">{cls.category}</td>
                    <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cls.status === 'approved' ? 'bg-green-500/20 text-green-400' : cls.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{cls.status}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {cls.status !== 'approved' && <button onClick={() => handleApprove(cls._id)} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1 rounded text-xs font-semibold transition">Approve</button>}
                        {cls.status !== 'rejected' && <button onClick={() => handleReject(cls._id)} className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 px-3 py-1 rounded text-xs font-semibold transition">Reject</button>}
                        <button onClick={() => handleDelete(cls._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded text-xs font-semibold transition">Delete</button>
                      </div>
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
