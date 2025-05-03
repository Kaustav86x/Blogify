import React from "react";
import Bookmark from '../assets/Bookmark.svg'



const Welcome = () => {

    return(
        <div className="w-[1404px] h-[811px] mx-auto relative bg-gradient-to-b from-lime-400 to-lime-500 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-1 outline-black">
            <div className="w-56 h-12 relative">
            <div className="flex w-30 h-11 left-[30px] top-[10px] absolute justify-start text-black text-4xl font-normal font-'Poor_Story' gap-1.5">
                <img src={Bookmark} alt="Bookmark" className="w-30 h-10"/>BLOGIFY
            </div>
            {/* <div data-size="48" className="w-12 h-12 left-0 top-0 absolute overflow-hidden">
            <div className="w-7 h-9 left-[10px] top-[6px] absolute outline-4 outline-offset-[-2px] outline-Icon-Default-Default" />
            </div> */}
</div>
        {/* Your content here */}
      </div>      
    )
}

export default Welcome