import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import TattooGallery from './components/Tattoo'
import PiercingGallery from './components/Piercing'
import Contact from './components/Contact'

const Home = () => {
  return (
    <div>
      <div className="Hero" id='hero'>
        <Hero />
      </div>
      <div className="About" id='about'>
        <About />
      </div>
      <div className="Services" id='services'>
        <Services />
      </div>
      <div className="Tattoo-Slider" id='work'>
        <TattooGallery />
      </div>
      <div className="Piercing-Slider">
        <PiercingGallery />
      </div>
      <div className="Contact" id='contact'>
        <Contact />
      </div>
    </div>
  )
}

export default Home