import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 - FitForge</title></Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <AlertTriangle size={80} className="text-primary mx-auto mb-6" />
          <h1 className="text-6xl font-extrabold text-light mb-4">404</h1>
          <p className="text-muted text-lg mb-8">Oops! The page you are looking for does not exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition">
            <Home size={18} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}
