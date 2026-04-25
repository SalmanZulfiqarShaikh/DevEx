import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cookies = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const sections = [
    {
      title: 'What Are Cookies?',
      content: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences, analyzing site traffic, and enabling certain features to function properly. Cookies are widely used across the internet and are essential for modern websites to operate effectively.'
    },
    {
      title: 'How We Use Cookies',
      content: 'DevEx uses cookies and similar tracking technologies to enhance your experience on our platform. We use them to keep you signed in, remember your theme preferences (dark/light mode), understand how you interact with our marketplace, and deliver content relevant to your interests. Our cookies help us improve our services and provide a seamless buying and selling experience.'
    },
    {
      title: 'Types of Cookies We Use',
      items: [
        {
          name: 'Essential Cookies',
          desc: 'Required for the website to function properly. These cookies enable core functionalities such as user authentication, session management, and security features. Without these cookies, services you have requested cannot be provided.'
        },
        {
          name: 'Performance Cookies',
          desc: 'Help us understand how visitors interact with our website by collecting anonymous usage data. This information is used to improve the performance and design of our platform, including page load times and navigation patterns.'
        },
        {
          name: 'Functional Cookies',
          desc: 'Allow the website to remember choices you make (such as your theme preference, language, or region) and provide enhanced, personalized features. These cookies may also be used to provide services you have requested.'
        },
        {
          name: 'Analytics Cookies',
          desc: 'We use analytics cookies (such as Google Analytics) to collect information about how visitors use our website. This data helps us understand user behavior, identify popular content, and optimize our platform for the best possible experience.'
        }
      ]
    },
    {
      title: 'Third-Party Cookies',
      content: 'Some cookies on our website are placed by third-party services that appear on our pages. These include analytics providers, payment processors, and social media platforms. We do not control the use of these cookies. We recommend reviewing the privacy policies of these third-party services for more information about how they use cookies.'
    },
    {
      title: 'Managing Your Cookies',
      content: 'You have the right to control and manage cookies. Most web browsers allow you to manage cookie preferences through their settings. You can choose to block or delete cookies, but please note that doing so may impact your ability to use certain features of our platform. You can typically find cookie management options under "Settings," "Privacy," or "Security" in your browser menu.'
    },
    {
      title: 'Cookie Retention',
      content: 'Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you manually delete them. Our authentication cookies are retained for up to 7 days to keep you logged in across sessions. Analytics cookies are typically retained for up to 2 years.'
    },
    {
      title: 'Updates to This Policy',
      content: 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to periodically review this page for the latest information on our cookie practices. The date at the bottom of this page indicates when this policy was last updated.'
    }
  ];

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
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <span className="text-xs font-semibold text-[var(--accent)]">Cookie Policy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-6 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-lg text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
          This policy explains how DevEx uses cookies and similar technologies to recognize you when you visit our platform.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-12">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: idx * 0.05 }}
            className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)]/30"
          >
            <h2 className="text-xl font-bold text-[var(--text-h)] mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center text-sm font-bold text-[var(--accent)]">
                {idx + 1}
              </span>
              {section.title}
            </h2>
            {section.content && (
              <p className="text-sm text-[var(--text)] leading-relaxed">
                {section.content}
              </p>
            )}
            {section.items && (
              <div className="space-y-4 mt-4">
                {section.items.map((item, i) => (
                  <div key={i} className="pl-4 border-l-2 border-[var(--accent)]/30">
                    <h3 className="text-sm font-bold text-[var(--text-h)] mb-1">{item.name}</h3>
                    <p className="text-sm text-[var(--text)] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Last Updated */}
        <div className="text-center pt-8 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text)]">
            Last updated: April 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
