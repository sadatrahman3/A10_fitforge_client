import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Users, Trophy, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../utils/axios';

export default function Home() {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [stats, setStats] = useState({ classes: 0, members: 0, trainers: 0, workouts: 0 });

  useEffect(() => {
    api.get('/classes/featured').then((r) => setFeaturedClasses(r.data)).catch(() => {});
    api.get('/forum/latest').then((r) => setLatestPosts(r.data)).catch(() => {});
    api.get('/admin/stats').then((r) => {
      setStats({ classes: r.data.totalClasses, members: r.data.totalUsers, trainers: 30, workouts: r.data.totalBookings });
    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet><title>FitForge - Build Your Strength</title></Helmet>

      <section className="relative bg-gradient-to-br from-secondary via-dark to-darker py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-light mb-6 leading-tight">
              Unleash Your <span className="text-primary">Inner Strength</span>
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Join expert-led fitness classes, track your progress, and connect with a community of passionate fitness enthusiasts.
            </p>
            <Link to="/classes" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-bold transition transform hover:scale-105 shadow-lg shadow-primary/30">
              Explore Classes <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Dumbbell className="text-primary" size={32} />, label: 'Classes', value: stats.classes + '+' },
            { icon: <Users className="text-accent" size={32} />, label: 'Active Members', value: stats.members + '+' },
            { icon: <Trophy className="text-yellow-400" size={32} />, label: 'Expert Trainers', value: stats.trainers + '+' },
            { icon: <Zap className="text-green-400" size={32} />, label: 'Workouts Done', value: stats.workouts + '+' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold text-light">{stat.value}</p>
              <p className="text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-light text-center mb-12">Featured Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredClasses.length > 0 ? featuredClasses.slice(0, 3).map((cls, i) => (
              <motion.div key={cls._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-primary/20 transition">
                <div className="h-48 bg-accent/20 flex items-center justify-center overflow-hidden">
                  {cls.image ? <img src={cls.image} alt={cls.className} className="w-full h-full object-cover" /> : <Dumbbell size={48} className="text-accent" />}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-light mb-1">{cls.className}</h3>
                  <p className="text-muted text-sm mb-2">{cls.trainerName} · {cls.duration} min · {cls.difficulty}</p>
                  <p className="text-muted text-xs mb-3">{cls.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">${cls.price}</span>
                    <span className="text-muted text-xs">{cls.bookingCount} bookings</span>
                  </div>
                  <Link to={`/class/${cls._id}`} className="block mt-4 text-center bg-primary/10 text-primary hover:bg-primary hover:text-white py-2 rounded-lg text-sm font-semibold transition">Details</Link>
                </div>
              </motion.div>
            )) : [1,2,3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-accent/10"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-accent/10 rounded w-3/4"></div>
                  <div className="h-4 bg-accent/10 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/classes" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-semibold transition">
              View All Classes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-light text-center mb-12">Why Choose FitForge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Trainers', desc: 'Learn from certified professionals who tailor workouts to your goals.', icon: <Users className="text-primary" size={28} /> },
              { title: 'Flexible Scheduling', desc: 'Book classes that fit your schedule. Morning, evening, or weekend.', icon: <Zap className="text-accent" size={28} /> },
              { title: 'Community Driven', desc: 'Join our forum, share tips, and stay motivated with fellow fitness lovers.', icon: <Trophy className="text-yellow-400" size={28} /> },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-card rounded-2xl p-8 text-center hover:bg-card-hover transition">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-light mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-light text-center mb-12">Latest from Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? latestPosts.slice(0, 3).map((post) => (
              <div key={post._id} className="bg-card rounded-2xl p-6 hover:bg-card-hover transition">
                <div className="h-40 rounded-xl mb-4 overflow-hidden bg-accent/10">
                  {post.image ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted text-sm">No Image</div>}
                </div>
                <h3 className="text-lg font-bold text-light mb-2 line-clamp-1">{post.title}</h3>
                <p className="text-muted text-sm mb-4 line-clamp-2">{post.description}</p>
                <Link to={`/forum/${post._id}`} className="text-primary text-sm font-semibold hover:underline">Read More →</Link>
              </div>
            )) : [1,2,3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-accent/10 rounded-xl mb-4"></div>
                <div className="h-5 bg-accent/10 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-accent/10 rounded w-full"></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/forum" className="inline-flex items-center gap-2 border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-xl font-semibold transition">
              Visit Forum <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
