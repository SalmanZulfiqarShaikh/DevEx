import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  TrendingUp, 
  ExternalLink,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const stats = [
    { label: 'Active Bids', value: '12', icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Purchased', value: '4', icon: ShoppingBag, color: 'text-green-400' },
    { label: 'Watchlist', value: '28', icon: Heart, color: 'text-pink-400' },
  ];

  const recentPurchases = [
    { id: 1, name: 'SaaS Metrics Pro', type: 'Micro-SaaS', price: '$2,400', date: '2 days ago', status: 'Completed' },
    { id: 2, name: 'AI Image Gen API', type: 'API Service', price: '$1,850', date: '1 week ago', status: 'Escrow' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans pb-20">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-dot-pattern opacity-20"></div>
      
      {/* Dashboard Nav */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] border border-[var(--border)] flex items-center justify-center">
                <ShieldCheck size={16} className="text-[var(--accent)]" />
              </div>
              DEVEX <span className="text-gray-500 font-medium">BUYER</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[var(--accent)] transition-colors">Home</Link>
            <button 
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
              className="text-xs font-bold uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-10">
        <motion.div {...fadeInUp}>
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-[var(--text-h)] mb-2">Buyer Overview</h1>
            <p className="text-gray-500">Manage your acquisitions and track your bids.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] glass-effect hover:border-[var(--accent)]/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon size={20} />
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-[var(--text-h)] mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Purchases */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-[var(--text-h)]">Recent Acquisitions</h2>
                <button className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] hover:opacity-70 transition-opacity">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentPurchases.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] hover:bg-[var(--bg)] transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.type} • {item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--text-h)]">{item.price}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-green-500/80">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Actions */}
            <div className="space-y-6">
               <div className="p-8 rounded-3xl border border-[var(--border)] bg-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                    <Search size={80} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Find New Assets</h3>
                  <p className="text-sm text-gray-400 mb-6">Discover thousands of verified SaaS businesses ready for acquisition.</p>
                  <Link to="/" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all">
                    Browse Marketplace
                    <ExternalLink size={16} />
                  </Link>
               </div>

               <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] glass-effect">
                  <h3 className="text-sm font-bold text-[var(--text-h)] mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-blue-400" />
                    Market Alerts
                  </h3>
                  <div className="space-y-4">
                    <div className="text-xs border-l-2 border-blue-500/50 pl-4 py-1">
                      <p className="text-gray-300 font-medium mb-1">New AI Listing</p>
                      <p className="text-gray-500">"AI Writer Pro" just hit the market.</p>
                    </div>
                    <div className="text-xs border-l-2 border-pink-500/50 pl-4 py-1">
                      <p className="text-gray-300 font-medium mb-1">Outbid Alert</p>
                      <p className="text-gray-500">You were outbid on "SaaS Kit v2".</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
