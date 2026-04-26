import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Plus, 
  Settings, 
  Users, 
  Wallet,
  Globe,
  MoreVertical,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const stats = [
    { label: 'Total Revenue', value: '$42,500', icon: Wallet, color: 'text-green-400' },
    { label: 'Active Listings', value: '3', icon: BarChart3, color: 'text-blue-400' },
    { label: 'Total Views', value: '1.2k', icon: Users, color: 'text-purple-400' },
  ];

  const myListings = [
    { id: 1, name: 'CloudStorage API', status: 'Active', price: '$12,000', views: '450', health: 'Healthy' },
    { id: 2, name: 'EcoTracker App', status: 'Pending', price: '$4,500', views: '120', health: 'Good' },
    { id: 3, name: 'DevTool Helper', status: 'Sold', price: '$8,200', views: '890', health: 'N/A' },
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
                <Globe size={16} className="text-[var(--accent)]" />
              </div>
              DEVEX <span className="text-gray-500 font-medium">SELLER</span>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-h)] mb-2">Seller Dashboard</h1>
              <p className="text-gray-500">Track your SaaS performance and manage listings.</p>
            </div>
            <button className="bg-[var(--accent)] text-[var(--bg)] px-8 py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-white/5">
              <Plus size={18} />
              List New SaaS
            </button>
          </div>

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
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)] ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-[var(--text-h)]">{stat.value}</div>
                  <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} />
                    12%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Listings Section */}
          <div className="bg-[var(--accent-bg)] border border-[var(--border)] rounded-3xl overflow-hidden glass-effect">
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-h)]">My Listings</h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-[var(--bg)] border border-transparent hover:border-[var(--border)] transition-all text-gray-400">
                  <Settings size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-[var(--bg)] border border-transparent hover:border-[var(--border)] transition-all text-gray-400">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 border-b border-[var(--border)]">
                    <th className="px-8 py-5">Name</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Price</th>
                    <th className="px-8 py-5">Views</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {myListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-colors">
                            <CheckCircle2 size={18} />
                          </div>
                          <span className="font-bold text-[var(--text-h)]">{listing.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          listing.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                          listing.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-bold text-[var(--text-h)]">{listing.price}</td>
                      <td className="px-8 py-6 text-sm text-gray-500">{listing.views}</td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-xs font-bold text-[var(--accent)] hover:underline opacity-60 hover:opacity-100 transition-all">Edit Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] text-center">
               <button className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--text-h)] transition-colors">View All Analytics</button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SellerDashboard;
