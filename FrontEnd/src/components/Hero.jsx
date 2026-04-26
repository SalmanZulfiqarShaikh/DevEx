import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Hero = ({ onBrowseClick }) => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleSellClick = () => {
    if (user && role === 'seller') {
      navigate('/dashboard/seller');
    } else {
      navigate('/signup');
    }
  };

  const handleBrowseBuyerClick = () => {
    if (user) {
      if (role === 'buyer') navigate('/dashboard/buyer');
      else if (role === 'seller') navigate('/dashboard/seller');
    } else {
      navigate('/login'); // They asked 'login button takes to login, signup to signup' but what about buyer specifically? Let's just go to login or maybe buyer dashboard. Actually, they said "browse as guest should take directly to buyer dashboard". So if Browse as Buyer, take to login if not logged in.
    }
  };

  const handleBrowseGuestClick = () => {
    // take directly to buyer dashboard, unauthenticated
    navigate('/dashboard/buyer');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-40 text-center min-h-[80vh]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-radial-glow opacity-50 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 max-w-5xl leading-[1.05] text-[var(--text-h)]"
        >
          Acquire the Future <br className="hidden md:block" />
          <span className="text-gray-500">of Micro-SaaS.</span>
        </motion.h1>
        
        <motion.p 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-gray-400 max-w-2xl text-lg md:text-xl mb-12 leading-relaxed font-medium"
        >
          Verified metrics. Seamless transfers. <br className="hidden md:block" />
          DevEx is the intelligent hub for your next high-potential acquisition.
        </motion.p>
        
        <motion.div 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => {
                if(user) {
                  navigate(`/dashboard/${role}`);
                } else {
                  navigate('/login');
                }
              }} 
              className="bg-[var(--accent)] text-[var(--bg)] px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-all cursor-pointer btn-premium flex items-center gap-2 group"
            >
              Browse as Buyer
            </button>
            <button 
              onClick={handleSellClick} 
              className="border border-[var(--border)] text-[var(--text)] px-10 py-4 rounded-xl font-bold hover:bg-[var(--accent-bg)] transition-all cursor-pointer btn-premium"
            >
              Sell Your SaaS
            </button>
          </div>
          <button 
            onClick={() => navigate('/dashboard/buyer')} 
            className="border border-[var(--border)] text-[var(--text)] px-8 py-3 rounded-xl font-bold hover:bg-[var(--accent-bg)] transition-all cursor-pointer btn-premium"
          >
            Browse as Guest
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
