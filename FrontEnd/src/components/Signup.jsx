import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import aboutImage from '../assets/about-visual.png';
import logoDark from '../assets/DevEx_dark.webp';
import logoLight from '../assets/DevEx_light.webp';

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
        navigate('/verify-otp', { state: { email: formData.email } });
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
    <div className="flex h-screen w-full bg-[var(--bg)] text-[var(--text)] overflow-hidden relative">
      
      {/* Left Panel - Form/Scrollable area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 relative z-10 h-full overflow-y-auto">
        <motion.div 
          {...fadeInUp}
          className="w-full max-w-[360px]"
        >
          {/* Logo */}
          <div className="mb-5 w-full relative">
            <Link to="/" className="inline-block relative z-20">
              <img src={logoDark} className="theme-logo-dark h-8 w-auto object-contain" alt="DevEx" />
              <img src={logoLight} className="theme-logo-light h-8 w-auto object-contain" alt="DevEx" />
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--text-h)] mb-1 tracking-tight">Create Account</h1>
            <p className="text-[var(--text)] mb-4 text-[13px] leading-snug tracking-tight">Join the marketplace. Register as a buyer or seller.</p>
          </div>

          <div className="bg-[var(--bg)]">
            {error && (
              <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}
            
            {/* Role Switcher */}
            <div className="flex p-1 bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl mb-4 relative">
              <motion.div 
                className="absolute inset-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-sm z-0"
                animate={{ x: role === 'buyer' ? '0%' : '100%' }}
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ width: 'calc(50% - 4px)' }}
              />
              <button 
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-widest relative z-10 transition-colors ${role === 'buyer' ? 'text-[var(--text-h)]' : 'text-[var(--text)] opacity-70 hover:opacity-100'}`}
              >
                Join as Buyer
              </button>
              <button 
                type="button"
                onClick={() => setRole('seller')}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-widest relative z-10 transition-colors ${role === 'seller' ? 'text-[var(--text-h)]' : 'text-[var(--text)] opacity-70 hover:opacity-100'}`}
              >
                Join as Seller
              </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text)] mb-1 ml-1 opacity-70">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-2 pl-10 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all placeholder:text-gray-600 shadow-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text)] mb-1 ml-1 opacity-70">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-2 pl-10 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all placeholder:text-gray-600 shadow-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text)] mb-1 ml-1 opacity-70">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-2 pl-10 pr-4 text-sm text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all placeholder:text-gray-600 shadow-sm"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full bg-[var(--text-h)] text-[var(--bg)] py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl mt-1 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[var(--bg)] px-4 text-gray-500 font-bold">Or sign up with</span></div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--accent-bg)] transition-all flex items-center justify-center gap-3 group shadow-sm"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>

          <p className="text-center mt-5 text-[11px] text-[var(--text)]">
            Already have an account? {' '}
            <Link to="/login" className="text-[var(--text-h)] font-bold hover:underline underline-offset-4 decoration-[var(--accent)] decoration-2 transition-all">Log in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Visual representation (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--accent-bg)] items-center justify-center p-12 overflow-hidden border-l border-[var(--border)]">
        
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 bg-grid-[var(--border)]/[0.05] bg-[length:32px_32px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-glow opacity-30 mix-blend-screen pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[420px]"
        >
          {/* Glass Card */}
          <div className="w-full aspect-[4/5] max-h-[75vh] rounded-3xl overflow-hidden border border-[var(--border)] glass-effect relative shadow-2xl group flex flex-col justify-end">
            <img 
              src={aboutImage} 
              alt="DevEx Marketplace Visualization" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-70"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/90 via-[var(--bg)]/40 to-transparent"></div>
            
            {/* Content properly positioned at bottom */}
            <div className="relative w-full p-8 z-20">
              <span className="inline-block px-3 py-1 bg-[var(--accent)] text-[var(--bg)] text-[10px] uppercase font-bold tracking-widest rounded-full mb-4">
                Rapid Onboarding
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--text-h)] leading-tight tracking-tight mb-3">
                Sell software, not just code.
              </h2>
              <p className="text-[var(--text)] text-sm leading-relaxed max-w-sm">
                Unlock liquidity for your Micro-SaaS. Gain instant access to a network of active buyers upon registration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Signup;
