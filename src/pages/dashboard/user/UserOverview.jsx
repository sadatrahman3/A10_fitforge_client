import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../context/AuthContext';
import { BookOpen, Heart } from 'lucide-react';

export default function UserOverview() {
  const { user } = useAuth();
  return (
    <>
      <Helmet><title>Dashboard - FitForge</title></Helmet>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-light">Welcome, {user?.name}!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-primary/20 p-4 rounded-xl"><BookOpen size={28} className="text-primary" /></div>
            <div><p className="text-2xl font-bold text-light">0</p><p className="text-muted text-sm">Booked Classes</p></div>
          </div>
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-pink-500/20 p-4 rounded-xl"><Heart size={28} className="text-pink-400" /></div>
            <div><p className="text-2xl font-bold text-light">0</p><p className="text-muted text-sm">Favorites</p></div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-lg font-bold text-light mb-4">Profile Details</h2>
          <div className="flex items-center gap-4 mb-4">
            <img src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className="w-16 h-16 rounded-full border-2 border-primary" />
            <div>
              <p className="text-light font-semibold">{user?.name}</p>
              <p className="text-muted text-sm">{user?.email}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold mt-1 inline-block">User</span>
            </div>
          </div>
          {user?.trainerApplicationStatus && (
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
