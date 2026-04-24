import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/about-visual.png';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const values = [
    { title: "Transparency", desc: "Verified metrics and deep analytics for every listing." },
    { title: "Security", desc: "Secure escrow and seamless asset transition protocols." },
    { title: "Precision", desc: "Data-driven insights to find the perfect acquisition." }
  ];

  return (
    <section className="w-full py-32 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Visual & Hook */}
          <motion.div 
            {...fadeInUp}
            className="relative group"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] glass-effect p-2">
              <img 
                src={aboutImage} 
                alt="DevEx Vision" 
                className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-60"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[var(--accent)] text-[var(--bg)] p-6 rounded-2xl shadow-2xl z-20 hidden md:block border border-white/20">
              <p className="text-sm font-bold tracking-tight">The Intelligence Hub</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">for SaaS Founders</p>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex flex-col">
            <motion.span 
              {...fadeInUp}
              className="text-[var(--accent)] text-[12px] font-bold tracking-[0.3em] uppercase mb-6 block"
            >
              Our Mission
            </motion.span>
            
            <motion.h2 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-h)] mb-8 leading-[1.1]"
            >
              Bridging the Gap <br />
              Between <span className="text-gray-500 font-medium italic">Vision & Exit.</span>
            </motion.h2>

            <motion.p 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="text-lg text-[var(--text)] mb-12 leading-relaxed max-w-xl"
            >
              DevEx is more than a marketplace. It's a modular command center built for the next generation of SaaS founders. We've eliminated the friction in acquisitions, providing a unified platform where verified metrics meet strategic investors.
            </motion.p>

            {/* Values Grid */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {values.map((v, i) => (
                <div key={i} className="group">
                  <h4 className="text-[var(--text-h)] font-bold text-sm mb-2 group-hover:text-[var(--accent)] transition-colors">{v.title}</h4>
                  <p className="text-[12px] text-[var(--text)] leading-snug">{v.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-radial-glow opacity-30 pointer-events-none -translate-x-1/2"></div>
    </section>
  );
};

export default About;
