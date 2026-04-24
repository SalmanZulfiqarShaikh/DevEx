import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = ({ onBrowseClick }) => {
  const navigate = useNavigate();
  const MOCK_USER = null;

  const handleSellClick = () => {
    if (MOCK_USER) {
      navigate('/dashboard/seller');
    } else {
      navigate('/signup');
    }
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
          className="flex flex-col sm:flex-row gap-6"
        >
          <button 
            onClick={onBrowseClick} 
            className="bg-[var(--accent)] text-[var(--bg)] px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-all cursor-pointer btn-premium flex items-center gap-2 group"
          >
            Browse as Buyer
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button 
            onClick={handleSellClick} 
            className="border border-[var(--border)] text-[var(--text)] px-10 py-4 rounded-xl font-bold hover:bg-[var(--accent-bg)] transition-all cursor-pointer btn-premium"
          >
            Sell Your SaaS
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
