import React from 'react'
import img4 from '../assets/4th Image.png';
import { motion } from 'framer-motion';

const DylanThomas = () => {
  return (
    <motion.section
  className="flex flex-col lg:flex-row min-h-[400px] mb-10 overflow-hidden"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>

  {/* Left: Quote Section */}
  <div 
    className="flex-1 flex flex-col justify-center p-12 lg:p-20 
               animate-fade-in-up [animation-delay:200ms]"
  >
    <div className="text-2xl lg:text-3xl italic mb-6 text-dark leading-relaxed
                    bg-gradient-to-r from-black/90 to-black/40 bg-clip-text text-transparent">
      “Do not go gentle into that good night. Rage, rage against the dying of the light.”
    </div>

    <div className="text-lg text-gray-600 text-right font-medium">
      —Dylan Thomas
    </div>
  </div>

  {/* Animated Vertical Divider (only on lg screens) */}
  <div className="hidden lg:flex justify-center">
    <div className="w-px bg-black animate-divider-grow"></div>
  </div>

  {/* Right: Image Section */}
  <div 
    className="flex-1 flex items-center justify-center p-12 lg:p-20 
               animate-fade-in-up [animation-delay:400ms]"
  >
    <div className="relative overflow-hidden rounded-lg shadow-xl group 
                    transition-all duration-500 ease-out">

      {/* Main Image */}
      <img
        className="object-cover rounded-sm 
                  transition-transform duration-700 ease-out
                  group-hover:scale-110 group-hover:rotate-[1deg]"
        src={img4}
        alt="Visual"
      />

      {/* Glass Shine Effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      opacity-0 group-hover:opacity-100 
                      transition-all duration-700 pointer-events-none
                      translate-x-[-200%] group-hover:translate-x-[200%]"></div>
    </div>
  </div>

</motion.section>
  )
}

export default DylanThomas