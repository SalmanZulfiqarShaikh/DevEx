import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const mockListings = [
  { id: 1, name: 'AI Tools', price: '$15k - $50k', desc: 'Subtlebase AI testing engagement, description colors and data-correlated screens...', mrr: '$20', stack: 'SvelteKit, Postgres', iconColor: 'bg-blue-500/20 text-blue-400' },
  { id: 2, name: 'No-Code', price: '$15k - $50k', desc: 'Short description code including eos, onsteriadio, alters and extensions.', mrr: '$20', stack: 'SvelteKit, Postgres', iconColor: 'bg-purple-500/20 text-purple-400' },
  { id: 3, name: 'AI Tools', price: '$15k - $50k', desc: 'Short authorization and assessing essentially with partover testers.', mrr: '$30', stack: 'React, Node.js', iconColor: 'bg-indigo-500/20 text-indigo-400' },
  { id: 4, name: 'No-Code', price: '$15k - $50k', desc: 'Create current building engagement, warm and color accessible to local cases.', mrr: '$20', stack: 'SvelteKit, Postgres', iconColor: 'bg-sky-500/20 text-sky-400' },
  { id: 5, name: 'No-Code', price: '$15k - $50k', desc: 'Until no code platform, mockiary anyone and commence issues and reack...', mrr: '$20', stack: 'SvelteKit, Postgres', iconColor: 'bg-amber-500/20 text-amber-400' },
  { id: 6, name: 'AI Tools', price: '$15k - $50k', desc: 'Scanned for attention for waveform aothing from tools, and data-doodle...', mrr: '$20', stack: 'SvelteKit, Postgres', iconColor: 'bg-emerald-500/20 text-emerald-400' },
];

const FeaturedListings = forwardRef((props, ref) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section ref={ref} className="w-full py-24 pb-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-[var(--text-h)] mb-4">Trending Opportunities</h2>
          <p className="text-[var(--text)] max-w-xl mx-auto">Explore high-potential Micro-SaaS ventures curated by our team.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockListings.map((listing) => (
            <motion.div 
              key={listing.id} 
              variants={itemVariants}
              className="rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] hover:bg-[var(--bg)] transition-all duration-300 p-8 flex flex-col group cursor-pointer hover:border-[var(--text-h)]/20 hover:-translate-y-2 card-hover-shadow"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${listing.iconColor}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-h)] text-lg">{listing.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text)]/60 font-bold">Verified Listing</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[var(--text-h)] bg-[var(--accent-bg)] px-3 py-1 rounded-full border border-[var(--border)]">{listing.price}</span>
              </div>
              
              <p className="text-sm text-[var(--text)] mb-8 flex-grow leading-relaxed">
                {listing.desc}
              </p>
              
              <div className="flex gap-10 mb-8 pt-6 border-t border-[var(--border)]">
                <div>
                  <p className="text-[10px] font-bold text-[var(--text)]/50 uppercase tracking-[0.2em] mb-1">MRR</p>
                  <p className="text-sm font-bold text-[var(--text-h)]">{listing.mrr}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--text)]/50 uppercase tracking-[0.2em] mb-1">Stack</p>
                  <p className="text-sm font-bold text-[var(--text-h)]">{listing.stack}</p>
                </div>
              </div>

              <button className="w-full py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--text-h)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 btn-premium">
                View Analytics
              </button>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
});

FeaturedListings.displayName = 'FeaturedListings';

export default FeaturedListings;
