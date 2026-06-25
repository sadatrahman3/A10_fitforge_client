import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { User, Image, Save } from 'lucide-react';
import { getPhotoSrc } from '../../../utils/photoUrl';

const fallbackAvatar = 'https://i.ibb.co/MBtjqXQ/no-avatar.gif';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL === fallbackAvatar ? '' : user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const previewSrc = photoURL.startsWith('http') ? photoURL : user?.photoURL ? getPhotoSrc(user.photoURL) : fallbackAvatar;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Name is required');
    if (photoURL && !photoURL.startsWith('http')) return toast.error('Photo URL must be a valid https link');
    setLoading(true);
    try {
      await updateProfile({ name: name.trim(), photoURL: photoURL || fallbackAvatar });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Edit Profile - FitForge</title></Helmet>
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-light">Edit Profile</h1>

        <div className="bg-card rounded-2xl p-8">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={previewSrc}
              onError={(e) => { e.target.src = fallbackAvatar; }}
              alt=""
              className="w-20 h-20 rounded-full border-2 border-primary object-cover"
            />
            <div>
              <p className="text-light font-semibold text-lg">{user?.name}</p>
              <p className="text-muted text-sm">{user?.email}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold mt-1 inline-block capitalize">{user?.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-muted mb-1">Display Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-1">Photo URL (https link)</label>
              <div className="relative">
                <Image size={16} className="absolute left-3 top-3 text-muted" />
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full bg-dark border border-accent/30 rounded-lg pl-10 pr-4 py-3 text-light focus:border-primary outline-none transition"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <p className="text-xs text-muted mt-1">Paste a link to your profile photo (JPG, PNG, etc.)</p>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg text-white font-bold transition disabled:opacity-50"
            >
              <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
