import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function ForumManage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/forum').then((r) => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.delete(`/admin/forum/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success('Post deleted');
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <>
      <Helmet><title>Forum Management - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Forum Management</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>No forum posts.</p></div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">Title</th><th className="p-4">Author</th><th className="p-4">Role</th><th className="p-4">Likes</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{p.title}</td>
                    <td className="p-4 text-muted">{p.authorName}</td>
                    <td className="p-4 text-muted capitalize">{p.authorRole}</td>
                    <td className="p-4 text-muted">{p.likes?.length || 0}</td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(p._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded text-xs font-semibold transition">Delete</button>
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
