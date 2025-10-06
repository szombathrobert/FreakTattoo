import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import TattooGallery from './components/Tattoo'
import PiercingGallery from './components/Piercing'

const Home = () => {
  return (
    <div>
      <div className="Hero" id='hero'>
        <Hero />
      </div>
      <div className="About" id='about'>
        <About />
      </div>
      <div className="Services">
        <Services />
      </div>
      <div className="Tattoo-Slider">
        <TattooGallery />
      </div>
      <div className="Piercing-Slider">
        <PiercingGallery />
      </div>
    </div>
  )
}

export default Home