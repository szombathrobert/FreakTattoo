import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'

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
    </div>
  )
}

export default Home