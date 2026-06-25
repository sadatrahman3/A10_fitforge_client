import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Dumbbell, Mail, Lock } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to FitForge!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Login - FitForge</title></Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-card rounded-2xl p-8 w-full max-w-md shadow-xl">
          <div className="text-center mb-8">
            <Dumbbell size={40} className="text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-light">Welcome Back</h1>
            <p className="text-muted text-sm mt-1">Sign in to your FitForge account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-muted mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-muted" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-muted" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" placeholder="••••••••" />
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-muted text-sm mt-6">
            New here? <Link to="/register" className="text-primary hover:underline font-semibold">Create Account</Link>
          </p>
        </div>
      </div>
    </>
  );
}
