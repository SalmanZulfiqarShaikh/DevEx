import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "LIST YOUR SaaS",
      description: "Connect your data and set your terms. Our platform simplifies the onboarding process.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      )
    },
    {
      number: "02",
      title: "VERIFY METRICS",
      description: "Automated valuation and trusted insights ensure transparency for both buyers and sellers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    {
      number: "03",
      title: "CLOSE THE DEAL",
      description: "Secure escrow services and instant asset transfer. Finalize your acquisition with confidence.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="w-full py-32 relative overflow-hidden" id="process">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-h)] mb-4">Streamlined Acquisition Process</h2>
          <p className="text-[var(--text)] max-w-xl mx-auto">From listing to closing, we've engineered every step for speed and security.</p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative group p-10 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] hover:bg-[var(--bg)] transition-all duration-500 hover:border-[var(--text-h)]/20 hover:-translate-y-2 card-hover-shadow overflow-hidden"
            >
              {/* Background Number Indicator */}
              <span className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.03] select-none group-hover:text-white/[0.05] transition-colors duration-500">
                {step.number}
              </span>

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl border border-white/10 bg-[var(--bg)] flex items-center justify-center mb-8 text-[var(--accent)] relative z-10 transition-all duration-500 group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                {step.icon}
              </div>
              
              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase text-[var(--text-h)] mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text)] leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

