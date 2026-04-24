import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const mockListings = [
  {
    id: 1,
    name: 'Low-Code Automation',
    price: '$8k – $32k',
    desc: 'Multi-step workflow engine connecting hundreds of apps via triggers, filters & conditional branches — built for ops teams who ship without engineers.',
    mrr: '$4.2k',
    stack: 'n8n · Postgres',
    iconColor: 'bg-blue-500/20 text-blue-400',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="2"/>
        <circle cx="19" cy="6" r="2"/>
        <circle cx="12" cy="18" r="2"/>
        <path d="M7 6h10M5 8v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V8"/>
        <line x1="12" y1="14" x2="12" y2="16"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'CRM & ERP Suite',
    price: '$20k – $80k',
    desc: 'Unified pipeline, inventory & billing management system tailored for mid-market B2B — with deep reporting and role-based access out of the box.',
    mrr: '$11k',
    stack: 'React · Supabase',
    iconColor: 'bg-purple-500/20 text-purple-400',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M6 8h.01M10 8h4"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'AI Voice Agent',
    price: '$12k – $45k',
    desc: 'Conversational AI that handles inbound calls, books appointments & qualifies leads — operating 24/7 with human-like naturalness and zero human oversight.',
    mrr: '$6.8k',
    stack: 'Custom · WebRTC',
    iconColor: 'bg-pink-500/20 text-pink-400',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'AI Digital Employees',
    price: '$25k – $90k',
    desc: 'Autonomous AI workers that browse, reason & execute multi-step tasks end-to-end — replacing entire operational roles with measurable output and audit logs.',
    mrr: '$9.5k',
    stack: 'Next.js · LangChain',
    iconColor: 'bg-amber-500/20 text-amber-400',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Computer Vision API',
    price: '$18k – $60k',
    desc: 'Real-time object detection, OCR & defect inspection deployed at the edge — purpose-built for manufacturing lines, logistics hubs & smart retail environments.',
    mrr: '$7.3k',
    stack: 'Python · ONNX',
    iconColor: 'bg-emerald-500/20 text-emerald-400',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'AI Doc Intelligence',
    price: '$10k – $40k',
    desc: 'Ingests contracts, invoices & compliance reports — extracts structured data, flags anomalies and generates audit-ready summaries at scale with zero manual review.',
    mrr: '$5.1k',
    stack: 'FastAPI · Redis',
    iconColor: 'bg-cyan-500/20 text-cyan-400',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
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
    <section ref={ref} id="categories" className="w-full py-24 pb-32 relative z-10">
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
                    {listing.icon}
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