import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowRight, Lock } from 'lucide-react';
import logoDark from '../assets/DevEx_dark.webp';
import logoLight from '../assets/DevEx_light.webp';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ email, password });
      if (result && result.success && result.role === 'admin') {
        toast.success('Admin Authenticated Successfully');
        navigate('/dashboard/admin');
      } else {
        toast.error('Access Denied. Admins only.');
      }
    } catch (err) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#0D0D0D]/80 backdrop-blur-xl border border-gray-500/10 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6">
            <img src={logoDark} className="theme-logo-dark h-12 w-auto object-contain" alt="DevEx" />
            <img src={logoLight} className="theme-logo-light h-12 w-auto object-contain" alt="DevEx" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-h)] tracking-tight">Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">Secure Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Admin Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="admin@devex.pk"
              className="w-full bg-[var(--bg)] border border-gray-500/20 text-[var(--text-h)] px-4 py-3.5 rounded-xl focus:outline-none focus:border-[var(--accent)]/50 transition-colors text-sm font-medium" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              className="w-full bg-[var(--bg)] border border-gray-500/20 text-[var(--text-h)] px-4 py-3.5 rounded-xl focus:outline-none focus:border-[var(--accent)]/50 transition-colors text-sm font-medium" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[var(--text-h)] text-[var(--bg)] py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
