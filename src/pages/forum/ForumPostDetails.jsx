import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft, Send, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/axios';
import { getPhotoSrc } from '../../utils/photoUrl';

export default function ForumPostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    Promise.all([
      api.get(`/forum/${id}`),
      api.get(`/comments/${id}`),
    ]).then(([postRes, commentsRes]) => {
      setPost(postRes.data);
      setComments(commentsRes.data);
    }).catch(() => toast.error('Post not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!user) return toast.error('Please login');
    try {
      const res = await api.post(`/forum/${id}/like`);
      setPost(res.data);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDislike = async () => {
    if (!user) return toast.error('Please login');
    try {
      const res = await api.post(`/forum/${id}/dislike`);
      setPost(res.data);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login');
    if (!commentText.trim()) return;
    try {
      const res = await api.post('/comments', {
        postId: id,
        text: commentText,
        authorName: user.name,
        authorPhoto: user.photoURL,
      });
      setComments([res.data, ...comments]);
      setCommentText('');
      toast.success('Comment added');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success('Comment deleted');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await api.put(`/comments/${commentId}`, { text: editText });
      setComments(comments.map((c) => c._id === commentId ? res.data : c));
      setEditingComment(null);
      toast.success('Comment updated');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="text-muted">Loading...</div></div>;
  if (!post) return <div className="min-h-[60vh] flex items-center justify-center text-muted">Post not found</div>;

  return (
    <>
      <Helmet><title>{post.title} - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted hover:text-light mb-6 transition"><ArrowLeft size={18} /> Back</button>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl overflow-hidden shadow-xl mb-8"
        >
          {post.image && <div className="h-64 md:h-80 bg-accent/10 overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover" /></div>}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-light mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 mb-6">
              <img src={getPhotoSrc(post.authorPhoto) || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} onError={(e) => { e.target.src = 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'; }} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-light font-semibold text-sm">{post.authorName}</p>
                <p className="text-muted text-xs capitalize">{post.authorRole} · {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-muted leading-relaxed text-lg whitespace-pre-wrap">{post.description}</p>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-accent/20">
              <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${post.likes?.includes(user?.id) ? 'bg-primary/20 text-primary' : 'bg-dark text-muted hover:text-light'}`}>
                <ThumbsUp size={18} fill={post.likes?.includes(user?.id) ? 'currentColor' : 'none'} /> {post.likes?.length || 0}
              </button>
              <button onClick={handleDislike} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${post.dislikes?.includes(user?.id) ? 'bg-red-500/20 text-red-400' : 'bg-dark text-muted hover:text-light'}`}>
                <ThumbsDown size={18} fill={post.dislikes?.includes(user?.id) ? 'currentColor' : 'none'} /> {post.dislikes?.length || 0}
              </button>
              <span className="flex items-center gap-2 text-muted"><MessageCircle size={18} /> {comments.length} comments</span>
            </div>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-light mb-6">Comments</h2>

          {user && (
            <form onSubmit={handleComment} className="flex gap-3 mb-8">
              <img src={getPhotoSrc(user.photoURL) || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} onError={(e) => { e.target.src = 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'; }} alt="" className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 flex gap-2">
                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
                <button type="submit" className="bg-primary hover:bg-primary-dark p-3 rounded-lg text-white transition"><Send size={18} /></button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {comments.length === 0 && <p className="text-muted text-sm text-center py-4">No comments yet. Be the first to comment!</p>}
            {comments.map((comment) => (
              <div key={comment._id} className="bg-dark rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <img src={getPhotoSrc(comment.authorPhoto) || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} onError={(e) => { e.target.src = 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'; }} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-light font-semibold text-sm">{comment.authorName}</p>
                      <p className="text-muted text-xs">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                    {editingComment === comment._id ? (
                      <div className="flex gap-2 mt-2">
                        <input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1 bg-card border border-accent/30 rounded-lg px-3 py-2 text-light text-sm focus:border-primary outline-none" />
                        <button onClick={() => handleEditComment(comment._id)} className="bg-primary px-3 py-2 rounded-lg text-white text-sm">Save</button>
                        <button onClick={() => setEditingComment(null)} className="bg-dark px-3 py-2 rounded-lg text-muted text-sm">Cancel</button>
                      </div>
                    ) : (
                      <p className="text-muted text-sm mt-1">{comment.text}</p>
                    )}
                    {user && user.id === comment.authorId && editingComment !== comment._id && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => { setEditingComment(comment._id); setEditText(comment.text); }} className="text-muted hover:text-accent text-xs flex items-center gap-1"><Edit size={12} /> Edit</button>
                        <button onClick={() => handleDeleteComment(comment._id)} className="text-muted hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
