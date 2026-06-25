import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { CreditCard, Dumbbell, CheckCircle } from 'lucide-react';
import api from '../../utils/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    api.get(`/classes/${id}`).then((r) => { setCls(r.data); setLoading(false); }).catch(() => { setLoading(false); toast.error('Class not found'); });
  }, [id]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const res = await api.post('/payments/create-checkout-session', {
        classId: id,
        className: cls.className,
        price: cls.price,
        trainerName: cls.trainerName,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        await api.post('/payments/confirm', {
          sessionId: `sim_${Date.now()}`,
          classId: id,
          className: cls.className,
          trainerName: cls.trainerName,
          price: cls.price,
        });
        await api.post('/bookings', { classId: id, transactionId: `sim_${Date.now()}` });
        toast.success('Payment successful! Class booked.');
        navigate('/dashboard/booked-classes');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Dumbbell size={40} className="text-primary animate-bounce" /></div>;
  if (!cls) return <div className="min-h-[60vh] flex items-center justify-center text-muted">Class not found</div>;

  return (
    <>
      <Helmet><title>Payment - FitForge</title></Helmet>
      <div className="min-h-[60vh] max-w-lg mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <CreditCard size={40} className="text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-light">Complete Payment</h1>
            <p className="text-muted text-sm mt-1">Secure checkout powered by Stripe</p>
          </div>

          <div className="bg-dark rounded-xl p-6 mb-6 space-y-4">
            <div className="flex justify-between"><span className="text-muted">Class</span><span className="text-light font-semibold">{cls.className}</span></div>
            <div className="flex justify-between"><span className="text-muted">Trainer</span><span className="text-light">{cls.trainerName}</span></div>
            <div className="flex justify-between"><span className="text-muted">Duration</span><span className="text-light">{cls.duration} min</span></div>
            <div className="flex justify-between"><span className="text-muted">Schedule</span><span className="text-light">{cls.schedule}</span></div>
            <div className="border-t border-accent/20 pt-4 flex justify-between">
              <span className="text-light font-semibold">Total</span>
              <span className="text-primary font-bold text-xl">${cls.price}</span>
            </div>
          </div>

          <button onClick={handlePayment} disabled={processing} className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
            {processing ? (
              <>Processing...</>
            ) : (
              <><CheckCircle size={20} /> Pay ${cls.price}</>
            )}
          </button>
          <p className="text-center text-muted text-xs mt-4">You will be redirected to Stripe for secure payment</p>
        </div>
      </div>
    </>
  );
}
