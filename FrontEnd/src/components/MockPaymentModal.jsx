import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MockPaymentModal = ({ listing, onClose, onSuccess }) => {
  const [step, setStep] = useState('form'); // form | processing | success
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('processing');

    try {
      // Fake 2s processing delay
      await new Promise(r => setTimeout(r, 2000));
      
      await axios.post('http://localhost:3000/purchases/mock', 
        { listingId: listing._id },
        { withCredentials: true }
      );

      setStep('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Payment failed. Try again.');
      setStep('form');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md bg-[var(--accent-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                  <CreditCard size={18} className="text-[var(--bg)]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Secure Checkout</p>
                  <h2 className="text-sm font-bold text-[var(--text-h)]">Complete Purchase</h2>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/[0.05] text-gray-500 hover:text-[var(--text-h)] transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Order Summary */}
            <div className="mx-6 mt-5 p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Order Summary</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[var(--text-h)] truncate max-w-[200px]">{listing.title}</p>
                  <p className="text-[11px] text-gray-500">{listing.category}</p>
                </div>
                <p className="text-lg font-extrabold text-[var(--accent)]">${listing.price?.toLocaleString()}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Cardholder Name</label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Card Number</label>
                <div className="relative">
                  <input
                    required
                    value={cardNumber}
                    onChange={e => setCardNumber(formatCard(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-gray-600 pr-12"
                  />
                  <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Expiry</label>
                  <input
                    required
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">CVV</label>
                  <input
                    required
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    maxLength={3}
                    type="password"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[var(--accent)] text-[var(--bg)] font-bold text-sm rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Lock size={14} />
                Pay ${listing.price?.toLocaleString()} Securely
              </button>

              <p className="text-center text-[10px] text-gray-600 flex items-center justify-center gap-1.5">
                <ShieldCheck size={11} /> 256-bit SSL encrypted · Escrow protected
              </p>
            </form>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-[var(--accent-bg)] border border-[var(--border)] rounded-2xl p-12 flex flex-col items-center gap-6 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
              <Loader2 size={28} className="text-[var(--accent)] animate-spin" />
            </div>
            <div>
              <p className="text-base font-bold text-[var(--text-h)]">Processing Payment</p>
              <p className="text-sm text-gray-500 mt-1">Please wait, do not close this window...</p>
            </div>
            <div className="w-full bg-[var(--bg)] rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent)] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-[var(--accent-bg)] border border-[var(--border)] rounded-2xl p-12 flex flex-col items-center gap-6 text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
            >
              <CheckCircle2 size={36} className="text-green-400" />
            </motion.div>
            <div>
              <p className="text-xl font-extrabold text-[var(--text-h)]">Payment Successful!</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>{listing.title}</strong> is now yours. A confirmation email has been sent to you.
              </p>
            </div>
            <div className="w-full p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-bold text-[var(--text-h)]">${listing.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Status</span>
                <span className="font-bold text-green-400">Confirmed</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full h-11 bg-[var(--accent)] text-[var(--bg)] font-bold text-sm rounded-xl hover:opacity-90 transition-all"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MockPaymentModal;
