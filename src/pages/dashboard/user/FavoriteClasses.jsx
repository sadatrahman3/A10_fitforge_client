import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Heart, Trash2 } from 'lucide-react';
import api from '../../../utils/axios';

export default function FavoriteClasses() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/favorites/my').then((r) => setFavorites(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleRemove = async (classId) => {
    try {
      await api.delete(`/favorites/${classId}`);
      setFavorites(favorites.filter((f) => f.classId?._id !== classId));
      toast.success('Removed from favorites');
    } catch (err) { toast.error('Failed to remove'); }
  };

  return (
    <>
      <Helmet><title>Favorite Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Favorite Classes</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : favorites.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted">
            <Heart size={40} className="mx-auto mb-3 text-pink-400" />
            <p>No favorite classes yet.</p>
            <Link to="/classes" className="text-primary hover:underline mt-2 inline-block font-semibold">Browse Classes</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((fav) => fav.classId && (
              <div key={fav._id} className="bg-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {fav.classId.image ? <img src={fav.classId.image} alt="" className="w-full h-full object-cover" /> : <Heart size={20} className="text-pink-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/class/${fav.classId._id}`} className="text-light font-semibold hover:text-primary transition block truncate">{fav.classId.className}</Link>
                  <p className="text-muted text-sm">{fav.classId.trainerName} · ${fav.classId.price}</p>
                </div>
                <button onClick={() => handleRemove(fav.classId._id)} className="text-muted hover:text-red-400 transition p-2"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
