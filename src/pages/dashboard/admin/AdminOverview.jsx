import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../context/AuthContext';
import { Users, Dumbbell, BookOpen } from 'lucide-react';

export default function AdminOverview() {
  const { user } = useAuth();
  return (
    <>
      <Helmet><title>Admin Dashboard - FitForge</title></Helmet>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-light">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-accent/20 p-4 rounded-xl"><Users size={28} className="text-accent" /></div>
            <div><p className="text-2xl font-bold text-light">0</p><p className="text-muted text-sm">Total Users</p></div>
          </div>
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-primary/20 p-4 rounded-xl"><Dumbbell size={28} className="text-primary" /></div>
            <div><p className="text-2xl font-bold text-light">0</p><p className="text-muted text-sm">Total Classes</p></div>
          </div>
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-xl"><BookOpen size={28} className="text-green-400" /></div>
            <div><p className="text-2xl font-bold text-light">0</p><p className="text-muted text-sm">Total Bookings</p></div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-lg font-bold text-light mb-4">Admin Profile</h2>
          <div className="flex items-center gap-4">
            <img src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className="w-16 h-16 rounded-full border-2 border-primary" />
            <div>
              <p className="text-light font-semibold">{user?.name}</p>
              <p className="text-muted text-sm">{user?.email}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold mt-1 inline-block">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
