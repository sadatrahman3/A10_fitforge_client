import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Dumbbell, Clock, User, Calendar, Tag, Heart, ArrowLeft } from 'lucide-react';
import api from '../../utils/axios';

export default function ClassDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    api.get(`/classes/${id}`).then((r) => { setCls(r.data); setLoading(false); }).catch(() => { setLoading(false); toast.error('Class not found'); });
    if (user) {
      api.get(`/bookings/check/${id}`).then((r) => setAlreadyBooked(r.data.booked)).catch(() => {});
      api.get(`/favorites/check/${id}`).then((r) => setIsFavorite(r.data.favorited)).catch(() => {});
    }
  }, [id, user]);

  const handleBookNow = () => {
    if (!user) { toast.error('Please login to book'); return navigate('/login'); }
    if (user.status === 'blocked') return toast.error('Action restricted by Admin');
    if (alreadyBooked) return toast.error('You have already booked this class');
    navigate(`/payment/${id}`);
  };

  const handleFavorite = async () => {
    if (!user) return toast.error('Please login to add favorites');
    setFavLoading(true);
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await api.post('/favorites', { classId: id });
        setIsFavorite(true);
        toast.success('Added to favorites!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Dumbbell size={40} className="text-primary animate-bounce" /></div>;
  if (!cls) return <div className="min-h-[60vh] flex items-center justify-center text-muted">Class not found</div>;

  return (
    <>
      <Helmet><title>{cls.className} - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-5xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted hover:text-light mb-6 transition"><ArrowLeft size={18} /> Back</button>
        <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
          <div className="h-64 md:h-80 bg-accent/10 flex items-center justify-center overflow-hidden">
            {cls.image ? <img src={cls.image} alt={cls.className} className="w-full h-full object-cover" /> : <Dumbbell size={64} className="text-accent" />}
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{cls.category}</span>
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold">{cls.difficulty}</span>
              <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-semibold">{cls.status}</span>
            </div>
            <h1 className="text-3xl font-bold text-light mb-4">{cls.className}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted"><User size={16} /> Trainer: <span className="text-light font-semibold">{cls.trainerName}</span></div>
              <div className="flex items-center gap-2 text-muted"><Clock size={16} /> Duration: <span className="text-light font-semibold">{cls.duration} min</span></div>
              <div className="flex items-center gap-2 text-muted"><Calendar size={16} /> Schedule: <span className="text-light font-semibold">{cls.schedule}</span></div>
              <div className="flex items-center gap-2 text-muted"><Tag size={16} /> Price: <span className="text-primary font-bold text-lg">${cls.price}</span></div>
            </div>
            <p className="text-muted leading-relaxed mb-8">{cls.description}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleBookNow} disabled={alreadyBooked} className={`flex-1 py-3 rounded-xl font-bold text-lg transition ${alreadyBooked ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark text-white'}`}>
                {alreadyBooked ? 'Already Booked' : 'Book Now'}
              </button>
              <button onClick={handleFavorite} disabled={favLoading} className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${isFavorite ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-card border border-accent/30 text-muted hover:text-light hover:border-primary'}`}>
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'Saved' : 'Favorite'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
