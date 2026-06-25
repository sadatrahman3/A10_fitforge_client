import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../../utils/axios';

export default function BookedClasses() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my').then((r) => setBookings(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Booked Classes - FitForge</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-light">Booked Classes</h1>
        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted animate-pulse">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted">
            <p>No booked classes yet.</p>
            <Link to="/classes" className="text-primary hover:underline mt-2 inline-block font-semibold">Browse Classes</Link>
          </div>
        ) : (
          <div className="bg-card rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-darker"><tr className="text-muted text-sm"><th className="p-4">Class</th><th className="p-4">Trainer</th><th className="p-4">Price</th><th className="p-4">Date</th></tr></thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-t border-accent/10">
                    <td className="p-4 text-light font-semibold">{b.className}</td>
                    <td className="p-4 text-muted">{b.trainerName}</td>
                    <td className="p-4 text-primary font-bold">${b.price}</td>
                    <td className="p-4 text-muted text-sm">{new Date(b.paymentDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
