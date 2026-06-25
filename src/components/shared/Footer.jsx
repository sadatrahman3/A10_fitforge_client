import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-darker text-muted pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
            <Dumbbell size={28} />
            <span>FitForge</span>
          </Link>
          <p className="text-sm leading-relaxed">Your ultimate fitness platform. Build strength, join classes, and connect with a community of fitness enthusiasts.</p>
        </div>

        <div>
          <h3 className="text-light font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/classes" className="hover:text-primary transition">All Classes</Link></li>
            <li><Link to="/forum" className="hover:text-primary transition">Community Forum</Link></li>
            <li><Link to="/login" className="hover:text-primary transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary transition">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-light font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={14} /> support@fitforge.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> 123 Fitness Ave, Gym City</li>
          </ul>
        </div>

        <div>
          <h3 className="text-light font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-primary transition"><FaXTwitter size={20} /></a>
            <a href="#" className="hover:text-primary transition"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-primary transition"><FaYoutube size={20} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-accent/20 text-center text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} FitForge. All rights reserved.</p>
      </div>
    </footer>
  );
}
