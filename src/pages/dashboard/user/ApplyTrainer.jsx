import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function ApplyTrainer() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ experience: '', specialty: '', availability: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Will connect to API later
      toast.success('Application submitted! Awaiting admin review.');
      updateUser({ ...user, trainerApplicationStatus: 'pending' });
    } catch (err) {
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Apply as Trainer - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Apply as Trainer</h1>
        {user?.trainerApplicationStatus === 'pending' && <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-yellow-400">Your application is pending review.</div>}
        {user?.trainerApplicationStatus === 'rejected' && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400">Your application was rejected. {user.rejectionFeedback && `Feedback: ${user.rejectionFeedback}`}</div>}
        {(!user?.trainerApplicationStatus || user?.trainerApplicationStatus === 'rejected') && (
          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 space-y-6 max-w-lg">
            <div>
              <label className="block text-sm text-muted mb-1">Experience (years)</label>
              <input type="number" required min="1" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Specialty</label>
              <select required value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition">
                <option value="">Select specialty</option>
                <option value="Yoga">Yoga</option>
                <option value="Weights">Weights</option>
                <option value="Cardio">Cardio</option>
                <option value="HIIT">HIIT</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Pilates">Pilates</option>
                <option value="Martial Arts">Martial Arts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Availability</label>
              <textarea required value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" placeholder="e.g. Mon-Fri 6AM-10AM" rows={3} />
            </div>
            <button disabled={loading} type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
