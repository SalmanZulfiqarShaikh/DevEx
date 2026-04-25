import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing or using the DevEx platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained on this website are protected by applicable copyright and trademark law.'
    },
    {
      title: 'Account Registration',
      content: 'To access certain features of DevEx, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding the password that you use to access the platform and for any activities or actions under your password. You agree not to disclose your password to any third party.'
    },
    {
      title: 'Buyer Responsibilities',
      items: [
        'Conduct your own due diligence before purchasing any digital product, SaaS project, or service listed on DevEx.',
        'Ensure that you have the technical capability and resources to maintain and operate any acquired product.',
        'Respect intellectual property rights associated with purchased products.',
        'Report any issues with a purchased product within 14 days of the transaction.',
        'Not reverse-engineer, decompile, or attempt to extract source code from products where such rights are not explicitly granted.'
      ]
    },
    {
      title: 'Seller Responsibilities',
      items: [
        'Provide accurate and truthful descriptions of all listed products, including revenue metrics, user data, and technical specifications.',
        'Ensure you have full legal authority to sell and transfer ownership of listed products.',
        'Respond to buyer inquiries in a timely and professional manner.',
        'Complete the transfer of all assets, code, domains, and accounts within the agreed-upon timeframe.',
        'Not engage in any form of fraud, misrepresentation, or deceptive practices.'
      ]
    },
    {
      title: 'Prohibited Activities',
      content: 'Users of DevEx are prohibited from: (a) using the platform for any illegal purpose or in violation of any laws; (b) posting or transmitting any material that is defamatory, offensive, or otherwise objectionable; (c) attempting to gain unauthorized access to other user accounts or computer systems; (d) interfering with or disrupting the platform or servers; (e) scraping, data mining, or extracting data from the platform without written consent; (f) creating fake accounts or listings; (g) manipulating reviews, ratings, or metrics.'
    },
    {
      title: 'Intellectual Property',
      content: 'The DevEx platform, including its original content, features, and functionality, is owned by Team DevEx and is protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Team DevEx.'
    },
    {
      title: 'Payment & Transactions',
      content: 'All financial transactions conducted through DevEx are processed through our secure payment partners. DevEx may charge a service fee on successful transactions, which will be clearly disclosed before any transaction is completed. All fees are non-refundable unless otherwise stated. Prices listed on the platform are in USD unless otherwise specified. Sellers are responsible for any applicable taxes on their earnings.'
    },
    {
      title: 'Limitation of Liability',
      content: 'In no event shall DevEx, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, goodwill, or other intangible losses, resulting from: (i) your access to or use of or inability to access or use the platform; (ii) any conduct or content of any third party on the platform; (iii) any content obtained from the platform; and (iv) unauthorized access, use, or alteration of your transmissions or content.'
    },
    {
      title: 'Dispute Resolution',
      content: 'Any disputes arising out of or related to these Terms of Service or the use of the DevEx platform shall first be attempted to be resolved through good-faith negotiation between the parties. If a resolution cannot be reached, the dispute shall be submitted to binding arbitration in accordance with applicable arbitration rules. Each party shall bear its own costs in the arbitration proceedings.'
    },
    {
      title: 'Termination',
      content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service. Upon termination, your right to use the platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the platform or contact our support team. All provisions of these Terms which by their nature should survive termination shall survive.'
    },
    {
      title: 'Changes to Terms',
      content: 'DevEx reserves the right to modify or replace these Terms of Service at any time. If a revision is material, we will try to provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our platform after those revisions become effective, you agree to be bound by the revised terms.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about these Terms of Service, please contact us through our GitHub repository or reach out to any of the Team DevEx members listed on our website. We are committed to addressing your concerns and ensuring a transparent, fair marketplace for everyone.'
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span className="text-xs font-semibold text-[var(--accent)]">Legal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-lg text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
          Please read these terms carefully before using the DevEx platform. By using our service, you agree to these terms.
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
              <ul className="space-y-3 mt-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text)] leading-relaxed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)] mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
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

export default TermsOfService;
