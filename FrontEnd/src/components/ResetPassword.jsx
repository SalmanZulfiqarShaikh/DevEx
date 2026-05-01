import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Lock, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoDark from '../assets/DevEx_dark.webp';
import logoLight from '../assets/DevEx_light.webp';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await resetPassword({ email, otp, newPassword });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="flex h-screen w-full bg-[var(--bg)] text-[var(--text)] overflow-hidden items-center justify-center p-4">
      <motion.div 
        {...fadeInUp}
        className="w-full max-w-[360px]"
      >
        <div className="mb-8 w-full flex justify-center">
          <Link to="/" className="inline-block relative z-20">
            <img src={logoDark} className="theme-logo-dark h-8 w-auto object-contain" alt="DevEx" />
            <img src={logoLight} className="theme-logo-light h-8 w-auto object-contain" alt="DevEx" />
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-h)] mb-2 tracking-tight">Reset Password</h1>
          <p className="text-[var(--text)] text-[13px] leading-snug tracking-tight">
            Check your email for the code sent to <br/>
            <span className="font-bold text-[var(--text-h)]">{email}</span>
          </p>
        </div>

        <div className="bg-[var(--bg)]">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Password reset successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text)] mb-2 ml-1 opacity-70">6-Digit Code</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-center text-xl tracking-[0.5em] font-mono text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all placeholder:text-gray-600 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text)] mb-2 ml-1 opacity-70">New Password</label>
              <div className="relative group">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all placeholder:text-gray-600 shadow-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || success || otp.length !== 6 || newPassword.length < 6}
              className={`w-full bg-[var(--text-h)] text-[var(--bg)] py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl ${loading || success || otp.length !== 6 || newPassword.length < 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
