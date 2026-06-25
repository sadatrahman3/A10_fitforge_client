import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Filter, Dumbbell } from 'lucide-react';
import api from '../../utils/axios';

const CATEGORIES = ['All', 'Yoga', 'Cardio', 'Weights', 'HIIT', 'CrossFit', 'Pilates', 'Martial Arts'];

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      const res = await api.get('/classes', { params });
      setClasses(res.data.classes);
      setTotalPages(res.data.totalPages);
    } catch {
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClasses(); }, [page, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchClasses();
  };

  return (
    <>
      <Helmet><title>All Classes - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-light mb-8">All Fitness Classes</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-muted" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search classes by name..." className="w-full bg-card border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition" />
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg text-white font-semibold transition">Search</button>
          </form>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted" />
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="bg-card border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-accent/10"></div>
                <div className="p-6 space-y-3"><div className="h-5 bg-accent/10 rounded w-3/4"></div><div className="h-4 bg-accent/10 rounded w-1/2"></div></div>
              </div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-20"><Dumbbell size={48} className="text-muted mx-auto mb-4" /><p className="text-muted text-lg">No classes found matching your criteria.</p></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div key={cls._id} className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-primary/20 transition">
                  <div className="h-48 bg-accent/10 flex items-center justify-center overflow-hidden">
                    {cls.image ? <img src={cls.image} alt={cls.className} className="w-full h-full object-cover" /> : <Dumbbell size={48} className="text-accent" />}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-light mb-1">{cls.className}</h3>
                    <p className="text-muted text-sm mb-1">Trainer: {cls.trainerName}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{cls.category}</span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{cls.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-primary font-bold">${cls.price}</span>
                      <span className="text-muted">{cls.duration} min · {cls.bookingCount} booked</span>
                    </div>
                    <Link to={`/class/${cls._id}`} className="block text-center bg-primary/10 text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition">View Details</Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-card text-muted hover:text-light rounded-lg transition disabled:opacity-30">Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`px-4 py-2 rounded-lg transition ${p === page ? 'bg-primary text-white' : 'bg-card text-muted hover:text-light'}`}>{p}</button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-card text-muted hover:text-light rounded-lg transition disabled:opacity-30">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
