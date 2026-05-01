import React, { useState } from 'react';
import { CreditCard, Building2, Plus, Trash2, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MOCK_CARDS = [
  { id: 1, brand: 'Visa', last4: '4242', expiry: '08/27', isDefault: true },
  { id: 2, brand: 'Mastercard', last4: '5353', expiry: '12/26', isDefault: false },
];

const MockBankDetails = () => {
  const { role } = useAuth();
  const isSeller = role === 'seller';
  const [cards, setCards] = useState(MOCK_CARDS);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d;
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const last4 = newCard.number.replace(/\s/g, '').slice(-4);
    const brand = newCard.number.trim().startsWith('4') ? 'Visa' : 'Mastercard';
    setCards(prev => [...prev, { id: Date.now(), brand, last4, expiry: newCard.expiry, isDefault: false }]);
    setNewCard({ number: '', expiry: '', cvv: '', name: '' });
    setShowAddCard(false);
  };

  const removeCard = (id) => setCards(prev => prev.filter(c => c.id !== id));
  const setDefault = (id) => setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));

  const brandColor = (brand) => brand === 'Visa' ? 'text-blue-400' : 'text-orange-400';
  const brandBg = (brand) => brand === 'Visa' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-orange-500/10 border-orange-500/20';

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-h)] tracking-tight">Payment Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your saved cards and {isSeller ? 'payout account' : 'billing info'}</p>
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

        <div className="space-y-3">
          {cards.map(card => (
            <div key={card.id} className={`flex items-center gap-4 p-4 rounded-xl border bg-[var(--accent-bg)] border-[var(--border)] transition-all`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border text-xs font-extrabold ${brandBg(card.brand)} ${brandColor(card.brand)}`}>
                {card.brand === 'Visa' ? 'VISA' : 'MC'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-h)]">{card.brand} •••• {card.last4}</p>
                <p className="text-[11px] text-gray-500">Expires {card.expiry}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {card.isDefault ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                    <CheckCircle2 size={10} /> Default
                  </span>
                ) : (
                  <button onClick={() => setDefault(card.id)} className="text-[10px] font-bold text-gray-500 hover:text-[var(--accent)] transition-colors px-2 py-1 rounded-full border border-[var(--border)] hover:border-[var(--accent)]/30">
                    Set Default
                  </button>
                )}
                <button onClick={() => removeCard(card.id)} className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Card Form */}
        {showAddCard && (
          <form onSubmit={handleAddCard} className="mt-4 p-5 border border-[var(--border)] rounded-xl bg-[var(--bg)] space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Card</p>
            <input
              required
              placeholder="Cardholder Name"
              value={newCard.name}
              onChange={e => setNewCard(p => ({ ...p, name: e.target.value }))}
              className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600"
            />
            <input
              required
              placeholder="Card Number"
              value={newCard.number}
              onChange={e => setNewCard(p => ({ ...p, number: formatCard(e.target.value) }))}
              maxLength={19}
              className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={e => setNewCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                maxLength={5}
                className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600"
              />
              <input
                required
                type="password"
                placeholder="CVV"
                value={newCard.cvv}
                onChange={e => setNewCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                maxLength={3}
                className="w-full bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-h)] focus:outline-none focus:border-[var(--accent)]/40 placeholder:text-gray-600"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 h-11 bg-[var(--accent)] text-[var(--bg)] font-bold text-sm rounded-xl hover:opacity-90 transition-all">
                Save Card
              </button>
              <button type="button" onClick={() => setShowAddCard(false)} className="flex-1 h-11 border border-[var(--border)] text-[var(--text-h)] font-bold text-sm rounded-xl hover:bg-white/[0.03] transition-all">
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Seller: Payout Account / Buyer: Billing note */}
      {isSeller ? (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Payout Account</h2>
          <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--accent-bg)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <Building2 size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text-h)]">Connected Bank Account</p>
                <p className="text-[11px] text-gray-500">HBL — •••• •••• 8821</p>
              </div>
              <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                <CheckCircle2 size={10} /> Verified
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <p className="text-gray-500 mb-0.5">Account Holder</p>
                <p className="font-bold text-[var(--text-h)]">DevEx Seller</p>
              </div>
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <p className="text-gray-500 mb-0.5">Bank</p>
                <p className="font-bold text-[var(--text-h)]">HBL Pakistan</p>
              </div>
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <p className="text-gray-500 mb-0.5">Payout Schedule</p>
                <p className="font-bold text-[var(--text-h)]">Instant</p>
              </div>
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <p className="text-gray-500 mb-0.5">Platform Fee</p>
                <p className="font-bold text-[var(--text-h)]">10%</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-lg">
              <AlertCircle size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-400">Payouts are processed within 1–3 business days after a successful sale. DevEx retains 10% as a platform fee.</p>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--accent-bg)] flex items-start gap-3">
            <ShieldCheck size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[var(--text-h)]">Escrow Protection Active</p>
              <p className="text-xs text-gray-500 mt-1">All payments are held in escrow until the asset transfer is confirmed by both parties. Your money is always safe on DevEx.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MockBankDetails;
