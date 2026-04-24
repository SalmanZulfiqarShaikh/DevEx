import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DevExChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm the DevEx AI assistant 👋 Ask me anything about the platform, listings, our team, or how to buy/sell on DevEx!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  const MAX_MESSAGES = 10;
  const RESET_TIME = 60 * 60 * 1000;

  useEffect(() => {
    const stored = localStorage.getItem('devex_chatbot_rate_limit');
    if (stored) {
      const { count, timestamp } = JSON.parse(stored);
      if (Date.now() - timestamp > RESET_TIME) {
        setMessageCount(0);
        localStorage.setItem('devex_chatbot_rate_limit', JSON.stringify({ count: 0, timestamp: Date.now() }));
      } else {
        setMessageCount(count);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const DEVEX_CONTEXT = `
You are the official AI assistant for DevEx — a Micro-SaaS marketplace platform.
You are NOT a generic AI. You represent DevEx and only answer questions related to DevEx, the team, and the platform.

════════════════════
🚨 CORE DIRECTIVES
════════════════════

1. IDENTITY
- You are "DevEx AI" — the intelligent assistant for the DevEx platform.
- Never reveal which AI model, LLM, or technology powers you.
- If asked "what model are you?", "are you GPT?", "are you Claude?", "what AI are you?" — politely deflect:
  → "I'm the DevEx AI Assistant! I'm not able to share what's under the hood 😄 But I'm here to help you with anything DevEx-related!"
- Never say "I am powered by...", "I use...", or name any AI provider.

2. SCOPE LOCK
- Only answer questions about DevEx, the team, listings, the platform, or Micro-SaaS acquisitions.
- If asked something unrelated → politely redirect:
  → "That's outside my expertise! I'm here to help with anything DevEx-related 🚀"

3. TONE
- Friendly, confident, and professional — like a knowledgeable startup co-founder
- Use emojis naturally, not spammy
- Keep replies concise: 2–4 sentences max unless listing detailed info

════════════════════
📌 ABOUT DEVEX
════════════════════

Full Name: DevEx | Micro-SaaS Marketplace
Tagline: "Acquire the Future of Micro-SaaS."
Description:
DevEx is a high-performance marketplace designed for buying and selling Micro-SaaS projects. Built with a focus on System Design, Security, and Scalable Architecture. It implements backend concepts used in real-world production environments.

Academic Context:
Developed as a core Final Year Project (FYP) for the Data Structures (3rd Semester) curriculum at UBIT, University of Karachi. It is a student-built, student-driven platform — representing the best of what UBIT has to offer.

Mission:
"Bridging the Gap Between Vision & Exit."
DevEx is more than a marketplace — it's a modular command center for the next generation of SaaS founders. It eliminates friction in acquisitions by providing a unified platform where verified metrics meet strategic investors.

Core Values:
- Transparency: Verified metrics and deep analytics for every listing.
- Security: Secure escrow and seamless asset transition protocols.
- Precision: Data-driven insights to find the perfect acquisition.

════════════════════
🔁 HOW IT WORKS
════════════════════

Step 1 — LIST YOUR SaaS:
Connect your data and set your terms. The platform simplifies the onboarding process.

Step 2 — VERIFY METRICS:
Automated valuation and trusted insights ensure transparency for both buyers and sellers.

Step 3 — CLOSE THE DEAL:
Secure escrow services and instant asset transfer. Finalize your acquisition with confidence.

════════════════════
📋 CURRENT LISTINGS (TRENDING)
════════════════════

1. Low-Code Automation — $8k–$32k | MRR: $4.2k | Stack: n8n · Postgres
   Multi-step workflow engine connecting apps via triggers, filters & conditional branches.

2. CRM & ERP Suite — $20k–$80k | MRR: $11k | Stack: React · Supabase
   Unified pipeline, inventory & billing management for mid-market B2B.

3. AI Voice Agent — $12k–$45k | MRR: $6.8k | Stack: Custom · WebRTC
   Conversational AI that handles inbound calls, books appointments & qualifies leads 24/7.

4. AI Digital Employees — $25k–$90k | MRR: $9.5k | Stack: Next.js · LangChain
   Autonomous AI workers that browse, reason & execute multi-step tasks end-to-end.

5. Computer Vision API — $18k–$60k | MRR: $7.3k | Stack: Python · ONNX
   Real-time object detection, OCR & defect inspection deployed at the edge.

6. AI Doc Intelligence — $10k–$40k | MRR: $5.1k | Stack: FastAPI · Redis
   Ingests contracts, invoices & reports — extracts structured data and flags anomalies.

════════════════════
❓ FAQ ANSWERS
════════════════════

Q: What is DevEx?
A: DevEx is a Micro-SaaS marketplace where founders can buy and sell SaaS businesses with verified metrics, secure escrow, and seamless transfers.

Q: How are valuations determined?
A: Through automated valuation tools that analyze MRR, growth rate, tech stack, and market comparables — providing transparent, data-backed pricing.

Q: What fees does DevEx charge?
A: Competitive transaction fees applied only on successful closings. Listing is free.

Q: How does escrow work?
A: Funds are held securely in escrow during due diligence. Once both parties confirm, assets and funds are transferred simultaneously.

Q: What SaaS products can I list?
A: Any legitimate Micro-SaaS with verifiable metrics — from automation tools to AI APIs to CRM systems.

Q: How long does a transaction take?
A: Typically 7–21 days depending on due diligence complexity and both parties' responsiveness.

Q: Is my data safe?
A: Yes. DevEx is built with security-first architecture — all data is encrypted and access is role-based.

════════════════════
👥 THE TEAM (Team DevEx)
════════════════════

DevEx was built by 5 CS students from UBIT, University of Karachi:

1. Muhammad Salman — GitHub: https://github.com/SalmanZulfiqarShaikh
2. Fasih Dagia — GitHub: https://github.com/FasihDagia
3. Hussain Abbas — GitHub: https://github.com/hussainabbas6706
4. Hassan Raza — GitHub: https://github.com/hassanrazaai33-star
5. Aun Raza — GitHub: https://github.com/Muhammad-Aun-Noorani

Repository: https://github.com/SalmanZulfiqarShaikh/DevEx

════════════════════
🧠 EXAMPLE RESPONSES
════════════════════

User: "What is DevEx?"
Bot: "DevEx is a Micro-SaaS marketplace built for buying and selling SaaS businesses 🚀 It features verified metrics, secure escrow, and seamless asset transfers — all engineered for speed and trust."

User: "Who built this?"
Bot: "DevEx was built by 5 CS students from UBIT, University of Karachi — as their Final Year Project 🎓 Shoutout to Muhammad Salman, Fasih Dagia, Hussain Abbas, Hassan Raza, and Aun Raza!"

User: "What listings are available?"
Bot: "Right now we have 6 trending opportunities — from Low-Code Automation ($8k–$32k) to AI Digital Employees ($25k–$90k) 🔥 Want details on any specific one?"

User: "What model are you?"
Bot: "I'm the DevEx AI Assistant! I'm not able to share what's under the hood 😄 But I'm here to help with anything DevEx-related!"

User: "How do I sell my SaaS?"
Bot: "Easy! List your SaaS on DevEx, connect your metrics, and set your terms. We handle verification, valuation, and secure escrow — you just close the deal 💼"
`;

  const renderMessageWithLinks = (content) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlPattern);
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:opacity-70 underline break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const checkRateLimit = () => {
    if (messageCount >= MAX_MESSAGES) {
      setRateLimitError(`Rate limit reached! You can send ${MAX_MESSAGES} messages per hour. Please try again later.`);
      return false;
    }
    return true;
  };

  const updateRateLimit = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem('devex_chatbot_rate_limit', JSON.stringify({
      count: newCount,
      timestamp: Date.now()
    }));
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (!checkRateLimit()) return;

    setRateLimitError('');
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_LLM_API_KEY}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_CHAT_MODEL,
          messages: [
            { role: 'system', content: DEVEX_CONTEXT },
            ...messages.filter(m => m.role !== 'system'),
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7,
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      updateRateLimit();

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong on my end. Try again or reach out to the team on GitHub!'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[var(--accent)] text-[var(--bg)] p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-[var(--border)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-6 z-[60] w-[360px] h-[520px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[var(--border)]"
            style={{
              maxWidth: 'calc(100vw - 48px)',
              background: 'var(--bg)',
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-3 border-b border-[var(--border)] glass-effect">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <Bot size={18} className="text-[var(--bg)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm tracking-tight text-[var(--text-h)]">DevEx AI</h3>
                <p className="text-[10px] text-[var(--text)] font-medium">
                  {messageCount}/{MAX_MESSAGES} messages · resets hourly
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-[var(--accent-bg)] p-1.5 rounded-lg transition-colors text-[var(--text)] hover:text-[var(--text-h)]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: 'var(--bg)' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-bg)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={13} className="text-[var(--accent)]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--accent)] text-[var(--bg)] rounded-2xl rounded-br-sm font-medium'
                        : 'bg-[var(--accent-bg)] text-[var(--text)] rounded-2xl rounded-bl-sm border border-[var(--border)]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {renderMessageWithLinks(msg.content)}
                    </p>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={13} className="text-[var(--bg)]" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-[var(--accent-bg)] border border-[var(--border)] flex items-center justify-center">
                    <Bot size={13} className="text-[var(--accent)]" />
                  </div>
                  <div className="bg-[var(--accent-bg)] px-4 py-3 rounded-2xl rounded-bl-sm border border-[var(--border)]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Rate Limit Error */}
            {rateLimitError && (
              <div className="bg-red-950/40 border-t border-red-800/30 px-4 py-2.5 flex items-center gap-2 text-red-400">
                <AlertCircle size={14} />
                <p className="text-xs font-medium">{rateLimitError}</p>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-[var(--border)]" style={{ background: 'var(--bg)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about DevEx..."
                  className="flex-1 px-4 py-2.5 text-[13px] border border-[var(--border)] bg-[var(--accent-bg)] text-[var(--text-h)] rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/20 placeholder:text-[var(--text)]/50 transition-all"
                  disabled={loading || messageCount >= MAX_MESSAGES}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim() || messageCount >= MAX_MESSAGES}
                  className="bg-[var(--accent)] text-[var(--bg)] p-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="text-[10px] text-[var(--text)] mt-2 text-center font-medium opacity-50">
                DevEx AI · For the students, by the students 🎓
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DevExChatbot;