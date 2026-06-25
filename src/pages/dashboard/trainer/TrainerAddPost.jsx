import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TrainerAddPost() {
  const [form, setForm] = useState({ title: '', image: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.success('Post published!');
      setForm({ title: '', image: '', description: '' });
    } catch {
      toast.error('Failed to publish post');
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
          <div>
            <label className="block text-sm text-muted mb-1">Image URL (Imgbb)</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" placeholder="https://..." />
          </div>
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
