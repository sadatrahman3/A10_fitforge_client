import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';
import ImageUploadField from '../../../components/shared/ImageUploadField';

export default function AdminAddPost() {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', image: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/forum', { ...form, authorName: user.name });
      toast.success('Post published!');
      setForm({ title: '', image: '', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Add Forum Post - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Add Forum Post</h1>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm text-muted mb-1">Title</label>
            <input name="title" required value={form.title} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
          </div>
          <ImageUploadField value={form.image} onChange={(image) => setForm({ ...form, image })} />
          <div>
            <label className="block text-sm text-muted mb-1">Description</label>
            <textarea name="description" required rows={6} value={form.description} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
          </div>
          <button disabled={loading} type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50">
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </>
  );
}
