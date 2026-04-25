import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const teamMembers = [
    { name: 'Muhammad Salman', github: 'https://github.com/SalmanZulfiqarShaikh' },
    { name: 'Fasih Dagia',     github: 'https://github.com/FasihDagia' },
    { name: 'Hussain Abbas',   github: 'https://github.com/hussainabbas6706' },
    { name: 'Hassan Raza',     github: 'https://github.com/hassanrazaai33-star' },
    { name: 'Aun Raza',        github: 'https://github.com/Muhammad-Aun-Noorani' },
  ];

  const GitHubIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );

  return (
    <>
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--bg)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          {...fadeInUp}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20"
        >
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tighter text-[var(--text-h)]">DevEx</span>
            </div>
            <p className="text-sm text-[var(--text)] mb-6 leading-relaxed">
              Premium digital experiences built by{' '}
              <span className="text-[var(--text-h)] font-semibold">Team DevEx</span>.{' '}
              Manifesting the future of Micro-SaaS.
            </p>
          </div>

          {/* Platform Links */}
          <div className="md:ml-auto">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)] mb-6">Platform</h4>
            <ul className="space-y-4">
              {['Work', 'Services', 'Process', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href={'#' + link.toLowerCase()} className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors nav-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:ml-auto">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)] mb-6">Company</h4>
            <ul className="space-y-4">
              {['About', 'Careers', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors nav-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Source */}
          <div className="md:ml-auto">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)] mb-6">Open Source</h4>
            <a
              href="https://github.com/SalmanZulfiqarShaikh/DevEx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 transition-all group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text)] group-hover:text-[var(--text-h)] transition-colors">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <div>
                <p className="text-[12px] font-bold text-[var(--text-h)] mb-0.5">GitHub Repository</p>
                <p className="text-[10px] text-[var(--text)]">Star us on GitHub</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Team Members Row */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 border-t border-[var(--border)]"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text)] shrink-0">
            Built by
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {teamMembers.map((member, idx) => (
              <a
                key={idx}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 hover:border-[var(--text-h)]/20 transition-all duration-300 group"
              >
                <span className="text-[var(--text)] group-hover:text-[var(--text-h)] transition-colors duration-300">
                  <GitHubIcon />
                </span>
                <span className="text-[12px] font-semibold text-[var(--text)] group-hover:text-[var(--text-h)] transition-colors duration-300">
                  {member.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-[var(--border)] gap-6"
        >
          <p className="text-xs text-[var(--text)] font-medium tracking-wide">
            {'\u00A9'} {currentYear} Team DevEx. All rights reserved.
          </p>
          <div className="flex gap-8">
            {[
              { label: 'Our Story', to: '/story' },
              { label: 'Terms of Service', to: '/terms' },
              { label: 'Cookies', to: '/cookies' },
            ].map((item) => (
              <Link key={item.label} to={item.to} className="text-xs text-[var(--text)] hover:text-[var(--text-h)] transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
    </>
  );
};

export default Footer;