import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/1st Image.png';
import img2 from '../assets/2nd Image.png';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
  <motion.section
  className="flex flex-col lg:flex-row min-h-[600px]"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>

  <div className="flex-1 flex items-center justify-center p-12 lg:p-20">
    <div className="w-144 h-108 flex items-center justify-center text-dark text-lg">
      <div className="relative overflow-hidden rounded-lg shadow-xl group 
                transition-all duration-500 ease-out w-full max-w-[636px]">

        {/* Image */}
        <img
          src={img1}
          alt="Left section"
          className="w-full h-auto object-cover rounded-lg shadow-md
                     transition-transform duration-700 ease-out
                     group-hover:scale-110 group-hover:rotate-[1deg]"
        />

        {/* Glass Shine */}
        <div className="absolute inset-0 bg-gradient-to-r 
                        from-transparent via-white/10 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-all duration-700 pointer-events-none
                        translate-x-[-200%] group-hover:translate-x-[200%]"></div>
      </div>
    </div>
  </div>

  <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-20 space-y-8">
    <h1 className="text-4xl lg:text-5xl font-light text-center text-dark tracking-wide">Welcome</h1>

    <div className="relative overflow-hidden rounded-lg shadow-xl group 
                transition-all duration-500 ease-out w-[80%] max-w-md mb-6">

      {/* Main Image */}
      <img
        src={img2}
        alt="Main Visual"
        className="w-full h-auto object-cover rounded-sm
                   transition-transform duration-700 ease-out
                   group-hover:scale-110 group-hover:rotate-[1deg]"
      />

      {/* Glass Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r 
                      from-transparent via-white/10 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-all duration-700 pointer-events-none
                      translate-x-[-200%] group-hover:translate-x-[200%]"></div>
    </div>

    <h2 className="text-2xl lg:text-3xl font-medium text-center text-dark">Take a deep breath</h2>
    <p className="text-center max-w-md text-gray-600 leading-relaxed text-lg">Welcome to the world of randomness</p>

    <Link to="/pieces">
      <button className="px-8 py-3 bg-blue-100 border border-dark text-dark rounded transition-all hover:-translate-y-0.5 hover:bg-blue-200 font-medium cursor-pointer">
        Explore
      </button>
    </Link>
  </div>

</motion.section>
  )
}

export default HeroSection