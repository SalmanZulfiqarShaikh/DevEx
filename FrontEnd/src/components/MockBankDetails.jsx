import React, { useState, useEffect } from 'react';
import { CreditCard, Building2, Plus, Trash2, ShieldCheck, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const MockBankDetails = () => {
  const { role } = useAuth();
  const isSeller = role === 'seller';

  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({ cardholderName: '', number: '', expiry: '', cvv: '' });

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d;
  };
  const detectBrand = (num) => num.replace(/\s/g, '').startsWith('4') ? 'Visa' : 'Mastercard';

  // Fetch cards from DB
  const fetchCards = async () => {
    try {
      const res = await axios.get('http://localhost:3000/cards', { withCredentials: true });
      setCards(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => { fetchCards(); }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();
    const digits = form.number.replace(/\s/g, '');
    if (digits.length < 16) return toast.error('Enter a valid 16-digit card number');
    setSaving(true);
    try {
      const res = await axios.post('http://localhost:3000/cards', {
        cardholderName: form.cardholderName,
        last4: digits.slice(-4),
        brand: detectBrand(digits),
        expiry: form.expiry,
      }, { withCredentials: true });
      setCards(prev => [...prev, res.data]);
      setForm({ cardholderName: '', number: '', expiry: '', cvv: '' });
      setShowAddCard(false);
      toast.success('Card saved successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3000/cards/${id}`, { withCredentials: true });
      setCards(prev => prev.filter(c => c._id !== id));
      toast.success('Card removed');
    } catch (err) {
      toast.error('Failed to remove card');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await axios.put(`http://localhost:3000/cards/${id}/default`, {}, { withCredentials: true });
      setCards(prev => prev.map(c => ({ ...c, isDefault: c._id === id })));
    } catch (err) {
      toast.error('Failed to set default');
    }
  };

  const brandStyle = (brand) => brand === 'Visa'
    ? { label: 'VISA', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' }
    : { label: 'MC', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-h)] tracking-tight">Payment Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your saved cards{isSeller ? ' and payout account' : ''}
        </p>
      </div>

      {/* Saved Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Saved Cards</h2>
          <button
            onClick={() => setShowAddCard(!showAddCard)}
            className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            <Plus size={14} /> Add Card
          </button>
        </div>

        {/* Cards list */}
        {loadingCards ? (
          <div className="flex items-center gap-3 p-5 border border-[var(--border)] rounded-2xl bg-[var(--accent-bg)]">
            <Loader2 size={16} className="animate-spin text-gray-400" />
            <span className="text-sm text-gray-500">Loading cards...</span>
          </div>
        ) : cards.length === 0 && !showAddCard ? (
          <div className="p-6 border border-dashed border-[var(--border)] rounded-2xl text-center bg-[var(--accent-bg)]">
            <CreditCard size={24} className="mx-auto text-gray-600 mb-2" />
            <p className="text-sm text-gray-500">No cards saved yet</p>
            <button
              onClick={() => setShowAddCard(true)}
              className="mt-3 text-xs font-bold text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              + Add your first card
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map(card => {
              const bs = brandStyle(card.brand);
              return (
                <div key={card._id} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-[10px] font-extrabold flex-shrink-0 ${bs.bg} ${bs.color}`}>
                    {bs.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--text-h)]">{card.brand} •••• {card.last4}</p>
                    <p className="text-[11px] text-gray-500">{card.cardholderName} · Expires {card.expiry}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {card.isDefault ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <CheckCircle2 size={10} /> Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(card._id)}
                        className="text-[10px] font-bold text-gray-500 hover:text-[var(--accent)] transition-colors px-2 py-1 rounded-full border border-[var(--border)] hover:border-[var(--accent)]/30"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(card._id)}
                      disabled={deletingId === card._id}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-40"
                    >
                      {deletingId === card._id
                        ? <Loader2 size={14} className="animate-spin" />
                        : <Trash2 size={14} />
                      }
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Card Form */}
        {showAddCard && (
          <form onSubmit={handleAddCard} className="mt-4 p-5 border border-[var(--border)] rounded-2xl bg-[var(--bg)] space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Card</p>
              <button type="button" onClick={() => setShowAddCard(false)} className="p-1 rounded-lg hover:bg-white/5 text-gray-500">
                <X size={14} />
              </button>
            </div>

            <input
              required
              placeholder="Cardholder Name"
              value={form.cardholderName}
              onChange={e => setForm(p => ({ ...p, cardholderName: e.target.value }))}
              className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600 transition-colors"
            />
            <div className="relative">
              <input
                required
                placeholder="Card Number"
                value={form.number}
                onChange={e => setForm(p => ({ ...p, number: formatCard(e.target.value) }))}
                maxLength={19}
                className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600 transition-colors pr-10"
              />
              <CreditCard size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="MM/YY"
                value={form.expiry}
                onChange={e => setForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                maxLength={5}
                className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600 transition-colors"
              />
              <input
                required
                type="password"
                placeholder="CVV"
                value={form.cvv}
                onChange={e => setForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                maxLength={3}
                className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 h-11 bg-[var(--accent)] text-[var(--bg)] font-bold text-sm rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Card'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddCard(false)}
                className="flex-1 h-11 border border-[var(--border)] text-[var(--text-h)] font-bold text-sm rounded-xl hover:bg-white/[0.03] transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Seller: Payout Account */}
      {isSeller && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Payout Account</h2>
          <div className="p-5 border border-[var(--border)] rounded-2xl bg-[var(--accent-bg)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <Building2 size={18} className="text-[var(--accent)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--text-h)]">Bank Account</p>
                <p className="text-[11px] text-gray-500">Connect a bank account to receive payouts</p>
              </div>
              <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                Coming Soon
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-xl">
              <AlertCircle size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-400">
                Payouts are processed within 1–3 business days after a confirmed sale. DevEx retains 10% as a platform fee. Full bank integration coming in the next release.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Buyer: Escrow Notice */}
      {!isSeller && (
        <section>
          <div className="p-5 border border-[var(--border)] rounded-2xl bg-[var(--accent-bg)] flex items-start gap-3">
            <ShieldCheck size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[var(--text-h)]">Escrow Protection Active</p>
              <p className="text-xs text-gray-500 mt-1">
                All payments are held in escrow until the asset transfer is confirmed. Your money is always safe on DevEx.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MockBankDetails;
