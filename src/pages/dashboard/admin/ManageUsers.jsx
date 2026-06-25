import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users').then((r) => setUsers(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleBlock = async (id) => {
    try {
      const res = await api.put(`/admin/block/${id}`);
      setUsers(users.map((u) => u._id === id ? res.data : u));
      toast.success('User blocked');
    } catch (err) { toast.error('Failed'); }
  };

  const handleUnblock = async (id) => {
    try {
      const res = await api.put(`/admin/unblock/${id}`);
      setUsers(users.map((u) => u._id === id ? res.data : u));
      toast.success('User unblocked');
    } catch (err) { toast.error('Failed'); }
  };

  const handleMakeAdmin = async (id) => {
    if (!confirm('Make this user an Admin?')) return;
    try {
      const res = await api.put(`/admin/make-admin/${id}`);
      setUsers(users.map((u) => u._id === id ? res.data : u));
      toast.success('User promoted to Admin');
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <>
      <Helmet><title>Manage Users - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Manage Users</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{u.name}</td>
                    <td className="p-4 text-muted">{u.email}</td>
                    <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : u.role === 'trainer' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-accent/20 text-accent'}`}>{u.role}</span></td>
                    <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{u.status}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {u.status === 'active' ? (
                          <button onClick={() => handleBlock(u._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded text-xs font-semibold transition">Block</button>
                        ) : (
                          <button onClick={() => handleUnblock(u._id)} className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1 rounded text-xs font-semibold transition">Unblock</button>
                        )}
                        {u.role === 'user' && <button onClick={() => handleMakeAdmin(u._id)} className="bg-accent/20 text-accent hover:bg-accent/30 px-3 py-1 rounded text-xs font-semibold transition">Make Admin</button>}
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
