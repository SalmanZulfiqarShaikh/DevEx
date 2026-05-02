import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Check, Trash2, Shield, Eye, Search, X } from 'lucide-react';

const AdminDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/listings', { withCredentials: true });
      setListings(res.data);
    } catch (err) {
      toast.error('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/admin/listings/${id}/approve`, {}, { withCredentials: true });
      toast.success('Listing Approved');
      if (selectedListing && selectedListing._id === id) {
        setSelectedListing(prev => ({ ...prev, isApproved: true }));
      }
      fetchListings();
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`http://localhost:3000/admin/listings/${id}`, { withCredentials: true });
      toast.success('Listing Deleted');
      setSelectedListing(null);
      fetchListings();
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.sellerId?.name && l.sellerId.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingListings = filteredListings.filter(l => !l.isApproved);
  const approvedListings = filteredListings.filter(l => l.isApproved);

  if (loading) return <div className="p-12 text-gray-500 font-bold">Loading Admin Portal...</div>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-500/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center border border-red-500/20">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-h)]">Admin Moderation</h1>
            <p className="text-xs md:text-sm text-gray-400">Review and approve SaaS submissions</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search listings or sellers..."
            className="w-full bg-[var(--accent-bg)] border border-gray-500/20 px-4 py-2.5 pl-10 rounded-xl focus:outline-none focus:border-[var(--accent)]/50 text-sm text-[var(--text-h)]"
          />
          <Search size={16} className="absolute left-3 top-3.5 text-gray-500" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-500/10 pb-px">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`pb-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'pending' ? 'border-[var(--accent)] text-[var(--text-h)]' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
        >
          Pending ({pendingListings.length})
        </button>
        <button 
          onClick={() => setActiveTab('approved')}
          className={`pb-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'approved' ? 'border-[var(--accent)] text-[var(--text-h)]' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
        >
          Active Marketplace ({approvedListings.length})
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'pending' ? pendingListings : approvedListings).map((listing) => (
          <div key={listing._id} className="bg-[var(--accent-bg)] border border-[var(--border)] rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Image/Placeholder */}
            <div className="aspect-video bg-black/30 rounded-2xl mb-4 overflow-hidden relative border border-gray-500/10">
              {listing.images && listing.images.length > 0 ? (
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-xs uppercase tracking-widest bg-gray-500/5">No Image Available</div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 bg-white/5 text-gray-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-gray-500/10">
                  {listing.category || 'SaaS'}
                </span>
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-[var(--text-h)] transition-colors"
                  title="View Full Details"
                >
                  <Eye size={16} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-h)] mt-3 mb-1 line-clamp-1">{listing.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">{listing.description}</p>
              
              <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-500/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-500/20 border border-gray-500/10">
                    {listing.sellerId?.profilePic ? (
                      <img src={listing.sellerId.profilePic.startsWith('http') ? listing.sellerId.profilePic : `http://localhost:3000${listing.sellerId.profilePic}`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">{listing.sellerId?.name?.charAt(0)}</div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">Seller: <span className="font-bold text-[var(--text-h)]">{listing.sellerId?.name || 'Unknown'}</span></span>
                </div>
                <span className="text-lg font-extrabold text-[var(--accent)]">${listing.price}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              {activeTab === 'pending' && (
                <button 
                  onClick={() => handleApprove(listing._id)}
                  className="flex-1 py-3 bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Check size={16} /> Approve
                </button>
              )}
              <button 
                onClick={() => handleDelete(listing._id)}
                className={`py-3 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${activeTab === 'pending' ? 'w-12' : 'flex-1'}`}
                title="Delete Listing"
              >
                <Trash2 size={16} /> {activeTab === 'approved' && 'Delete Listing'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--accent-bg)] border border-gray-500/10 p-6 md:p-8 rounded-3xl max-w-2xl w-full relative space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedListing(null)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-[var(--text-h)] transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 border-b border-gray-500/10 pb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-500/20 border border-gray-500/10">
                {selectedListing.sellerId?.profilePic ? (
                  <img src={selectedListing.sellerId.profilePic.startsWith('http') ? selectedListing.sellerId.profilePic : `http://localhost:3000${selectedListing.sellerId.profilePic}`} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-400">{selectedListing.sellerId?.name?.charAt(0)}</div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-h)]">{selectedListing.title}</h3>
                <p className="text-xs text-gray-400">Seller: <span className="font-bold text-[var(--accent)]">{selectedListing.sellerId?.name}</span> ({selectedListing.sellerId?.email})</p>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedListing.images && selectedListing.images.map((img, idx) => (
                <img key={idx} src={img} alt="" className="rounded-2xl w-full h-48 object-cover border border-gray-500/10" />
              ))}
              {(!selectedListing.images || selectedListing.images.length === 0) && (
                <div className="col-span-2 h-48 bg-black/30 rounded-2xl flex items-center justify-center text-gray-500 font-bold text-sm border border-gray-500/10">No Images Provided</div>
              )}
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedListing.demoUrl && (
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <span className="text-[10px] font-bold uppercase text-blue-400 block mb-1">Demo Link</span>
                  <a href={selectedListing.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 font-bold hover:underline truncate block">{selectedListing.demoUrl}</a>
                </div>
              )}
              {selectedListing.repoUrl && (
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                  <span className="text-[10px] font-bold uppercase text-purple-400 block mb-1">Repository Link</span>
                  <a href={selectedListing.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 font-bold hover:underline truncate block">{selectedListing.repoUrl}</a>
                </div>
              )}
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Short Pitch</span>
                <p className="text-sm text-[var(--text-h)] bg-black/20 p-4 rounded-xl border border-gray-500/10">{selectedListing.description}</p>
              </div>

              {selectedListing.longDescription && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Long Description</span>
                  <p className="text-sm text-gray-300 bg-black/20 p-4 rounded-xl border border-gray-500/10 whitespace-pre-line">{selectedListing.longDescription}</p>
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-500/10 gap-4">
              <div>
                <span className="text-xs text-gray-400">Price:</span>
                <div className="text-2xl font-extrabold text-[var(--accent)]">${selectedListing.price}</div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {!selectedListing.isApproved && (
                  <button 
                    onClick={() => handleApprove(selectedListing._id)}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Check size={16} /> Approve
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(selectedListing._id)}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'pending' ? pendingListings : approvedListings).length === 0 && (
        <div className="text-center py-12 text-gray-500 font-medium text-sm">No listings found.</div>
      )}
    </div>
  );
};

export default AdminDashboard;
