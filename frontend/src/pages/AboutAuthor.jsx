import React from 'react'

const AboutAuthor = () => {

  return (
    <>
    {/* navbar */}
    <div className="w-screen h-full min-h-screen bg-gradient-to-b from-sky-200 shadow-0px_4px_4px_0px_rgba(0,0,0,0.25) outline outline-black">
        
  <nav className="w-full bg-white px-8 py-4 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    
    {/* Left Logo Section */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 relative overflow-hidden">
        <div className="w-7 h-9 left-[10px] top-[6.12px] absolute outline-4 outline-offset-[-2px]" />
      </div>
      <span className="text-4xl font-normal text-black font-poor-story">BLOGIFY</span>
    </div>

    {/* Navigation Links */}
    <div className="flex gap-8 items-center">
      <a href="#" className="text-2xl text-black font-normal font-poor-story">Home</a>
      <a href="#" className="text-2xl text-black font-normal font-poor-story">Blog</a>
      <a href="#" className="text-2xl text-black font-normal font-poor-story">From Author</a>
      <a href="#" className="text-2xl text-black font-normal font-poor-story">About</a>
      <a href="#" className="text-2xl text-black font-normal font-poor-story">Contact</a>
    </div>
  </div>
</nav>

<div className="w-full min-h-screen flex flex-col md:flex-row">

  {/* Left Side: Full height image sticking to the left */}
  <div className="w-full md:w-1/2">
    <img
      src="https://placehold.co/636x775"
      alt="Left"
      className="w-full h-[850px] object-cover border border-black shadow-md mt-30"
    />
  </div>

  {/* Right Side: Content */}
  {/* <div className='w-full md:w-1/2 flex flex-row'> */}
  <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-6 p-6 md:p-10 text-black font-poor-story text-center ml-40">

  <div className="w-full h-0 outline-1 outline-offset-[-0.50px] outline-black"></div>

  <h1 className="text-5xl font-normal">Welcome....</h1>

  <img
    src="https://placehold.co/354x266"
    alt="Main Visual"
    className="w-full h-auto object-cover border border-black shadow-md"
  />

  <h2 className="text-4xl">Dive into the oblivion</h2>

  <p className="text-xl leading-relaxed">
    Diving deep into the world of peace, far far away from humanity.
    <br />
    Leave everything....
  </p>
    
  <button className="w-40 h-14 bg-sky-200 border border-black shadow-md text-2xl">
    All Posts
  </button>

    {/* <div className="w-full h-0 rotate-90 outline-1 outline-offset-[-0.50px] outline-black"></div> */}
</div>
{/* </div> */}
</div>

<div className="w-full h-0 outline-1 outline-offset-[-0.50px] outline-black mt-20"></div>

<div className="w-full max-w-7xl mx-auto px-4 py-12">
  <h1 className="text-5xl font-'Poor_Story' mb-12 text-black">Recent Blogs</h1>

  {/* Blog Cards */}
  <div className="space-y-16">
    {/* Blog 1 */}
    <div className="flex flex-col md:flex-row items-start gap-6">
      <img src="https://placehold.co/355x340" alt="blog-1" className="w-full md:w-96 h-80 object-cover" />
      <div className="text-black font-'Poor_Story' space-y-4">
        <div className="text-xl">May 20, 2023 . 5 min read</div>
        <div className="text-4xl">Invisible</div>
        <p className="text-xl">
          This isn’t just a story. It’s not a cry for help. It’s not even mine alone. This is a voice....
        </p>
        <div className="text-2xl">Leave a comment</div>
      </div>
    </div>

    {/* Blog 2 */}
    <div className="flex flex-col md:flex-row items-start gap-6">
      <img src="https://placehold.co/355x340" alt="blog-2" className="w-full md:w-96 h-80 object-cover" />
      <div className="text-black font-'Poor_Story' space-y-4">
        <div className="text-xl">May 20, 2023 . 5 min read</div>
        <div className="text-4xl">Invisible</div>
        <p className="text-xl">
          This isn’t just a story. It’s not a cry for help. It’s not even mine alone. This is a voice....
        </p>
        <div className="text-2xl">Leave a comment</div>
      </div>
    </div>

    {/* Blog 3 */}
    <div className="flex flex-col md:flex-row items-start gap-6">
      <img src="https://placehold.co/355x340" alt="blog-3" className="w-full md:w-96 h-80 object-cover" />
      <div className="text-black font-'Poor_Story' space-y-4">
        <div className="text-xl">May 20, 2023 . 5 min read</div>
        <div className="text-4xl">Invisible</div>
        <p className="text-xl">
          This isn’t just a story. It’s not a cry for help. It’s not even mine alone. This is a voice....
        </p>
        <div className="text-2xl">Leave a comment</div>
      </div>
    </div>
  </div>

  {/* CTA Button */}
  <div className="mt-16 flex flex-col items-center">
    <button className="px-8 py-4 bg-sky-200 border border-black shadow text-4xl font-'Poor_Story'">Explore More</button>
  </div>
</div>

<div className="w-[1308px] h-px outline-1 outline-offset-[-0.50px] outline-black"></div>

<div>
{/* left section */}
<div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto items-center px-4 py-10 gap-10">
  {/* Left Section (Quote) */}
  <div className="md:w-1/2 text-center md:text-left px-4">
    <p className="text-3xl md:text-4xl font-'Poor_Story' text-black mb-4">
      “Do not go gentle into that good night. Rage, rage against the dying of the light.”
    </p>
    <p className="text-xl font-'Poor_Story' text-black">- Dylan Thomas</p>
  </div>

  {/* Right Section (Image) */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src="https://placehold.co/767x576"
      alt="Dylan Thomas Quote"
      className="w-full max-w-md h-auto border border-black shadow-md"
    />
  </div>
</div>

<div className="relative w-full max-w-[1358px] mx-auto min-h-[666px]">
  {/* Read More Button Box (hidden on small screens) */}
  <div className="hidden md:block absolute bg-sky-200 shadow border border-black w-48 h-16 bottom-12 right-8"></div>

  {/* Left Section */}
  <div className="absolute left-0 top-0 w-full md:w-[638px] h-full bg-sky-300 flex justify-center items-center p-4">
    <img
      className="w-80 md:w-96 h-auto"
      src="https://placehold.co/419x448"
      alt="Profile"
    />
  </div>

  {/* Horizontal Line */}
  <div className="hidden md:block absolute left-[665px] top-12 w-[693px] border-t border-black"></div>

  {/* Right Section */}
  <div className="absolute right-0 top-0 w-full md:w-[720px] h-full px-6 py-10 flex flex-col justify-center gap-6 text-black font-'Poor_Story'">
    <h1 className="text-3xl md:text-4xl">Hi, I’m Kaustav</h1>
    <p className="text-lg md:text-2xl leading-relaxed">
      A software engineer by profession and blogger by passion. I write complex code and deal with complex human thoughts and random topics people find “weird” and “different”.
    </p>

    <div className="md:hidden">
      {/* Button visible only on mobile */}
      <button className="w-40 h-12 bg-sky-200 border border-black shadow text-xl">
        Read More
      </button>
    </div>
  </div>

  {/* Read More Text (absolute on desktop) */}
  <div className="hidden md:block absolute bottom-10 right-16 text-black text-2xl font-'Poor_Story'">
    Read More
  </div>
</div>
</div>

<div className="w-[1275px] h-2 outline-1 outline-offset-[-0.50px] outline-amber-300"></div>

<div className="max-w-[1280px] mx-auto px-4 py-8">
  {/* Title */}
  <h2 className="text-center text-black text-4xl font-normal font-['Poor_Story'] mb-12">
    Things stir up my thoughts
  </h2>

  {/* Image Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 justify-items-center">
    <img className="w-72 h-56 object-cover" src="https://placehold.co/288x228" alt="Thought 1" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/288x228" alt="Thought 2" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/290x230" alt="Thought 3" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/288x228" alt="Thought 4" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/288x228" alt="Thought 5" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/288x228" alt="Thought 6" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/290x230" alt="Thought 7" />
    <img className="w-72 h-56 object-cover" src="https://placehold.co/288x228" alt="Thought 8" />
  </div>
</div>

<div className="w-[1275px] h-1.5 outline-1 outline-offset-[-0.50px] outline-black"></div>

<div className="w-[859px] h-[840px] relative font-['Poor_Story']">
  {/* Title */}
  <div className="w-[805px] h-20 absolute left-0 top-0 text-black text-4xl font-normal">
    Drop a thought, comment or anything you’d like to say !
  </div>

  {/* First Name Label */}
  <div className="w-32 h-10 absolute left-0 top-[128px] text-black text-xl font-normal">
    First Name
  </div>
  {/* First Name Input */}
  <input
    type="text"
    className="w-96 absolute left-0 top-[165px] border-b border-black outline-none bg-transparent"
  />

  {/* Last Name Label */}
  <div className="w-32 h-10 absolute left-[499px] top-[129px] text-black text-xl font-normal">
    Last Name
  </div>
  {/* Last Name Input */}
  <input
    type="text"
    className="w-96 absolute left-[499px] top-[165px] border-b border-black outline-none bg-transparent"
  />

  {/* Email Label */}
  <div className="w-32 h-10 absolute left-0 top-[343px] text-black text-xl font-normal">
    Email
  </div>
  {/* Email Input */}
  <input
    type="email"
    className="w-[859px] absolute left-0 top-[380px] border-b border-black outline-none bg-transparent"
  />

  {/* Message Label */}
  <div className="w-32 h-10 absolute left-0 top-[558px] text-black text-xl font-normal">
    Message
  </div>
  {/* Message Input */}
  <textarea
    rows={4}
    className="w-[859px] absolute left-0 top-[595px] border-b border-black outline-none bg-transparent resize-none"
  ></textarea>

  {/* Submit Button */}
  <button
    className="w-80 h-16 absolute left-[250px] top-[775px] bg-sky-200 border border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-2xl"
  >
    Submit
  </button>
</div>

<div className="w-[1275px] h-0 outline-1 outline-offset-[-0.50px] outline-black"></div>

<div className="w-[1440px] h-[489px] relative">
    <div className="w-[1440px] h-[489px] left-0 top-0 absolute opacity-70 bg-blend-linear-burn bg-stone-700" />
    <div className="w-40 h-11 left-[97.44px] top-[54.04px] absolute justify-start text-white text-4xl font-normal font-'Poor_Story'">BLOGIFY</div>
    <div className="w-14 h-6 left-[487.18px] top-[71.40px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">Home</div>
    <div className="w-11 h-7 left-[607.18px] top-[68.33px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">Blog<br/></div>
    <div className="w-35 h-6 left-[708.72px] top-[71.40px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">from Author</div>
    <div className="w-16 h-6 left-[880px] top-[72.42px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">About</div>
    <div className="w-20 h-6 left-[1000px] top-[69.35px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">Contact</div>
    
    <div className="w-32 left-[1220.51px] top-[65px] absolute inline-flex justify-start items-start gap-5">
        <div className="w-7 h-7 bg-white rounded-full" />
        <div className="w-3.5 h-3.5 bg-black" />
        <div className="w-7 h-7 bg-white" />
        <div className="w-7 h-7 bg-white rounded-full" />
        <div className="w-4 h-3.5 bg-black" />
    </div>

    <div className="w-28 h-7 left-[45px] top-[147px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">Contact me</div>
    <div className="w-64 h-6 left-[45px] top-[236px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">Email : deyk905@gmail.com</div>
    <div className="w-64 h-8 left-[45px] top-[190px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">Phn no : +91-9330360552</div>
    <div data-size="48" className="w-12 h-12 left-[31.79px] top-[52px] absolute overflow-hidden">
        <div className="w-7 h-9 left-[10.26px] top-[6.12px] absolute outline-4 outline-offset-[-2px] outline-Icon-Default-Default" />
    </div>

    <div className="w-[650.26px] px-10 py-14 left-[487.18px] top-[153px] absolute bg-white rounded-2xl inline-flex justify-start items-start gap-5 overflow-hidden">
        <div className="w-72 px-9 py-5 outline-1 outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5 overflow-hidden">
            <div className="justify-start text-black text-lg font-normal font-['Space_Grotesk']">Email</div>
        </div>
        <div data-property-1="Button tertiary" className="px-9 py-5 bg-black flex justify-start items-start gap-2.5">
            <div className="text-center justify-start text-white text-xl font-normal font-['Space_Grotesk'] leading-7">Subscribe to news</div>
        </div>
    </div>
    
    <div className="w-[1307.71px] h-0 left-[63.59px] top-[378px] absolute outline-1 outline-offset-[-0.50px] outline-white"></div>
    <div className="w-80 h-9 left-[31.79px] top-[413px] absolute justify-start text-white text-2xl font-normal font-'Poor_Story'">© 2025 Blogify. All Rights Reserved. </div>
</div>
</div>
  </>
  )
}

export default AboutAuthor