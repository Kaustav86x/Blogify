import React from 'react'
import img4 from '../assets/4th Image.png';

const DylanThomas = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center py-10 gap-10 px-6 lg:pr-0">

          <div className="flex flex-col items-center justify-end lg:items-end lg:w-1/2 text-center lg:text-right lg:pl-20 lg:pr-50">
            <span className="text-black text-2xl sm:text-3xl md:text-4xl font-poor-story mb-4" data-aos="fade-right">
              “Do not go gentle into that good night.<br/>
              Rage, rage against <br/> 
              the dying of the light.”
            </span>
            <span className="text-black text-lg sm:text-xl font-poor-story">
              - Dylan Thomas
            </span>
          </div>
          
          <div className="hidden md:block left-0 top-24 lg:h-[520px] border-l border-black"></div>

          <div className="lg:w-1/2 w-full flex lg:justify-end justify-center">
            <img
              className="w-full max-w-2xl shadow-md object-cover"
              src={img4}
              alt="Visual"
              data-aos="fade-left"
            />
          </div>
        </div>
  )
}

export default DylanThomas