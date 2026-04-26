import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });
  const [role, setRole] = React.useState('buyer');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await signup({ ...formData, role });
      if (result.success) {
        navigate(`/dashboard/${result.role}`);
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result && result.success) {
        navigate(`/dashboard/${result.role}`);
      }
    } catch (err) {
      setError('Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow opacity-50 pointer-events-none"></div>

      <motion.div 
        {...fadeInUp}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center border border-[var(--border)] group hover:border-[var(--accent)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--text-h)] mb-2">Join DevEx</h1>
          <p className="text-[var(--text)]">The premier marketplace for SaaS assets</p>
        </div>

        <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] glass-effect shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}
          {/* Role Selector */}
          <div className="flex p-1 bg-[var(--bg)] border border-[var(--border)] rounded-2xl mb-8 relative">
            <motion.div 
              className="absolute inset-1 bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl z-0"
              animate={{ x: role === 'buyer' ? '0%' : '100%' }}
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: 'calc(50% - 4px)' }}
            />
            <button 
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest relative z-10 transition-colors ${role === 'buyer' ? 'text-[var(--accent)]' : 'text-gray-500'}`}
            >
              Buyer
            </button>
            <button 
              type="button"
              onClick={() => setRole('seller')}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest relative z-10 transition-colors ${role === 'seller' ? 'text-[var(--accent)]' : 'text-gray-500'}`}
            >
              Seller
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text)] mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text)] mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text)] mb-2 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-[var(--accent)] text-[var(--bg)] py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5 mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[var(--bg)] px-4 text-gray-600 font-bold">Or sign up with</span></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border border-[var(--border)] text-[var(--text-h)] py-3.5 rounded-xl text-sm font-bold hover:bg-[var(--accent-bg)] transition-all flex items-center justify-center gap-3 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-[var(--text)]">
          Already have an account? {' '}
          <Link to="/login" className="text-[var(--accent)] font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
