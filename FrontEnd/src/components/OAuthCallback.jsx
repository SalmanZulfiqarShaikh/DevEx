import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// This page handles the Google OAuth redirect.
// Backend sends: /auth/callback?token=JWT&user=JSON&role=buyer|seller
const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userRaw = searchParams.get('user');
    const role = searchParams.get('role');

    if (token && userRaw && role) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));

        // Store in localStorage exactly like normal login
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);

        // Redirect to the right dashboard
        if (role === 'seller') {
          navigate('/dashboard/seller', { replace: true });
        } else {
          navigate('/dashboard/buyer', { replace: true });
        }
      } catch (e) {
        console.error('OAuth callback parse error:', e);
        navigate('/login', { replace: true });
      }
    } else {
      // Missing params — go to login
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Signing you in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
