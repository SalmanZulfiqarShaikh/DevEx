import { useRef, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  const listingsRef = useRef(null)

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
<<<<<<< Updated upstream
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cookies" element={<MainLayout><Cookies /></MainLayout>} />
      <Route path="/terms" element={<MainLayout><TermsOfService /></MainLayout>} />
      <Route path="/story" element={<MainLayout><Story /></MainLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
      <Route path="/dashboard/seller" element={<SellerDashboard />} />
      </Routes>
=======
        <h1>DevnasnfasoasoEx</h1>
>>>>>>> Stashed changes
    </>
  )
}

export default App
