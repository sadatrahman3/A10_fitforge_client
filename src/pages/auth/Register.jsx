import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Dumbbell, Mail, Lock, User, Image } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', photoURL: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return false; }
    if (!/[A-Z]/.test(form.password)) { toast.error('Password must contain an uppercase letter'); return false; }
    if (!/[a-z]/.test(form.password)) { toast.error('Password must contain a lowercase letter'); return false; }
    if (form.photoURL && !form.photoURL.startsWith('http')) { toast.error('Photo URL must be a valid https link'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.photoURL);
      toast.success('Account created! Welcome to FitForge!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <Helmet><title>Register - FitForge</title></Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-card rounded-2xl p-8 w-full max-w-md shadow-xl">
          <div className="text-center mb-8">
            <Dumbbell size={40} className="text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-light">Join FitForge</h1>
            <p className="text-muted text-sm mt-1">Create your free account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-muted mb-1">Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-muted" />
                <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" placeholder="Your Name" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-muted" />
                <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Photo URL (optional)</label>
              <div className="relative">
                <Image size={16} className="absolute left-3 top-3 text-muted" />
                <input type="text" name="photoURL" value={form.photoURL} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-muted" />
                <input type="password" name="password" required value={form.password} onChange={handleChange} className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" placeholder="Min 6 chars, upper + lower" />
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition disabled:opacity-50">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-muted text-sm mt-6">
            Already a member? <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
}
