import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function AddClass() {
  const { user } = useAuth();
  const [form, setForm] = useState({ className: '', image: '', category: '', difficulty: '', duration: '', schedule: '', price: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/classes', {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
        trainerName: user.name,
      });
      toast.success('Class submitted for review!');
      setForm({ className: '', image: '', category: '', difficulty: '', duration: '', schedule: '', price: '', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Add Class - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Add New Class</h1>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-muted mb-1">Class Name</label>
              <input name="className" required value={form.className} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Category</label>
              <select name="category" required value={form.category} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition">
                <option value="">Select</option>
                <option value="Yoga">Yoga</option>
                <option value="Cardio">Cardio</option>
                <option value="Weights">Weights</option>
                <option value="HIIT">HIIT</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Pilates">Pilates</option>
                <option value="Martial Arts">Martial Arts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Difficulty Level</label>
              <select name="difficulty" required value={form.difficulty} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition">
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Duration (min)</label>
              <input name="duration" type="number" required min="1" value={form.duration} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Price ($)</label>
              <input name="price" type="number" step="0.01" required min="0" value={form.price} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Class Schedule (Days & Time)</label>
            <input name="schedule" required value={form.schedule} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" placeholder="e.g. Mon, Wed, Fri 7:00 AM" />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Description</label>
            <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
          </div>
          <button disabled={loading} type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Class'}
          </button>
        </form>
      </div>
    </>
  );
}
