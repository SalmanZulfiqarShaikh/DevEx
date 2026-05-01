import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoDark from '../assets/DevEx_dark.webp';
import logoLight from '../assets/DevEx_light.webp';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccess(true);
        // Navigate to reset password page after 2 seconds
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to send recovery email');
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
          <h1 className="text-2xl font-bold text-[var(--text-h)] mb-2 tracking-tight">Forgot Password?</h1>
          <p className="text-[var(--text)] text-[13px] leading-snug tracking-tight">Enter your email and we'll send you a recovery code.</p>
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
              Success! Check your email for the code.
            </div>
          )}

          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text)] mb-2 ml-1 opacity-70">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all placeholder:text-gray-600 shadow-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || success}
              className={`w-full bg-[var(--text-h)] text-[var(--bg)] py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl ${loading || success ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send Recovery Code'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center mt-6 text-[11px] text-[var(--text)]">
            Wait, I remember it! {' '}
            <Link to="/login" className="text-[var(--text-h)] font-bold hover:underline underline-offset-4 decoration-[var(--accent)] decoration-2 transition-all flex items-center justify-center gap-1 mt-2">
              <ArrowLeft size={12} /> Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
