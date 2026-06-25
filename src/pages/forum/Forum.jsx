import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import api from '../../utils/axios';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/forum', { params: { page, limit: 6 } })
      .then((r) => { setPosts(r.data.posts); setTotalPages(r.data.totalPages); })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <Helmet><title>Community Forum - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-light mb-2">Community Forum</h1>
        <p className="text-muted mb-8">Read and discuss fitness topics with the community.</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 animate-pulse"><div className="h-40 bg-accent/10 rounded-xl mb-4"></div><div className="h-5 bg-accent/10 rounded w-3/4 mb-2"></div><div className="h-4 bg-accent/10 rounded w-full"></div></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20"><FileText size={48} className="text-muted mx-auto mb-4" /><p className="text-muted text-lg">No forum posts yet.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="bg-card rounded-2xl overflow-hidden hover:bg-card-hover transition">
                  <div className="h-48 bg-accent/10 overflow-hidden">
                    {post.image ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted"><FileText size={32} /></div>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-light mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-muted text-sm mb-1">By {post.authorName} · {post.authorRole}</p>
                    <p className="text-muted text-sm mb-4 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted text-xs">{post.likes?.length || 0} likes</span>
                      <Link to={`/forum/${post._id}`} className="text-primary text-sm font-semibold hover:underline">Read More →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-card text-muted hover:text-light rounded-lg transition disabled:opacity-30">Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`px-4 py-2 rounded-lg transition ${p === page ? 'bg-primary text-white' : 'bg-card text-muted hover:text-light'}`}>{p}</button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-card text-muted hover:text-light rounded-lg transition disabled:opacity-30">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
