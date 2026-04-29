import { useRef, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import MainLayout from './components/MainLayout'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import FeaturedListings from './components/FeaturedListings'
import FAQ from './components/FAQ'
import Reviews from './components/Reviews'
import Cookies from './components/Cookies'
import TermsOfService from './components/TermsOfService'
import Story from './components/Story'
import Login from './components/Login'
import Signup from './components/Signup'
import BuyerDashboard from './components/BuyerDashboard'
import SellerDashboard from './components/SellerDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import DashboardLayout from './components/DashboardLayout'
import ListingDetails from './components/ListingDetails'
import Chat from './components/Chat'
import Profile from './components/Profile'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import { Analytics } from '@vercel/analytics/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function HomePage() {
  const listingsRef = useRef(null)
  const { user, role } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (role === 'buyer') navigate('/dashboard/buyer');
      else if (role === 'seller') navigate('/dashboard/seller');
    }
  }, [user, role, navigate]);

  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <MainLayout>
      <Hero onBrowseClick={scrollToListings} />
      <About />
      <HowItWorks />
      <FeaturedListings ref={listingsRef} />
      <Reviews />
      <FAQ />
    </MainLayout>
  )
}

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cookies" element={<MainLayout><Cookies /></MainLayout>} />
      <Route path="/terms" element={<MainLayout><TermsOfService /></MainLayout>} />
      <Route path="/story" element={<MainLayout><Story /></MainLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
      
      <Route path="/dashboard/buyer" element={<DashboardLayout><BuyerDashboard /></DashboardLayout>} />
      <Route path="/dashboard/buyer/buys" element={<DashboardLayout><BuyerDashboard activeTab="buys" /></DashboardLayout>} />

      {/* Buyer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
      </Route>

      {/* Seller Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
        <Route path="/dashboard/seller" element={<DashboardLayout><SellerDashboard /></DashboardLayout>} />
        <Route path="/dashboard/seller/create" element={<DashboardLayout><SellerDashboard activeTab="create" /></DashboardLayout>} />
        <Route path="/dashboard/seller/posts" element={<DashboardLayout><SellerDashboard activeTab="posts" /></DashboardLayout>} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>

      {/* Shared Protected Chat/Profile */}
      <Route element={<ProtectedRoute allowedRoles={['buyer', 'seller']} />}>
        <Route path="/chat" element={<DashboardLayout><Chat /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
      </Route>
      
      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFound />} />
      
      </Routes>
      <Analytics />
    </>
  )
}

export default App
