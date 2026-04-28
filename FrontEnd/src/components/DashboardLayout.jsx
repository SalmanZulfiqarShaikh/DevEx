import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  PlusSquare, 
  User, 
  MessageSquare, 
  Grid,
  LogOut,
  ShieldCheck,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import devexLogo from '../assets/DevEx_dark.webp';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const isDarkMode = theme === 'dark';

  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await axios.get('http://localhost:3000/chat/unread-count', { withCredentials: true });
        setUnreadCount(res.data.count);
      } catch (err) {
        console.error("Failed to read unread counts", err);
      }
    };
    fetchUnread();
    const timer = setInterval(fetchUnread, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isSeller = role === 'seller';

  const sidebarItems = [
    { 
      name: 'Overview', 
      icon: Grid, 
      path: isSeller ? '/dashboard/seller' : '/dashboard/buyer' 
    },
    ...(isSeller ? [
      { name: 'Create Post', icon: PlusSquare, path: '/dashboard/seller/create' },
      { name: 'Last Posts', icon: ShoppingBag, path: '/dashboard/seller/posts' }
    ] : [
      { name: 'Last Buys', icon: ShoppingBag, path: '/dashboard/buyer/buys' }
    ]),
    { name: 'Chats', icon: MessageSquare, path: '/chat' },
    { name: 'Edit Profile', icon: User, path: '/profile' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--accent-bg)] border-r border-[var(--border)] flex flex-col fixed h-screen z-30">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
          <Link to="/" className="text-sm font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg border border-[var(--border)] overflow-hidden flex items-center justify-center bg-black">
              <img src={devexLogo} alt="DevEx" className="w-full h-full object-cover" />
            </div>
            DEVEX <span className="text-[var(--accent)] font-extrabold uppercase text-[10px] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">{role || 'GUEST'}</span>
          </Link>

          <button 
            onClick={toggleTheme} 
            className="ml-auto p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-[var(--border)] rounded-xl text-gray-400 hover:text-[var(--text-h)] transition-all cursor-pointer flex items-center justify-center"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-400" />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <div 
                key={item.name} 
                onClick={(e) => {
                  e.preventDefault();
                  if (!user && item.path !== '/dashboard/buyer' && item.path !== '/dashboard/seller') {
                    navigate('/login');
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all group cursor-pointer ${
                  isActive 
                  ? 'bg-[var(--accent)] text-[var(--bg)]' 
                  : 'text-gray-400 hover:text-[var(--text-h)] hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={18} className={`${isActive ? 'text-[var(--bg)]' : 'text-gray-500 group-hover:text-[var(--accent)]'} transition-colors`} />
                <span className="flex-1">{item.name}</span>
                {item.name === 'Chats' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold shadow animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-[var(--border)] bg-black/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] font-bold overflow-hidden">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt="" className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || 'U'
                )}
              </div>
              <div className="truncate w-28">
                <p className="text-xs font-bold text-[var(--text-h)] truncate">{user?.name || 'User'}</p>
                <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
