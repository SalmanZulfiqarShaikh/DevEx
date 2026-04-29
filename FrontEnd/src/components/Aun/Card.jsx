import { useState } from "react";

/* ─── helpers ─────────────────────────────────── */
function formatAccNumber(raw) {
  const d = raw.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(raw) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}
function luhn(num) {
  const d = num.replace(/\D/g, "");
  let sum = 0, alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return sum % 10 === 0 && d.length >= 13;
}

/* ─── sub-components ──────────────────────────── */
function Label({ children, required }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-500 mb-2 flex gap-1">
      {children}
      {required && <span className="text-emerald-500">*</span>}
    </p>
  );
}

function FieldWrap({ children, error }) {
  return (
    <div>
      {children}
      {error && (
        <p className="font-mono text-[10px] text-red-400 mt-1.5 tracking-wide">{error}</p>
      )}
    </div>
  );
}

function Input({ icon, error, className = "", ...props }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 text-sm pointer-events-none select-none">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`
          w-full bg-[#141414] border rounded-[3px] font-mono text-[13px] text-neutral-100
          placeholder-neutral-700 outline-none transition-all duration-200
          py-3 pr-4 ${icon ? "pl-10" : "pl-4"}
          ${error
            ? "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
            : "border-neutral-800 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(74,222,128,0.08)]"
          }
          ${className}
        `}
      />
    </div>
  );
}

/* ─── live card visual ─────────────────────────── */
function CardVisual({ accNumber, expiry, holderName, cvc, cvcFocused }) {
  const digits = accNumber.replace(/\D/g, "");
  const fmt = [
    digits.slice(0, 4).padEnd(4, "•"),
    digits.slice(4, 8).padEnd(4, "•"),
    digits.slice(8, 12).padEnd(4, "•"),
    digits.slice(12, 16).padEnd(4, "•"),
  ].join("  ");

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden select-none"
      style={{ aspectRatio: "1.586", background: "linear-gradient(135deg,#141414 0%,#1c1c1c 50%,#141414 100%)", border: "1px solid #2a2a2a" }}
    >
      {/* glow */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />

      {/* CVC flip overlay */}
      <div className={`absolute inset-0 flex flex-col justify-center bg-[#111] transition-all duration-300 z-10 ${cvcFocused ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="h-10 bg-neutral-900 w-full" />
        <div className="px-5 mt-4">
          <div className="bg-neutral-800 rounded-sm h-8 flex items-center justify-end pr-4">
            <span className="font-mono text-sm text-neutral-300 tracking-[0.3em]">
              {cvc ? "•".repeat(cvc.length) : "•••"}
            </span>
          </div>
          <p className="font-mono text-[9px] text-neutral-600 mt-2 tracking-widest uppercase">Security Code (CVC)</p>
        </div>
      </div>

      <div className="relative z-0 h-full flex flex-col justify-between p-5">
        {/* top row */}
        <div className="flex justify-between items-start">
          {/* chip */}
          <div className="w-8 h-6 rounded-sm grid grid-cols-3 grid-rows-3 gap-px p-0.5 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#c9a84c,#f5d78c,#c9a84c)" }}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-black/20 rounded-[1px]" />
            ))}
          </div>
          <span className="font-mono text-[9px] text-neutral-700 tracking-widest uppercase">DevEx</span>
        </div>

        {/* number */}
        <div className="font-mono text-base text-neutral-300 tracking-[0.2em]">{fmt}</div>

        {/* bottom */}
        <div className="flex justify-between items-end">
          <div>
            <p className="font-mono text-[8px] text-neutral-700 tracking-widest uppercase mb-0.5">Cardholder</p>
            <p className="font-mono text-[11px] text-neutral-300 tracking-wider uppercase">
              {holderName || "YOUR NAME"}
            </p>
            <p className="font-mono text-[10px] text-neutral-500 mt-1">{expiry || "MM/YY"}</p>
          </div>
          <div className="font-mono text-xs font-bold italic text-neutral-400">DEBIT</div>
        </div>
      </div>
    </div>
  );
}

