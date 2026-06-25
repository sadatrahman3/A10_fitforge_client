import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'hover:text-primary transition'}>Home</NavLink>
      <NavLink to="/classes" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'hover:text-primary transition'}>All Classes</NavLink>
      <NavLink to="/forum" className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'hover:text-primary transition'}>Community Forum</NavLink>
    </>
  );

  const dashboardLink = () => {
    if (!user) return null;
    const role = user.role;
    if (role === 'admin') return '/dashboard/admin';
    if (role === 'trainer') return '/dashboard/trainer';
    return '/dashboard';
  };

  return (
    <nav className="bg-secondary/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Dumbbell size={28} />
            <span>FitForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-light">
            {navLinks}
            {user && (
              <NavLink to={dashboardLink()} className={({ isActive }) => isActive ? 'text-primary font-semibold' : 'hover:text-primary transition'}>
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className="w-9 h-9 rounded-full border-2 border-primary" />
                <button onClick={logout} className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg text-sm font-semibold transition">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg text-sm font-semibold transition">
                Login
              </Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-light">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t border-accent/20 px-4 pb-4 space-y-3 text-sm text-light">
          {navLinks}
          {user && <NavLink to={dashboardLink()} onClick={() => setMobileOpen(false)}>Dashboard</NavLink>}
          {user ? (
            <div className="flex items-center gap-3 pt-2">
              <img src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} alt="" className="w-8 h-8 rounded-full" />
              <button onClick={() => { logout(); setMobileOpen(false); }} className="bg-primary px-4 py-2 rounded-lg text-sm font-semibold">Logout</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block bg-primary px-4 py-2 rounded-lg text-sm font-semibold text-center">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
