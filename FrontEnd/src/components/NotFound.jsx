import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-[var(--border)]/[0.05] bg-[length:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow opacity-20 mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-md"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-[var(--text-h)] mb-2 tracking-tighter">404</h1>
        <div className="h-1 w-20 bg-[var(--accent)] mx-auto mb-8 rounded-full"></div>
        
        <h2 className="text-2xl font-bold text-[var(--text-h)] mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto bg-[var(--text-h)] text-[var(--bg)] px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
          >
            <Home size={16} className="group-hover:scale-110 transition-transform" />
            Return to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[var(--accent-bg)] transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
