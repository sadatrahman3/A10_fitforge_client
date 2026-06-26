import { useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const GOOGLE_SCRIPT_ID = 'google-identity-services';

export default function GoogleSignInButton({ onSuccess }) {
  const buttonRef = useRef(null);
  const { googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;

    const handleCredential = async (response) => {
      if (!response.credential) return;
      setLoading(true);
      try {
        await googleLogin(response.credential);
        onSuccess?.();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Google login failed');
      } finally {
        setLoading(false);
      }
    };

    const renderGoogleButton = () => {
      if (!window.google || !buttonRef.current) return;
      buttonRef.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: Math.min(buttonRef.current.offsetWidth || 360, 400),
      });
    };

    if (window.google) {
      renderGoogleButton();
      return;
    }

    let script = document.getElementById(GOOGLE_SCRIPT_ID);
    if (!script) {
      script = document.createElement('script');
      script.id = GOOGLE_SCRIPT_ID;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', renderGoogleButton);

    return () => script.removeEventListener('load', renderGoogleButton);
  }, [clientId, googleLogin, onSuccess]);

  if (!clientId) {
    return (
      <button
        type="button"
        onClick={() => toast.info('Google login needs VITE_GOOGLE_CLIENT_ID in Vercel and GOOGLE_CLIENT_ID in Render.')}
        className="w-full bg-dark border border-accent/30 hover:border-primary text-light py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>
    );
  }

  return (
    <div className="relative">
      {loading && <div className="absolute inset-0 z-10 bg-card/70 rounded-lg flex items-center justify-center text-sm text-muted">Signing in...</div>}
      <div ref={buttonRef} className="flex justify-center min-h-11" />
    </div>
  );
}
