import { useRef } from 'react'
import './App.css'
import MainLayout from './components/MainLayout'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import FeaturedListings from './components/FeaturedListings'
import FAQ from './components/FAQ'
import Reviews from './components/Reviews'

function App() {
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

export default App

