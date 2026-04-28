import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const res = await axios.put('http://localhost:3000/profile', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Profile updated!');
      // Update local context manually
      if (localStorage.getItem('user')) {
        const stored = JSON.parse(localStorage.getItem('user'));
        stored.name = res.data.name;
        stored.profilePic = res.data.profilePic;
        localStorage.setItem('user', JSON.stringify(stored));
      }
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const userProfilePic = user?.profilePic;
  const picSrc = userProfilePic ? (userProfilePic.startsWith('http') ? userProfilePic : `http://localhost:3000${userProfilePic}`) : null;

  return (
    <div className="p-8 max-w-md mx-auto mt-12 flex flex-col justify-center min-h-[60vh] relative">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full border border-gray-500/20 overflow-hidden bg-black/30 flex items-center justify-center relative shadow-xl mb-4 group cursor-pointer">
          {picSrc ? (
            <img src={picSrc} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <svg className="w-full h-full text-gray-500 bg-[var(--accent-bg)] p-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          )}
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-h)]">Edit Profile</h1>
        <p className="text-xs text-gray-400 mt-1">Manage details for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--accent-bg)] p-8 rounded-3xl border border-gray-500/10 shadow-2xl">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Display Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[var(--bg)] border border-gray-500/20 text-[var(--text-h)] px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--accent)]/50 transition-colors text-sm" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Change Profile Picture</label>
          <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[var(--accent)] file:text-[var(--bg)] file:cursor-pointer hover:file:opacity-90 file:transition-opacity" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-3.5 bg-[var(--accent)] text-[var(--bg)] font-bold rounded-xl hover:opacity-95 transition-opacity text-sm shadow-lg shadow-[var(--accent)]/20">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
