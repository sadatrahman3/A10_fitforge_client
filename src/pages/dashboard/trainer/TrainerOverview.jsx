import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../context/AuthContext';
import { Dumbbell, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../../utils/axios';

export default function TrainerOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ classes: 0, students: 0 });

  useEffect(() => {
    api.get('/admin/classes').then((r) => {
      const myClasses = r.data.filter((c) => c.trainerId === user?.id);
      const totalStudents = myClasses.reduce((sum, c) => sum + (c.bookingCount || 0), 0);
      setStats({ classes: myClasses.length, students: totalStudents });
    }).catch(() => {});
  }, [user]);

  return (
    <>
      <Helmet><title>Trainer Dashboard - FitForge</title></Helmet>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-light">Trainer Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-primary/20 p-4 rounded-xl"><Dumbbell size={28} className="text-primary" /></div>
            <div><p className="text-2xl font-bold text-light">{stats.classes}</p><p className="text-muted text-sm">Classes Created</p></div>
          </div>
          <div className="bg-card rounded-xl p-6 flex items-center gap-4">
            <div className="bg-accent/20 p-4 rounded-xl"><Users size={28} className="text-accent" /></div>
            <div><p className="text-2xl font-bold text-light">{stats.students}</p><p className="text-muted text-sm">Students Enrolled</p></div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-lg font-bold text-light mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <img src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className="w-16 h-16 rounded-full border-2 border-primary" />
            <div>
              <p className="text-light font-semibold">{user?.name}</p>
              <p className="text-muted text-sm">{user?.email}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold mt-1 inline-block">Trainer</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
