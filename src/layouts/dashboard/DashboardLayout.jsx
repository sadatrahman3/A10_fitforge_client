import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, BookOpen, Heart, Award, Dumbbell, Users, UserCheck, CreditCard, FileText, PlusCircle, List, Menu, X, UserCog } from 'lucide-react';
import { useState } from 'react';
import { getPhotoSrc } from '../../utils/photoUrl';

export default function DashboardLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = user?.role || 'user';

  const userLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Overview', end: true },
    { to: '/dashboard/booked-classes', icon: <BookOpen size={18} />, label: 'Booked Classes' },
    { to: '/dashboard/favorites', icon: <Heart size={18} />, label: 'Favorites' },
    { to: '/dashboard/apply-trainer', icon: <Award size={18} />, label: 'Apply as Trainer' },
    { to: '/dashboard/profile', icon: <UserCog size={18} />, label: 'Edit Profile' },
  ];

  const trainerLinks = [
    { to: '/dashboard/trainer', icon: <LayoutDashboard size={18} />, label: 'Trainer Overview', end: true },
    { to: '/dashboard/trainer/add-class', icon: <PlusCircle size={18} />, label: 'Add Class' },
    { to: '/dashboard/trainer/my-classes', icon: <List size={18} />, label: 'My Classes' },
    { to: '/dashboard/trainer/add-post', icon: <FileText size={18} />, label: 'Add Forum Post' },
    { to: '/dashboard/trainer/my-posts', icon: <FileText size={18} />, label: 'My Forum Posts' },
    { to: '/dashboard/profile', icon: <UserCog size={18} />, label: 'Edit Profile' },
  ];

  const adminLinks = [
    { to: '/dashboard/admin', icon: <LayoutDashboard size={18} />, label: 'Admin Overview', end: true },
    { to: '/dashboard/admin/manage-users', icon: <Users size={18} />, label: 'Manage Users' },
    { to: '/dashboard/admin/applied-trainers', icon: <Award size={18} />, label: 'Applied Trainers' },
    { to: '/dashboard/admin/manage-trainers', icon: <UserCheck size={18} />, label: 'Manage Trainers' },
    { to: '/dashboard/admin/manage-classes', icon: <Dumbbell size={18} />, label: 'Manage Classes' },
    { to: '/dashboard/admin/add-post', icon: <FileText size={18} />, label: 'Add Forum Post' },
    { to: '/dashboard/admin/transactions', icon: <CreditCard size={18} />, label: 'Transactions' },
    { to: '/dashboard/admin/forum-manage', icon: <FileText size={18} />, label: 'Forum Management' },
    { to: '/dashboard/profile', icon: <UserCog size={18} />, label: 'Edit Profile' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'trainer' ? trainerLinks : userLinks;
  if (role === 'user') links.push(...trainerLinks.slice(0, 1));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-accent/20">
        <div className="flex items-center gap-3">
          <img src={getPhotoSrc(user?.photoURL) || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} onError={(e) => { e.target.src = 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'; }} alt="" className="w-12 h-12 rounded-full border-2 border-primary" />
          <div>
            <p className="text-light font-semibold text-sm truncate">{user?.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${role === 'admin' ? 'bg-red-500/20 text-red-400' : role === 'trainer' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-accent/20 text-accent'}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${isActive ? 'bg-primary text-white' : 'text-muted hover:bg-card hover:text-light'}`}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-20 left-4 z-50 bg-secondary p-2 rounded-lg text-light">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-darker border-r border-accent/20 transform transition-transform z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <SidebarContent />
      </aside>

      <main className="flex-1 bg-dark p-6 lg:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
