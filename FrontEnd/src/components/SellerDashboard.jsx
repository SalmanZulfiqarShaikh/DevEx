import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, BarChart3, Plus, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SellerDashboard = ({ activeTab = 'overview' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [myListings, setMyListings] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('AI');
  const [demoUrl, setDemoUrl] = useState('');
  const [images, setImages] = useState([]); // File state
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal State
  const [editingListing, setEditingListing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLongDescription, setEditLongDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('AI');

  const uId = user?._id || user?.id;

  const fetchData = async () => {
    try {
      setLoading(true);
      const listRes = await axios.get(`http://localhost:3000/listing?sellerId=${uId}`, { withCredentials: true });
      if (Array.isArray(listRes.data)) setMyListings(listRes.data);

      const salesRes = await axios.get('http://localhost:3000/purchases/sales', { withCredentials: true });
      if (Array.isArray(salesRes.data)) setSales(salesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uId) fetchData();
  }, [uId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error("Max 3 images allowed");
      return;
    }
    setImages(files);
  };

  const [deletingListingId, setDeletingListingId] = useState(null);

  const handleDeleteListing = (id) => {
    setDeletingListingId(id);
  };

  const confirmDeleteListing = async () => {
    try {
      await axios.delete(`http://localhost:3000/listing/delete/${deletingListingId}`, { withCredentials: true });
      toast.success("Listing deleted successfully.");
      setDeletingListingId(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete.");
    }
  };

  const openEditModal = (listing) => {
    setEditingListing(listing);
    setEditTitle(listing.title);
    setEditDescription(listing.description);
    setEditLongDescription(listing.longDescription || '');
    setEditPrice(listing.price);
    setEditCategory(listing.category || 'AI');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/listing/update/${editingListing._id}`, {
        title: editTitle,
        description: editDescription,
        longDescription: editLongDescription,
        price: editPrice,
        category: editCategory
      }, { withCredentials: true });
      toast.success("Listing updated successfully.");
      setEditingListing(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('longDescription', longDescription);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('demoUrl', demoUrl);
    
    images.forEach((img) => {
      formData.append('images', img);
    });

    try {
      await axios.post('http://localhost:3000/listing/create', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("SaaS listing created successfully!");
      setTitle(''); setDescription(''); setLongDescription(''); setPrice(''); setDemoUrl(''); setImages([]);
      fetchData();
      navigate('/dashboard/seller/posts');
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create listing.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-[var(--bg)] text-[var(--text)]">
        {/* Header bar Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10 pb-6 border-b border-gray-500/10">
          <div>
            <div className="h-8 bg-gray-500/20 rounded-xl w-48 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-500/20 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-500/20 rounded-xl w-full sm:w-40 animate-pulse"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-6 rounded-3xl border border-gray-500/10 bg-[var(--accent-bg)] flex items-center justify-between animate-pulse">
              <div>
                <div className="h-8 bg-gray-500/20 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-500/20 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gray-500/20"></div>
            </div>
          ))}
        </div>

        {/* Last Posts Skeleton */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-500/20 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-500/20 rounded w-16 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 border border-gray-500/10 rounded-3xl bg-[var(--accent-bg)] animate-pulse">
                <div className="h-32 rounded-2xl bg-gray-500/20 mb-4"></div>
                <div className="h-5 bg-gray-500/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-500/20 rounded w-1/4 mb-4"></div>
                <div className="flex gap-2">
                  <div className="flex-1 h-8 bg-gray-500/20 rounded-xl"></div>
                  <div className="flex-1 h-8 bg-gray-500/20 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const approvedListings = myListings.filter(l => l.isApproved);
  const pendingListings = myListings.filter(l => !l.isApproved);

  return (
    <div className="p-4 md:p-8">
      {activeTab === 'overview' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10 pb-6 border-b border-gray-500/10">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Seller Dashboard</h1>
              <p className="text-xs md:text-sm text-gray-500">Welcome, {user?.name}. Manage listings securely.</p>
            </div>
            <button onClick={() => navigate('/dashboard/seller/create')} className="w-full sm:w-auto px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm">
              <Plus size={18} /> List New SaaS
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-3xl border border-gray-500/10 bg-[var(--accent-bg)] flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">${sales.reduce((acc, s) => acc + (s.amountPaid / 100), 0).toLocaleString()}</div>
                <span className="text-xs text-gray-400">Total Sales</span>
              </div>
              <Wallet size={24} className="text-green-500" />
            </div>

            <div className="p-6 rounded-3xl border border-gray-500/10 bg-[var(--accent-bg)] flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{approvedListings.length}</div>
                <span className="text-xs text-gray-400">Active Listings</span>
              </div>
              <BarChart3 size={24} className="text-blue-500" />
            </div>
          </div>

          {/* Pending Approvals Section */}
          {pendingListings.length > 0 && (
            <div className="mt-8 mb-12">
              <h2 className="text-xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Pending Approvals ({pendingListings.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pendingListings.map((l) => (
                  <div key={l._id} className="p-6 border border-yellow-500/20 rounded-3xl bg-[var(--accent-bg)] relative group overflow-hidden">
                    <div className="h-32 rounded-2xl bg-black/10 overflow-hidden mb-4 relative">
                      {l.images && l.images.length > 0 ? (
                        <img src={l.images[0]} alt="" className="w-full h-full object-cover opacity-70" />
                      ) : (
                        <span className="flex items-center justify-center h-full text-3xl font-bold opacity-30">{l.title?.charAt(0)}</span>
                      )}
                      <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">Pending</span>
                    </div>
                    <h4 className="font-bold text-[var(--text-h)] mb-1 truncate">{l.title}</h4>
                    <p className="text-sm text-[var(--accent)] font-bold mb-4">${l.price?.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(l)} className="flex-1 py-2 bg-white/5 border border-gray-500/10 hover:border-blue-500/30 text-xs font-bold rounded-xl text-blue-400 hover:bg-blue-500/10 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteListing(l._id)} className="flex-1 py-2 bg-white/5 border border-gray-500/10 hover:border-red-500/30 text-xs font-bold rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                        Take Down
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Posts Preview */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Approved Posts</h2>
              <button onClick={() => navigate('/dashboard/seller/posts')} className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            {approvedListings.length === 0 ? (
              <p className="text-sm text-gray-500">No approved listings yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {approvedListings.slice(0, 3).map((l) => (
                  <div key={l._id} className="p-6 border border-gray-500/10 rounded-3xl bg-[var(--accent-bg)] relative group overflow-hidden">
                    <div className="h-32 rounded-2xl bg-black/10 overflow-hidden mb-4 relative">
                      {l.images && l.images.length > 0 ? (
                        <img src={l.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="flex items-center justify-center h-full text-3xl font-bold opacity-30">{l.title?.charAt(0)}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-[var(--text-h)] mb-1 truncate">{l.title}</h4>
                    <p className="text-sm text-[var(--accent)] font-bold mb-4">${l.price?.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(l)} className="flex-1 py-2 bg-white/5 border border-gray-500/10 hover:border-blue-500/30 text-xs font-bold rounded-xl text-blue-400 hover:bg-blue-500/10 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteListing(l._id)} className="flex-1 py-2 bg-white/5 border border-gray-500/10 hover:border-red-500/30 text-xs font-bold rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                        Take Down
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'create' && (
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto bg-[var(--accent-bg)] p-4 md:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Post New SaaS Opportunity</h2>
          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Title</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Short Pitch (Quick overview)</label>
            <textarea required rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-[var(--text-h)]" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Long Description (Optional - displayed on details page)</label>
            <textarea rows="6" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} placeholder="Provide in-depth tech architecture, monetization routes, operational overheads..." className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-[var(--text-h)]" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Price ($ USD)</label>
              <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-[var(--text-h)]">
                <option value="AI">Artificial Intelligence</option>
                <option value="Fintech">Fintech</option>
                <option value="E-commerce">E-commerce</option>
                <option value="DevTools">Developer Tools</option>
                <option value="SaaS">General SaaS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Product Images (Max 3)</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[var(--accent)] file:text-[var(--bg)] hover:file:opacity-90" />
            
            {images.length > 0 && (
              <div className="flex gap-4 mt-4">
                {images.map((img, idx) => {
                  let imgUrl = "";
                  try {
                    imgUrl = URL.createObjectURL(img);
                  } catch (e) {
                    imgUrl = "";
                  }
                  return (
                    <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden border border-[var(--border)] bg-black/20 flex items-center justify-center relative">
                      {imgUrl ? (
                        <img src={imgUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500 font-bold">Img</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button type="submit" disabled={submitting} className="w-full py-3.5 bg-[var(--accent)] text-[var(--bg)] font-bold rounded-xl hover:opacity-90 transition-opacity">
            {submitting ? 'Uploading Product...' : 'Post SaaS Now'}
          </button>
        </form>
      )}

      {activeTab === 'posts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myListings.map((l) => (
            <div key={l._id} className={`p-6 border rounded-2xl bg-[var(--accent-bg)] flex items-center gap-4 ${l.isApproved ? 'border-gray-500/10' : 'border-yellow-500/20'}`}>
              <div className="w-16 h-16 rounded-xl bg-black/10 overflow-hidden relative flex-shrink-0">
                {l.images && l.images.length > 0 ? (
                  <img src={l.images[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="flex items-center justify-center h-full text-2xl font-bold opacity-30">{l.title?.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold truncate text-[var(--text-h)]">{l.title}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${l.isApproved ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                    {l.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-[var(--accent)] font-bold mb-3">${l.price?.toLocaleString()}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(l)} className="px-3 py-1 bg-white/5 border border-gray-500/10 hover:border-blue-500/30 text-xs font-bold rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteListing(l._id)} className="px-3 py-1 bg-white/5 border border-gray-500/10 hover:border-red-500/30 text-xs font-bold rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-h)]">Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Performance overview of your SaaS listings</p>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: `$${sales.reduce((acc, s) => acc + (s.amountPaid || 0), 0).toLocaleString()}`, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
              { label: 'Total Sales', value: sales.length, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { label: 'Total Clicks', value: myListings.reduce((acc, l) => acc + (l.clicks || 0), 0).toLocaleString(), color: 'text-[var(--accent)]', bg: 'bg-[var(--accent)]/10 border-[var(--accent)]/20' },
              { label: 'Active Listings', value: myListings.filter(l => l.isApproved && !l.isSold).length, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
            ].map((stat) => (
              <div key={stat.label} className={`p-5 rounded-2xl border bg-[var(--accent-bg)] ${stat.bg} flex flex-col gap-2`}>
                <span className={`text-2xl md:text-3xl font-extrabold ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Per-Listing Performance */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Per-Listing Performance</h2>
            {myListings.length === 0 ? (
              <p className="text-sm text-gray-500 p-6 border border-[var(--border)] rounded-2xl bg-[var(--accent-bg)]">No listings yet. Create your first SaaS listing to see analytics.</p>
            ) : (
              <div className="space-y-3">
                {myListings.sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).map(l => {
                  const maxClicks = Math.max(...myListings.map(x => x.clicks || 0), 1);
                  const pct = Math.round(((l.clicks || 0) / maxClicks) * 100);
                  const isSold = l.isSold;
                  return (
                    <div key={l._id} className="p-4 md:p-5 bg-[var(--accent-bg)] border border-[var(--border)] rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-black/20 overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-bold text-gray-500">
                          {l.images && l.images.length > 0
                            ? <img src={l.images[0]} alt="" className="w-full h-full object-cover" />
                            : l.title?.charAt(0)
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-[var(--text-h)] truncate">{l.title}</p>
                            {isSold && <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">Sold</span>}
                            {l.isApproved && !isSold && <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">Active</span>}
                          </div>
                          <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3">
                            <span><strong className="text-[var(--text-h)]">{l.clicks || 0}</strong> clicks</span>
                            <span><strong className="text-[var(--text-h)]">${l.price?.toLocaleString()}</strong> listed</span>
                          </div>
                          <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-[var(--accent)] rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sales History */}
          {sales.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Recent Sales</h2>
              <div className="space-y-3">
                {sales.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[var(--accent-bg)] border border-[var(--border)] rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-h)]">{s.listingId?.title || 'Listing'}</p>
                      <p className="text-[11px] text-gray-500">{new Date(s.purchasedAt || s.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className="font-extrabold text-green-400 text-sm">+${(s.amountPaid || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal Overlay */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--accent-bg)] border border-gray-500/10 p-8 rounded-3xl max-w-xl w-full relative space-y-4 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-[var(--text-h)]">Edit SaaS Listing</h2>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Title</label>
                <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-sm text-[var(--text-h)]" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Description (Short Pitch)</label>
                <textarea required rows="3" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-sm text-[var(--text-h)]" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Long Description (Optional)</label>
                <textarea rows="4" value={editLongDescription} onChange={(e) => setEditLongDescription(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-sm text-[var(--text-h)]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Price ($ USD)</label>
                  <input type="number" required value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-sm text-[var(--text-h)]" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Category</label>
                  <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-full bg-[var(--bg)] border border-gray-500/20 px-4 py-3 rounded-xl focus:outline-none text-sm text-[var(--text-h)]">
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Fintech">Fintech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="DevTools">Developer Tools</option>
                    <option value="SaaS">General SaaS</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 bg-[var(--accent)] text-[var(--bg)] font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingListing(null)} className="flex-1 py-3 bg-white/5 border border-gray-500/10 hover:bg-white/10 font-bold rounded-xl text-sm transition-colors text-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {deletingListingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--accent-bg)] border border-gray-500/10 p-8 rounded-3xl max-w-sm w-full relative text-center space-y-6 shadow-2xl"
          >
            <h3 className="text-lg font-bold text-[var(--text-h)]">Are you sure?</h3>
            <p className="text-sm text-gray-400">Do you really want to take this post down? This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button onClick={confirmDeleteListing} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                Yes, Take Down
              </button>
              <button onClick={() => setDeletingListingId(null)} className="flex-1 py-3 bg-white/5 border border-gray-500/10 hover:bg-white/10 font-bold rounded-xl text-sm transition-colors text-gray-400">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
