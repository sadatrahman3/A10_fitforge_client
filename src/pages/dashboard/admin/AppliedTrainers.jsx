import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/axios';

export default function AppliedTrainers() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    api.get('/trainers/applications').then((r) => setApplications(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/trainers/approve/${id}`);
      setApplications(applications.filter((a) => a._id !== id));
      setSelectedApp(null);
      toast.success('Trainer approved!');
    } catch (err) { toast.error('Failed'); }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/trainers/reject/${id}`, { feedback });
      setApplications(applications.filter((a) => a._id !== id));
      setSelectedApp(null);
      setFeedback('');
      toast.success('Application rejected');
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <>
      <Helmet><title>Applied Trainers - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Trainer Applications</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted"><p>No pending applications.</p></div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-darker"><tr className="text-muted"><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Experience</th><th className="p-4">Specialty</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{a.name}</td>
                    <td className="p-4 text-muted">{a.email}</td>
                    <td className="p-4 text-muted">{a.trainerDetails?.experience} years</td>
                    <td className="p-4 text-muted">{a.trainerDetails?.specialty}</td>
                    <td className="p-4"><button onClick={() => setSelectedApp(a)} className="bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 rounded text-xs font-semibold transition">Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedApp && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedApp(null)}>
            <div className="bg-card rounded-2xl p-8 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-light">Applicant Details</h2>
              <div className="space-y-2 text-sm">
                <p className="text-muted">Name: <span className="text-light">{selectedApp.name}</span></p>
                <p className="text-muted">Email: <span className="text-light">{selectedApp.email}</span></p>
                <p className="text-muted">Experience: <span className="text-light">{selectedApp.trainerDetails?.experience} years</span></p>
                <p className="text-muted">Specialty: <span className="text-light">{selectedApp.trainerDetails?.specialty}</span></p>
                <p className="text-muted">Availability: <span className="text-light">{selectedApp.trainerDetails?.availability}</span></p>
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Feedback (for rejection)</label>
                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition" rows={3} placeholder="Optional feedback..." />
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleApprove(selectedApp._id)} className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-lg text-white font-semibold transition">Approve</button>
                <button onClick={() => handleReject(selectedApp._id)} className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white font-semibold transition">Reject</button>
                <button onClick={() => setSelectedApp(null)} className="flex-1 bg-dark hover:bg-darker py-2 rounded-lg text-muted font-semibold transition">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
