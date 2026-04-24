import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is DevEx and how does it work?",
      answer: "DevEx is a premium marketplace for buying and selling Micro-SaaS businesses. We connect verified sellers with strategic buyers through a streamlined process — from listing with verified metrics, to secure escrow-based transactions, to seamless asset transfer."
    },
    {
      question: "How are SaaS valuations determined?",
      answer: "Our platform uses a data-driven valuation engine that analyzes key metrics including MRR, churn rate, growth trajectory, customer acquisition cost, and lifetime value. Each listing is independently verified to ensure transparency and accurate pricing for both buyers and sellers."
    },
    {
      question: "What fees does DevEx charge?",
      answer: "DevEx operates on a success-based commission model — you only pay when a deal closes. Our standard fee is a small percentage of the final transaction value. There are no upfront listing fees, no hidden charges, and no monthly subscriptions required to browse or list."
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section className="w-full py-32 relative overflow-hidden" id="faq">
      {/* Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-radial-glow opacity-20 pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-20">
          <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.3em] uppercase mb-6 block">
            Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-h)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--text)] max-w-xl mx-auto">
            Everything you need to know about buying and selling on DevEx.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="space-y-3"
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className={`
                rounded-2xl border transition-all duration-500 overflow-hidden
                ${openIndex === idx
                  ? 'border-[var(--accent)]/30 bg-[var(--accent-bg)] shadow-[0_0_30px_rgba(255,255,255,0.02)]'
                  : 'border-[var(--border)] bg-[var(--accent-bg)]/50 hover:border-[var(--text-h)]/10 hover:bg-[var(--accent-bg)]'
                }
              `}
            >
              {/* Question Button */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left cursor-pointer group"
              >
                <span className={`
                  text-[14px] font-semibold tracking-tight transition-colors duration-300
                  ${openIndex === idx ? 'text-[var(--text-h)]' : 'text-[var(--text)] group-hover:text-[var(--text-h)]'}
                `}>
                  {faq.question}
                </span>

                {/* Animated Icon */}
                <div className={`
                  shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500
                  ${openIndex === idx
                    ? 'bg-[var(--accent)] rotate-45'
                    : 'bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--accent)]/30'
                  }
                `}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-colors duration-300 ${openIndex === idx ? 'text-[var(--bg)]' : 'text-[var(--text)]'}`}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </button>

              {/* Answer (Animated) */}
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-7 pt-0">
                      <div className="w-full h-px bg-gradient-to-r from-[var(--accent)]/20 via-[var(--border)] to-transparent mb-5"></div>
                      <p className="text-sm text-[var(--text)] leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          className="text-center mt-16 pt-12 border-t border-[var(--border)]"
        >
          <p className="text-sm text-[var(--text)] mb-6">
            Still have questions? We'd love to hear from you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--bg)] px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-all btn-premium"
          >
            Contact Support
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
