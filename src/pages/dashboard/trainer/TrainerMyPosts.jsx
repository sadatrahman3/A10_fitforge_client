import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function TrainerMyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/forum', { params: { page: 1, limit: 50 } }).then((r) => {
      setPosts(r.data.posts.filter((p) => p.authorId === user?.id));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.delete(`/forum/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success('Post deleted');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <>
      <Helmet><title>My Forum Posts - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">My Forum Posts</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>You haven't published any posts yet.</p></div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="bg-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-lg overflow-hidden flex-shrink-0">
                  {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted text-xs">No img</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-light font-semibold truncate">{post.title}</h3>
                  <p className="text-muted text-sm">{post.likes?.length || 0} likes · {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded text-xs font-semibold transition">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
