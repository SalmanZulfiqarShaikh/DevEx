import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import DevExChatbot from './DevEXChatBot';
import devexLogoDark from '../assets/DevEx_dark.webp';

const MainLayout = ({ children }) => {
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme class to document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans relative selection:bg-[var(--accent)] selection:text-[var(--bg)]">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-dot-pattern opacity-30"></div>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <img src={devexLogoDark} alt="DevEx Logo" className="h-10 w-auto object-contain logo" />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['About', 'Process', 'Categories', 'Reviews', 'FAQ'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(link.toLowerCase());
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors tracking-wide nav-link"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--accent-bg)] transition-colors text-[var(--text)]"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <Link to="/login" className="text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-h)] transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-[var(--accent)] text-[var(--bg)] px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all btn-premium">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <DevExChatbot />
    </div>
  );
};

export default MainLayout;
