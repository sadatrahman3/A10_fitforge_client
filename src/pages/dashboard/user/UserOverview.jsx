import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../context/AuthContext';
import { BookOpen, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../../utils/axios';

export default function UserOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ booked: 0, favorites: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/bookings/my'),
      api.get('/favorites/my'),
    ]).then(([bookingsRes, favsRes]) => {
      setStats({ booked: bookingsRes.data.length, favorites: favsRes.data.length });
    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet><title>Dashboard - FitForge</title></Helmet>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-light">Welcome, {user?.name}!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-primary/20 p-4 rounded-xl"><BookOpen size={28} className="text-primary" /></div>
            <div><p className="text-2xl font-bold text-light">{stats.booked}</p><p className="text-muted text-sm">Booked Classes</p></div>
          </div>
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-pink-500/20 p-4 rounded-xl"><Heart size={28} className="text-pink-400" /></div>
            <div><p className="text-2xl font-bold text-light">{stats.favorites}</p><p className="text-muted text-sm">Favorites</p></div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-lg font-bold text-light mb-4">Profile Details</h2>
          <div className="flex items-center gap-4">
            <img src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className="w-16 h-16 rounded-full border-2 border-primary" />
            <div>
              <p className="text-light font-semibold">{user?.name}</p>
              <p className="text-muted text-sm">{user?.email}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold mt-1 inline-block">User</span>
            </div>
          </div>
          {user?.trainerApplicationStatus && user.trainerApplicationStatus !== 'none' && (
            <div className="mt-4 p-4 bg-dark rounded-lg">
              <p className="text-sm text-muted">Trainer Application: <span className={`font-semibold ${user.trainerApplicationStatus === 'approved' ? 'text-green-400' : user.trainerApplicationStatus === 'rejected' ? 'text-red-400' : 'text-yellow-400'}`}>{user.trainerApplicationStatus}</span></p>
              {user.trainerApplicationStatus === 'rejected' && user.rejectionFeedback && <p className="text-xs text-muted mt-1">Feedback: {user.rejectionFeedback}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
