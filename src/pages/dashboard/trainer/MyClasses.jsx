import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';
import { getPhotoSrc } from '../../../utils/photoUrl';

export default function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAttendees, setShowAttendees] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    api.get('/classes/my').then((r) => setClasses(r.data)).catch(() => {}).finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    try {
      await api.delete(`/classes/${id}`);
      setClasses(classes.filter((c) => c._id !== id));
      toast.success('Class deleted');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`/classes/${id}`, editForm);
      setClasses(classes.map((c) => c._id === id ? res.data : c));
      setEditingClass(null);
      toast.success('Class updated');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleViewAttendees = async (classId) => {
    setShowAttendees(classId);
    try {
      const res = await api.get(`/bookings/class/${classId}`);
      setAttendees(res.data);
    } catch { setAttendees([]); }
  };

  return (
    <>
      <Helmet><title>My Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">My Classes</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : classes.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>You haven't created any classes yet.</p></div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">Class</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{cls.className}</td>
                    <td className="p-4 text-muted">{cls.category}</td>
                    <td className="p-4 text-primary">${cls.price}</td>
                    <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cls.status === 'approved' ? 'bg-green-500/20 text-green-400' : cls.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{cls.status}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => { setEditingClass(cls._id); setEditForm({ className: cls.className, category: cls.category, price: cls.price, description: cls.description }); }} className="bg-accent/20 text-accent hover:bg-accent/30 px-3 py-1 rounded text-xs font-semibold transition">Update</button>
                        <button onClick={() => handleDelete(cls._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded text-xs font-semibold transition">Delete</button>
                        <button onClick={() => handleViewAttendees(cls._id)} className="bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 rounded text-xs font-semibold transition">Attendees</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingClass && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setEditingClass(null)}>
            <div className="bg-card rounded-2xl p-8 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-light">Update Class</h2>
              <input value={editForm.className} onChange={(e) => setEditForm({ ...editForm, className: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light" placeholder="Class Name" />
              <input value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light" placeholder="Category" />
              <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light" placeholder="Price" />
              <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light" rows={3} placeholder="Description" />
              <div className="flex gap-3">
                <button onClick={() => handleUpdate(editingClass)} className="flex-1 bg-primary hover:bg-primary-dark py-2 rounded-lg text-white font-semibold transition">Save</button>
                <button onClick={() => setEditingClass(null)} className="flex-1 bg-dark hover:bg-darker py-2 rounded-lg text-muted font-semibold transition">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showAttendees && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowAttendees(null)}>
            <div className="bg-card rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-light mb-4">Attendees</h2>
              {attendees.length === 0 ? <p className="text-muted text-center py-4">No attendees yet</p> : (
                <div className="space-y-2">
                  {attendees.map((a) => (
                    <div key={a._id} className="bg-dark rounded-lg p-3 flex items-center gap-3">
                      <img src={getPhotoSrc(a.userId?.photoURL) || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} onError={(e) => { e.target.src = 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'; }} alt="" className="w-8 h-8 rounded-full" />
                      <div><p className="text-light text-sm font-semibold">{a.userId?.name}</p><p className="text-muted text-xs">{a.userId?.email}</p></div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => setShowAttendees(null)} className="w-full mt-4 bg-dark hover:bg-darker py-2 rounded-lg text-muted font-semibold transition">Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
