import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-sky-100 flex flex-col items-center justify-center px-6 text-center select-none">

      {/* Dramatic 404 */}
      <h1 
        className="text-7xl md:text-9xl font-poor-story text-black mb-6"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        404
      </h1>

      {/* Poetic Blockquote */}
      <blockquote 
        className="text-xl md:text-3xl text-gray-800 font-poor-story italic leading-relaxed max-w-3xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        “Even pages, once written, can be lost in the long night.  
        And some paths, no matter how fiercely you search,  
        refuse to return your footsteps.”
      </blockquote>

      {/* Divider */}
      <div 
        className="w-48 border-t border-black my-8 opacity-40"
        data-aos="fade-in"
        data-aos-delay="400"
      ></div>

      {/* Secondary Poem Line */}
      <p 
        className="text-lg md:text-xl text-gray-700 font-poor-story mb-10 max-w-xl"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        But do not go gentle into confusion —  
        the way back home still burns with light.
      </p>

      {/* CTA Button */}
      <Link
        to="/"
        data-aos="fade-up"
        data-aos-delay="800"
        className="px-10 py-3 bg-sky-200 border border-black shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]
                   text-lg font-poor-story cursor-pointer 
                   hover:bg-sky-300 hover:shadow-lg transition-all duration-300"
      >
        Return Home
      </Link>

    </div>
  );
};

export default NotFound;