import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImageUp } from 'lucide-react';

export default function ImageUploadField({ value, onChange, label = 'Image (Imgbb)' }) {
  const [uploading, setUploading] = useState(false);
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!apiKey) {
      toast.error('Set VITE_IMGBB_API_KEY to upload images.');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data?.data?.url) throw new Error(data?.error?.message || 'Image upload failed');
      onChange(data.data.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted mb-1">{label}</label>
      <label className="flex items-center justify-center gap-2 border border-dashed border-accent/40 bg-dark hover:border-primary rounded-lg px-4 py-3 text-muted cursor-pointer transition">
        <ImageUp size={18} />
        <span>{uploading ? 'Uploading image...' : 'Upload image'}</span>
        <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-dark border border-accent/30 rounded-lg px-4 py-3 text-light focus:border-primary outline-none transition"
        placeholder="Or paste an Imgbb image URL"
      />
      {value && <img src={value} alt="" className="h-24 w-full rounded-lg object-cover border border-accent/20" />}
    </div>
  );
}
