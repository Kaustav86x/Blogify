import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import img5 from '../assets/5th Image.png';
import 'aos/dist/aos.css';


const MySection = () => {

  const aboutSectionRef = useRef(null);

  return (
    <div className="flex flex-col md:flex-row w-full p-2">
      {/* Left Image */}
      <div className="relative md:w-1/2 h-[400px] md:h-[666px] flex justify-center items-center bg-sky-300">
        <img className="w-2/3 max-w-sm h-auto object-cover" src={img5} alt="Kaustav" data-aos="fade-left" />
      </div>

      {/* Right Text */}
      <div
        className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 px-6 py-10 space-y-6 text-center md:text-left"
        data-aos="fade-right"
        id="about"
        ref={aboutSectionRef}
      >
        {/* <div className="relative w-[100px] flex flex-col items-center justify-start pt-6 ml-15"> */}
        {/* Horizontal Line */}
        <div className=''>
        <div className="w-[122px] h-0 left-0 top-0 absolute border-t border-black mb-6"/>

        {/* Vertical Line */}

        <div className='flex lg:flex-row'>
        {/* <div className="w-px h-150 bg-black rotate-0" /> */}
        {/* </div> */}

        <div className='flex flex-col'>
        <h3 className="text-black text-3xl sm:text-4xl font-poor-story pb-3">Hi, I'm Kaustav</h3>
        <p className="text-black text-lg sm:text-2xl font-poor-story p-10">
          A software engineer by profession and blogger by passion. I write on complex human thoughts
          and random topics people find “weird” and “different”.
        </p>
        <Link to="/about/Kaustav">
          <button className="bg-sky-200 px-6 py-2 border border-black shadow-md cursor-pointer">
            Read More
          </button>
        </Link>
        </div>
        
        </div>

        </div>

      </div>
    </div>
  )
}

export default MySection