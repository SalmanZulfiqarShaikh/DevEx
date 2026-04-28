import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, ArrowLeft, Shield } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        setLoading(true);
        // Fetch current listing
        const res = await axios.get(`http://localhost:3000/listing/${id}`);
        setListing(res.data);

        // Fetch similar listings by category
        let similarRes = await axios.get(`http://localhost:3000/listing?category=${res.data.category}`);
        let filtered = similarRes.data.filter(l => l._id !== id);
        
        // Fallback: If no similar category listings exist, get generic listings
        if (filtered.length === 0) {
          const genericRes = await axios.get(`http://localhost:3000/listing`);
          filtered = genericRes.data.filter(l => l._id !== id).slice(0, 3);
        }
        
        setSimilarListings(filtered);
      } catch (err) {
        console.error("Error fetching listing details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      if (!user) return navigate('/login');
      
      const res = await axios.post('http://localhost:3000/payments/enqueue', { listingId: id }, { withCredentials: true });
      if (res.data?.sessionUrl) {
        window.location.href = res.data.sessionUrl; // Redirect to Stripe
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to initiate purchase.");
    }
  };

  const handleChatWithSeller = () => {
    if (!user) return navigate('/login');
    
    // Extract populated seller info or use fallbacks
    const sId = listing?.sellerId?._id || listing?.sellerId;
    const sName = listing?.sellerId?.name || "Seller";
    const sPic = listing?.sellerId?.profilePic;
    
    navigate('/chat', { state: { sellerId: sId, sellerName: sName, sellerProfilePic: sPic } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-gray-400 font-bold">
        Loading listing...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-h)] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Listing Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-[var(--accent)] hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans pb-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--accent)] transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Visuals/Carousel */}
          <div className="flex flex-col gap-4">
            <div className="aspect-video rounded-2xl bg-black/10 border border-[var(--border)] flex items-center justify-center relative overflow-hidden group shadow-md">
              {listing.images && listing.images.length > 0 ? (
                <img src={listing.images[activeImage]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-[var(--accent)] text-4xl font-bold shadow-2xl animate-pulse">
                  {listing.title?.charAt(0)}
                </div>
              )}
            </div>

            {/* Thumbnails list */}
            {listing.images && listing.images.length > 1 && (
              <div className="flex gap-3 mt-2 overflow-x-auto pb-2 scrollbar-none">
                {listing.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === index ? 'border-[var(--accent)] scale-95 shadow-md shadow-[var(--accent)]/10' : 'border-[var(--border)] opacity-60 hover:opacity-100 hover:scale-95'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="bg-[var(--accent-bg)] border border-[var(--border)] p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[var(--accent)]/20 shadow-sm">
                {listing.category}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-[var(--text-h)] tracking-tight leading-tight">{listing.title}</h1>
            
            <p className="text-gray-400 leading-relaxed text-sm antialiased">{listing.description}</p>

            <div className="text-4xl font-extrabold text-[var(--text-h)] py-6 border-y border-[var(--border)] flex items-center justify-between">
              <span className="flex items-baseline gap-1">
                <span className="text-xl text-[var(--accent)] font-medium">$</span>
                {listing.price?.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full flex items-center gap-1 border border-green-500/20 shadow-sm">
                <Shield size={12} className="text-green-400" /> Escrow Protected
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[var(--accent)] text-[var(--bg)] font-bold text-sm h-14 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[var(--accent)]/25 active:scale-95"
              >
                <ShoppingBag size={18} /> Buy SaaS Now
              </button>
              
              <button 
                onClick={handleChatWithSeller}
                className="flex-1 bg-white/[0.03] border border-[var(--border)] text-[var(--text-h)] font-bold text-sm h-14 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/[0.06] hover:border-gray-500/30 transition-all active:scale-95 group"
              >
                <MessageSquare size={18} className="text-gray-500 group-hover:text-[var(--accent)] transition-colors" /> 
                Message Owner
              </button>
            </div>
          </div>
        </div>

        {/* Long Description Block */}
        <div className="mt-12 bg-[var(--accent-bg)] border border-[var(--border)] p-8 md:p-12 rounded-2xl">
          <h2 className="text-sm font-bold text-[var(--accent)] uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-4">
            Detailed Product Overview
          </h2>
          <div className="text-gray-400 leading-relaxed text-sm whitespace-pre-wrap antialiased">
            {listing.longDescription || listing.description}
          </div>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-[var(--text-h)] mb-8">Similar SaaS Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarListings.map((item) => (
                <Link 
                  to={`/listing/${item._id}`} 
                  key={item._id}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] hover:border-[var(--accent)]/30 transition-all group block relative overflow-hidden"
                >
                  {item.images && item.images.length > 0 ? (
                    <div className="h-32 rounded-xl overflow-hidden mb-4 bg-black/10">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  ) : (
                    <div className="h-32 rounded-xl flex items-center justify-center bg-black/10 text-xl font-bold text-[var(--accent)]/40 mb-4">{item.title?.charAt(0)}</div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.category}</span>
                  <h3 className="text-lg font-bold text-[var(--text-h)] mt-2 mb-1 group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>
                  <div className="font-bold text-[var(--text-h)]">${item.price?.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
