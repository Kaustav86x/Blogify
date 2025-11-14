import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/1st Image.png';
import img2 from '../assets/2nd Image.png';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen gap-10 sm:gap-20 py-10 px-4 sm:px-8">

      {/* Left Section */}
      <div className="md:w-1/2 w-full flex justify-center items-center mb-8 md:mb-0" data-aos="fade-right">
        <img
          className="w-full max-w-[600px] h-auto object-cover shadow-md"
          src={img1}
          alt="Left section"
        />
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 px-2 sm:px-6">

        {/* Decorative lines */}
        <div className="hidden md:block absolute top-0 left-0 w-full border-t border-black"></div>
        <div className="hidden md:block absolute left-0 top-24 h-[640px] border-l border-black"></div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-poor-story text-black mb-6">
          Welcome....
        </h1>

        <img
          className="w-4/5 max-w-md h-auto mb-6 shadow-md"
          src={img2}
          alt="Main Visual"
          data-aos="fade-left"
        />

        <h2 className="text-2xl sm:text-3xl font-poor-story text-black mb-4">
          Dive into the oblivion
        </h2>

        <p className="text-base sm:text-lg font-poor-story text-black mb-6 px-2 sm:px-0 max-w-lg">
          Diving deep into the world of peace, far far away from humanity. Leave everything....
        </p>

        <Link to="/pieces">
          <button className="bg-sky-200 text-sm sm:text-md font-poor-story border border-black px-4 py-2 shadow-md cursor-pointer">
            Explore
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection