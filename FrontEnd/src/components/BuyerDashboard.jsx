import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, TrendingUp, ExternalLink, ShieldCheck, Moon, Sun, Filter, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import DevExChatbot from './DevEXChatBot';

const FilterDropdown = ({ dropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = dropdown.options.find(o => o.value === dropdown.value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--accent-bg)] text-[var(--text-h)] text-xs font-bold transition-all hover:border-[var(--accent)]/40 min-w-[140px] text-left"
      >
        <span className="flex-1 truncate">{selectedOption?.label}</span>
        <ChevronDown size={14} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-[var(--accent-bg)] border border-[var(--border)] rounded-2xl shadow-2xl z-50 overflow-hidden py-2"
            >
              {dropdown.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    dropdown.setValue(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-bold transition-colors ${
                    dropdown.value === option.value
                      ? 'text-[var(--accent)] bg-[var(--accent)]/5'
                      : 'text-gray-400 hover:text-[var(--text-h)] hover:bg-white/[0.03]'
                  }`}
                >
                  {option.label}
                  {dropdown.value === option.value && <CheckCircle2 size={12} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const BuyerDashboard = ({ activeTab = 'overview' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search/Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest'); 
  const [categoryOption, setCategoryOption] = useState('');
  const [processingFavs, setProcessingFavs] = useState({});
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch listings with query options
      const listRes = await axios.get(`http://localhost:3000/listing?q=${searchQuery}&sort=${sortOption}&category=${categoryOption}`);
      if (Array.isArray(listRes.data)) setListings(listRes.data);

      if (user) {
        // Fetch Last Buys
        const buysRes = await axios.get('http://localhost:3000/purchases/my', { withCredentials: true });
        if (Array.isArray(buysRes.data)) setPurchases(buysRes.data);

        // Fetch Favorites
        const favRes = await axios.get('http://localhost:3000/favorites', { withCredentials: true });
        if (Array.isArray(favRes.data)) setFavorites(favRes.data);
      }
    } catch (err) {
      console.error("Error fetching buyer dashboard data:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token expired or invalid
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOption, categoryOption]);

  useEffect(() => {
    if (activeTab === 'buys' && !user) {
      navigate('/login');
    }
  }, [activeTab, user, navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const toggleFavorite = async (listingId) => {
    if (processingFavs[listingId]) return;

    try {
      setProcessingFavs(prev => ({ ...prev, [listingId]: true }));
      
      const isFav = favorites.some(f => f.listingId?._id === listingId);
      if (isFav) {
        await axios.delete(`http://localhost:3000/favorites/${listingId}`, { withCredentials: true });
      } else {
        await axios.post('http://localhost:3000/favorites', { listingId }, { withCredentials: true });
      }
      
      // Refresh favorites
      const favRes = await axios.get('http://localhost:3000/favorites', { withCredentials: true });
      setFavorites(favRes.data);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setProcessingFavs(prev => ({ ...prev, [listingId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        {/* Header bar Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 md:mb-10 pb-6 border-b border-gray-500/20">
          <div className="h-8 bg-gray-500/20 rounded-xl w-48 animate-pulse hidden md:block"></div>
          <div className="h-12 bg-gray-500/20 rounded-2xl w-full md:max-w-xl animate-pulse"></div>
          <div className="h-10 bg-gray-500/20 rounded-xl w-12 animate-pulse self-end md:self-auto"></div>
        </div>

        {/* Filters Bar Skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="h-6 bg-gray-500/20 rounded w-20 animate-pulse"></div>
          <div className="h-10 bg-gray-500/20 rounded-xl w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-500/20 rounded-xl w-32 animate-pulse"></div>
        </div>

        {/* Posts Feed Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] flex flex-col justify-between relative shadow-lg animate-pulse">
              <div>
                <div className="aspect-video rounded-2xl bg-gray-500/20 mb-6"></div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-500/20"></div>
                  <div className="h-4 bg-gray-500/20 rounded w-24"></div>
                  <div className="h-4 bg-gray-500/20 rounded w-16 ml-auto"></div>
                </div>
                <div className="h-6 bg-gray-500/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-500/20 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-500/20 rounded w-2/3 mb-6"></div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-500/10">
                <div>
                  <div className="h-3 bg-gray-500/20 rounded w-16 mb-1"></div>
                  <div className="h-6 bg-gray-500/20 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-500/20 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 md:mb-10 pb-6 border-b border-gray-500/20">
        <div className="text-xl font-bold tracking-tight hidden md:block w-1/4">DevEx Market</div>

        {/* Search Bar (YouTube style) */}
        <form onSubmit={handleSearchSubmit} className="flex w-full md:max-w-xl flex-1 shadow-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SaaS applications..."
            className="flex-1 px-4 py-2.5 rounded-l-2xl focus:outline-none focus:ring-1 focus:ring-[var(--accent)] border border-[var(--border)] bg-[var(--accent-bg)] text-[var(--text-h)] text-sm"
          />
          <button 
            type="submit"
            className="px-6 bg-[var(--accent)] text-[var(--bg)] font-bold rounded-r-2xl hover:opacity-90 transition-opacity"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Toggles & Icons */}
        <div className="w-full md:w-1/4 flex justify-end items-center gap-6">
          {/* Favorites/Cart Icon */}
          <button 
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                activeTab === 'favorites' ? navigate('/dashboard/buyer') : navigate('/dashboard/buyer/buys');
              }
            }}
            className="relative p-2.5 rounded-xl border border-gray-500/20 hover:text-[var(--accent)] transition-all"
            title="Saved Items"
          >
            <Heart size={20} className={favorites.length > 0 ? 'fill-[var(--accent)] text-[var(--accent)]' : ''} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Filter</span>
            </div>

            {/* Custom Dropdowns */}
            {[
              {
                id: 'sort',
                label: 'Sort By',
                value: sortOption,
                setValue: setSortOption,
                options: [
                  { value: 'latest', label: 'Latest Posts' },
                  { value: 'popular', label: 'Most Popular' },
                  { value: 'a-z', label: 'A – Z (Title)' }
                ]
              },
              {
                id: 'category',
                label: 'Category',
                value: categoryOption,
                setValue: setCategoryOption,
                options: [
                  { value: '', label: 'All Categories' },
                  { value: 'AI', label: 'Artificial Intelligence' },
                  { value: 'Fintech', label: 'Fintech' },
                  { value: 'E-commerce', label: 'E-commerce' },
                  { value: 'DevTools', label: 'Developer Tools' },
                  { value: 'SaaS', label: 'General SaaS' }
                ]
              }
            ].map((dropdown) => (
              <FilterDropdown key={dropdown.id} dropdown={dropdown} />
            ))}
          </div>

          {/* Posts Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => {
              const isFav = favorites.some(f => f.listingId?._id === listing._id);
              return (
                <div 
                  key={listing._id}
                  className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] transition-all flex flex-col justify-between group hover:-translate-y-2 relative shadow-lg hover:border-[var(--accent)]/30"
                >
                  {/* Product Images Preview */}
                  <div className="aspect-video rounded-2xl bg-black/10 flex items-center justify-center relative overflow-hidden mb-6">
                    {listing.images && listing.images.length > 0 ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <span className="text-4xl font-extrabold text-[var(--accent)] opacity-40">{listing.title?.charAt(0)}</span>
                    )}
                    
                    <button 
                      disabled={processingFavs[listing._id]}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!user) {
                          navigate('/login');
                        } else {
                          toggleFavorite(listing._id);
                        }
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-xl text-white transition-all shadow-md ${
                        processingFavs[listing._id] ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60'
                      }`}
                    >
                      <Heart size={16} className={`${isFav ? 'fill-red-500 text-red-500' : ''} ${processingFavs[listing._id] ? 'animate-pulse' : ''}`} />
                    </button>

                    {/* Sold Badge */}
                    {listing.isSold && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                        <span className="bg-red-500 text-white font-extrabold text-sm px-5 py-1.5 rounded-full shadow-lg tracking-widest uppercase rotate-[-6deg]">
                          SOLD
                        </span>
                      </div>
                    )}
                  </div>

                  <Link to={`/listing/${listing._id}`} className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center text-[10px] font-bold overflow-hidden">
                        {listing.sellerProfilePic ? (
                          <img 
                            src={listing.sellerProfilePic.startsWith('http') ? listing.sellerProfilePic : `http://localhost:3000${listing.sellerProfilePic}`} 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          listing.sellerName?.charAt(0) || 'F'
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{listing.sellerName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] ml-auto">{listing.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">{listing.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-6">{listing.description}</p>
                  </Link>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-500/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Acquisition Price</span>
                      <div className="text-xl font-extrabold">${listing.price?.toLocaleString()}</div>
                    </div>
                    <Link 
                      to={`/listing/${listing._id}`} 
                      className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] flex items-center gap-1 group-hover:underline"
                    >
                      View <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'buys' && (
        <div>
          <h1 className="text-3xl font-bold mb-2">My Acquisitions & Favorites</h1>
          
          <h2 className="text-xl font-bold text-gray-400 mt-10 mb-6">Last Buys</h2>
          {purchases.length === 0 ? (
            <p className="p-6 rounded-xl border border-gray-500/10 text-sm text-gray-500">No products acquired yet.</p>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div key={purchase._id} className="p-6 rounded-2xl flex items-center justify-between border border-[var(--border)] bg-[var(--accent-bg)]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center text-green-400"><ShoppingBag size={20} /></div>
                    <div>
                      <h4 className="font-bold">{purchase.listingId?.title || "SaaS Product"}</h4>
                      <p className="text-xs text-gray-500">Order ID: {purchase._id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(purchase.amountPaid / 100).toLocaleString()}</div>
                    <span className="text-xs text-green-500">Paid via Stripe</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-xl font-bold text-gray-400 mt-12 mb-6">Favorites / Cart</h2>
          {favorites.length === 0 ? (
            <p className="p-6 rounded-xl border border-gray-500/10 text-sm text-gray-500">No bookmarks saved.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((fav) => (
                <div key={fav._id} className="p-6 rounded-2xl flex items-center justify-between border border-[var(--border)] bg-[var(--accent-bg)]">
                  <Link to={`/listing/${fav.listingId?._id}`} className="flex-1 cursor-pointer group">
                    <h4 className="font-bold group-hover:text-[var(--accent)] transition-colors">{fav.listingId?.title}</h4>
                    <span className="text-xs text-[var(--accent)] font-bold">{fav.listingId?.category}</span>
                  </Link>
                  <button 
                    disabled={processingFavs[fav.listingId?._id]}
                    onClick={() => toggleFavorite(fav.listingId?._id)} 
                    className={`text-xs font-bold transition-colors ${
                      processingFavs[fav.listingId?._id] ? 'text-gray-500 cursor-not-allowed' : 'text-red-500 hover:underline'
                    }`}
                  >
                    {processingFavs[fav.listingId?._id] ? 'Removing...' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <DevExChatbot />
    </div>
  );
};

export default BuyerDashboard;
