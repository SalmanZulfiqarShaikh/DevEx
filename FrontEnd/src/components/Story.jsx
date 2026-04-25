import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Story = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };


  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </button>
      </div>

      {/* Header */}
      <motion.div
        {...fadeInUp}
        className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--accent-bg)] mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span className="text-xs font-semibold text-[var(--accent)]">Our Journey</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-6 tracking-tight">
          Our Story
        </h1>
        <p className="text-lg text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
          From a DSA project to something we actually want to use.
        </p>
      </motion.div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-12">

        {/* Origin */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.05 }}
          className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)]/30"
        >
          <h2 className="text-xl font-bold text-[var(--text-h)] mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center text-sm font-bold text-[var(--accent)]">
              1
            </span>
            How It Started
          </h2>
          <p className="text-sm text-[var(--text)] leading-relaxed">
            DevEx started as a university DSA project with a simple question — what if foundational data structures like Linked Lists, Stacks, and Queues actually solved real product problems instead of just sitting in textbooks? Five students — Salman, Fasih, Hussain, Hassan, and Aun — set out to build a working marketplace in one week to prove exactly that.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)]/30"
        >
          <h2 className="text-xl font-bold text-[var(--text-h)] mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center text-sm font-bold text-[var(--accent)]">
              2
            </span>
            What It Became
          </h2>
          <p className="text-sm text-[var(--text)] leading-relaxed">
            What started as an academic exercise became something we actually wanted to use. A place where developers could sell the small tools they build at 2am, and other developers could find exactly what they needed without sifting through bloated SaaS platforms.
          </p>
        </motion.div>

        {/* Who It's For */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.15 }}
          className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)]/30"
        >
          <h2 className="text-xl font-bold text-[var(--text-h)] mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center text-sm font-bold text-[var(--accent)]">
              3
            </span>
            Who It's For
          </h2>
          <p className="text-sm text-[var(--text)] leading-relaxed">
            It's especially goated for founders who want to find investors or sell their products, or students who wanna sell their FYPs and stuff — because LinkedIn is bloated and we're thrilled to build something that actually works for the builder community.
          </p>
        </motion.div>


      </div>
    </div>
  );
};

export default Story;
