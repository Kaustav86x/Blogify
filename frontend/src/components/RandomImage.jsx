import { ThoughtsData } from "../helper/Thoughts";
import React, { useState} from "react";
import { motion } from "framer-motion";
// import '../App.css';

const RandomImage = () => {

    const intialThought = ThoughtsData[0].image;

    const [randomThought, setRandomThought] = useState(intialThought);
    const [fadeIn, setFadeIn] = useState(false);

    const getRandomImage = () => {
    setFadeIn(false);
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * ThoughtsData.length);
        setRandomThought(ThoughtsData[randomIndex].image);
        setFadeIn(true);
    }, 600);
    
    }

    return (
        <motion.div
  className="w-full px-4 py-15 flex flex-col items-center bg-sky-100"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>

  <div className="text-center justify-start text-black text-4xl font-normal font-'Poor_Story' mb-15">
    Every picture tells a story, tell me which one you like the most !
  </div>

  <div className="flex justify-center w-full px-4 mb-10 min-h-[350px]">

    {/* frontshot */}
    <div className="aspect-[4/5] realtive p-6 w-1/3 sm:w-1/5 lg:w-1/5 rounded-xl backdrop-blur-3xl bg-white/10 border border-white/20 shadow-lg">

      <img
        src={randomThought}
        className={`object-contain transition-all duration-300 ease-in-out cursor-pointer rounded-lg ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
    </div>

  </div>

  <button
    className="px-8 py-3 bg-blue-100 border border-dark text-dark rounded transition-all hover:-translate-y-0.5 hover:bg-blue-200 font-medium cursor-pointer"
    onClick={() => setRandomThought(getRandomImage())}
  >
    Generate
  </button>

</motion.div>  
    );
};

export default RandomImage;