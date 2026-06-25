import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../ui/Loading';

export default function TrainerRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || (user.role !== 'trainer' && user.role !== 'admin')) return <Navigate to="/dashboard" replace />;

  return children;
}
