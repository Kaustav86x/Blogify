import React from "react";
import {ToastContainer } from "react-toastify"
import Navbar from "../components/navbar";



const Welcome = () => {

    return(
    <div className="absolute inset-0 w-full h-fit min-h-screen bg-gradient-to-b from-[#2A6F97] via-[#2C7DA0] to-[#61A5C2] bg-repeat z-[-1]">
    
    <div className="w-full min-h-screen overflow-x-hidden">
    {/* toaster */}
    
    {/* navbar */}
    <Navbar/>
  {/*login/signup button  */}
  <div className="w-full flex justify-end pr-6 pt-5">
    <div></div>
  <div className="flex items-center gap-2 rounded-[10px] p-1">
    <button className="text-black text-xl font-'Poor_Story' px-3 py-1 rounded hover:bg-white/20 cursor-pointer">
      <a href="" target="_blank">Log in</a>
    </button>
    <button className="bg-zinc-300 text-black text-xl font-'Poor_Story' px-4 py-1 rounded hover:bg-zinc-400 cursor-pointer">
      <a href="" target="_blank" >Sign Up</a>
    </button>
  </div>
</div>

  {/* hero section */}
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="w-full flex sm:flex-row flex-col gap-5 sm:px-28 px-6 pt-28 pb-14 items-center justify-center">
        {/* text and button */}
      <div className="w-full sm:w-[1400px] flex flex-col justify-center items-center gap-20">
      {/* w-full sm:w-[1000px] p-6 rounded-[20px] outline-1 outline-offset-[-1px] outline-gray-800 gap-7 mt-10 bg-white/30 backdrop-blur-sm */}
        <h1 className="text-black text-4xl md:text-6xl lg:text-8xl font-'Poor_Story' text-center">
          Turn your ideas into Blogs
        </h1>
        <button className="w-40 md:w-60 h-14 md:h-18 bg-zinc-300 rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] border border-black cursor-pointer">
          <span className="text-lg md:text-2xl font-bold uppercase font-'Poor_Story'">
            Explore more
          </span>
        </button>
      </div>
    </div>
  </div>
  {/* footer */}
</div>
</div>
    )
}

export default Welcome