/* ─── step indicator ───────────────────────────── */
function Steps({ current }) {
  const steps = ["Account", "Security", "Review"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300
              ${i < current ? "bg-emerald-500 text-black" : i === current ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400" : "bg-neutral-900 border border-neutral-800 text-neutral-600"}`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`font-mono text-[9px] tracking-wider uppercase ${i === current ? "text-emerald-400" : "text-neutral-700"}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 h-px mx-2 mb-5 transition-all duration-500 ${i < current ? "bg-emerald-500" : "bg-neutral-800"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── main component ───────────────────────────── */
export default function SellerPayoutForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [cvcFocused, setCvcFocused] = useState(false);

  const [form, setForm] = useState({
    holderName: "",
    bankName: "",
    accNumber: "",
    expiry: "",
    cvc: "",
    ifsc: "",
    accType: "savings",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.holderName.trim()) e.holderName = "Account holder name is required";
    if (!form.bankName.trim()) e.bankName = "Bank name is required";
    if (!form.ifsc.trim()) e.ifsc = "IFSC / Routing code is required";
    if (!luhn(form.accNumber)) e.accNumber = "Invalid account number";
    return e;
  };

  const validateStep1 = () => {
    const e = {};
    const [mm, yy] = form.expiry.split("/");
    if (!mm || !yy || +mm > 12 || +mm < 1) {
      e.expiry = "Invalid expiry date";
    } else {
      const exp = new Date(2000 + +yy, +mm - 1);
      if (exp < new Date()) e.expiry = "Card has expired";
    }
    if (form.cvc.length < 3) e.cvc = "CVC must be 3–4 digits";
    return e;
  };

  const next = () => {
    const e = step === 0 ? validateStep0() : validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');`}</style>
        <div className="flex flex-col items-center gap-5 text-center max-w-sm animate-[fadeUp_0.5s_ease_both]">
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <div className="w-16 h-16 rounded-full border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center text-3xl">✓</div>
          <h2 className="text-2xl font-black text-white tracking-tight">Payout Details Saved</h2>
          <p className="font-mono text-[11px] text-neutral-500 leading-relaxed">
            Your bank details have been securely saved.<br />
            You'll receive payouts within <span className="text-emerald-400">2–3 business days</span> of each sale.
          </p>
          <div className="bg-[#111] border border-neutral-800 rounded-sm px-5 py-3 font-mono text-[11px] text-neutral-500 w-full text-left space-y-1">
            <div className="flex justify-between"><span>Account</span><span className="text-neutral-300">••••{form.accNumber.replace(/\s/g,"").slice(-4)}</span></div>
            <div className="flex justify-between"><span>Bank</span><span className="text-neutral-300">{form.bankName}</span></div>
            <div className="flex justify-between"><span>Type</span><span className="text-neutral-300 capitalize">{form.accType}</span></div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm({ holderName:"",bankName:"",accNumber:"",expiry:"",cvc:"",ifsc:"",accType:"savings" }); }}
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 border border-neutral-800 rounded-sm px-5 py-2.5 hover:border-emerald-500 hover:text-emerald-400 transition-all"
          >
            ← Edit Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6"
      style={{ fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <div className="w-full max-w-4xl flex gap-0 border border-neutral-800/80 rounded-[4px] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(74,222,128,0.05)]">

        {/* ── LEFT: form ── */}
        <div className="flex-1 bg-[#0f0f0f] p-10 flex flex-col">

          {/* header */}
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-500 flex items-center gap-2 mb-2">
              <span className="inline-block w-5 h-px bg-emerald-500" />
              Seller Dashboard
            </p>
            <h1 className="text-[22px] font-black tracking-tight text-white leading-tight">
              Payout Account<br />Setup
            </h1>
          </div>

          <Steps current={step} />

          {/* ── STEP 0: Account details ── */}
          {step === 0 && (
            <div className="flex flex-col gap-5 fade-up">
              <FieldWrap error={errors.holderName}>
                <Label required>Account Holder Name</Label>
                <Input
                  icon="👤"
                  placeholder="Full legal name"
                  value={form.holderName}
                  error={errors.holderName}
                  onChange={e => set("holderName", e.target.value.toUpperCase())}
                />
              </FieldWrap>

              <FieldWrap error={errors.bankName}>
                <Label required>Bank / Institution Name</Label>
                <Input
                  icon="🏦"
                  placeholder="e.g. HBL, Meezan Bank, Chase"
                  value={form.bankName}
                  error={errors.bankName}
                  onChange={e => set("bankName", e.target.value)}
                />
              </FieldWrap>

              <FieldWrap error={errors.accNumber}>
                <Label required>Account / Card Number</Label>
                <Input
                  icon="💳"
                  placeholder="0000 0000 0000 0000"
                  value={form.accNumber}
                  error={errors.accNumber}
                  onChange={e => set("accNumber", formatAccNumber(e.target.value))}
                />
              </FieldWrap>

              <FieldWrap error={errors.ifsc}>
                <Label required>IFSC / Routing / IBAN Code</Label>
                <Input
                  icon="🔢"
                  placeholder="e.g. HABB0000123 or 021000021"
                  value={form.ifsc}
                  error={errors.ifsc}
                  onChange={e => set("ifsc", e.target.value.toUpperCase())}
                />
              </FieldWrap>

              {/* Account type */}
              <div>
                <Label>Account Type</Label>
                <div className="flex gap-3">
                  {["savings", "current", "business"].map(t => (
                    <button
                      key={t}
                      onClick={() => set("accType", t)}
                      className={`flex-1 py-2.5 rounded-[3px] font-mono text-[10px] uppercase tracking-widest border transition-all duration-200
                        ${form.accType === t
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-neutral-800 bg-[#141414] text-neutral-600 hover:border-neutral-700"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 1: Security ── */}
          {step === 1 && (
            <div className="flex flex-col gap-5 fade-up">
              {/* live card */}
              <CardVisual
                accNumber={form.accNumber}
                expiry={form.expiry}
                holderName={form.holderName}
                cvc={form.cvc}
                cvcFocused={cvcFocused}
              />

              <div className="flex gap-4">
                <FieldWrap error={errors.expiry}>
                  <Label required>Card Expiry</Label>
                  <Input
                    placeholder="MM/YY"
                    value={form.expiry}
                    error={errors.expiry}
                    onChange={e => set("expiry", formatExpiry(e.target.value))}
                    maxLength={5}
                  />
                </FieldWrap>

                <FieldWrap error={errors.cvc}>
                  <Label required>CVC / CVV</Label>
                  <Input
                    placeholder="•••"
                    value={form.cvc}
                    error={errors.cvc}
                    onChange={e => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    onFocus={() => setCvcFocused(true)}
                    onBlur={() => setCvcFocused(false)}
                    maxLength={4}
                  />
                </FieldWrap>
              </div>

              <div className="bg-[#141414] border border-neutral-800 rounded-[3px] p-4 flex gap-3 items-start">
                <span className="text-emerald-500 text-base mt-0.5">🔒</span>
                <div>
                  <p className="font-mono text-[10px] text-neutral-400 tracking-wide font-bold mb-1">End-to-End Encrypted</p>
                  <p className="font-mono text-[10px] text-neutral-600 leading-relaxed">
                    Your card details are encrypted with 256-bit SSL and never stored in plaintext. DevEx uses PCI-DSS compliant vaulting.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Review ── */}
          {step === 2 && (
            <div className="flex flex-col gap-4 fade-up">
              <p className="font-mono text-[11px] text-neutral-500 leading-relaxed">
                Review your payout details before saving. These will be used for all future withdrawals.
              </p>

              {[
                ["Account Holder", form.holderName],
                ["Bank", form.bankName],
                ["Account Type", form.accType.toUpperCase()],
                ["Account No.", "••••" + form.accNumber.replace(/\s/g,"").slice(-4)],
                ["Routing / IFSC", form.ifsc],
                ["Card Expiry", form.expiry],
                ["CVC", "•".repeat(form.cvc.length)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center border-b border-neutral-900 pb-3">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">{label}</span>
                  <span className="font-mono text-[12px] text-neutral-300">{val}</span>
                </div>
              ))}

              <div className="mt-2 flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-500 tracking-wider">Ready to save securely</span>
              </div>
            </div>
          )}

          {/* ── nav buttons ── */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3.5 border border-neutral-800 rounded-[3px] font-mono text-[11px] uppercase tracking-widest text-neutral-500 hover:border-neutral-700 hover:text-neutral-300 transition-all"
              >
                ← Back
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={next}
                className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 rounded-[3px] font-black text-[13px] text-black tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(74,222,128,0.3)]"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-400 rounded-[3px] font-black text-[13px] text-black tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(74,222,128,0.3)] flex items-center justify-center gap-2"
              >
                🔒 Save Payout Details
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT: info panel ── */}
        <div className="w-64 flex-shrink-0 bg-[#0a0a0a] p-8 flex flex-col gap-0 border-l border-neutral-900">

          {/* brand */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-black text-black text-base leading-none">D</div>
            <span className="font-black text-lg tracking-tight text-white">DevEx</span>
          </div>

          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-700 mb-4">Payout Info</p>

          <div className="flex flex-col gap-4 mb-8">
            {[
              { icon: "⚡", title: "Fast Transfers", desc: "Payouts processed within 2–3 business days." },
              { icon: "🛡️", title: "Secure Vault", desc: "PCI-DSS compliant. Bank-grade encryption." },
              { icon: "💰", title: "Low Fees", desc: "Only 5% platform cut. You keep 95% of every sale." },
              { icon: "🌍", title: "Global Support", desc: "Supports SWIFT, SEPA, ACH and local transfers." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm flex-shrink-0">{icon}</div>
                <div>
                  <p className="font-mono text-[10px] text-neutral-300 font-bold tracking-wide">{title}</p>
                  <p className="font-mono text-[9px] text-neutral-600 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="h-px bg-neutral-900 mb-5" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase">256-bit SSL Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}