import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import img1 from '../assets/1st Image.png';
import img2 from '../assets/2nd Image.png';
import img3 from '../assets/3rd Image.png';
import img4 from '../assets/4th Image.png';
import img5 from '../assets/5th Image.png';
import img6 from '../assets/6th Image.png';
import { useRef } from 'react';
import { toast, ToastContainer } from "react-toastify"


const AboutAuthor = () => {

  const navigate = useNavigate();

  const blogSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  const blogScrollToSection = () => {
    blogSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const contactScrollToSection = () => {
    contactSectionRef.current.scrollIntoView({behavior: "smooth" });
  }

  const aboutScrollToSection = () => {
    aboutSectionRef.current.scrollIntoView({behavior: "smooth" });
  }

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const[blogs, setBlogs] = useState(null);
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[message, setMessage] = useState("");
  const [showMoreBlogs, setShowMoreBlogs] = useState(false);
  const [showMorePics, setShowMorePics] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      setLoading(true);

      if(!name || !email ) {
        throw new Error("Please fill the mandatory fields")
      }

      const response = await axios.post('http://localhost:8080/api/contact/contact-us', {
        name,
        email,
        message,
      });

      if(response.status != 200) {
        throw new Error("An error occured !!!", response.status)
      }
      setName("")
      setEmail("")
      setMessage("")

      toast.success("Your details have been saved !")

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    catch(err) {
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  }

  const EstimatedReadTime = (content) => {
    const wordsPerMinute = 200; // average for an adult
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute)
    return time;
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/blog/blogs')
    .then((res) => {
      setBlogs(res.data);
      // console.log(res.data[0])
    }) 
    .catch((err) => {
      console.log(err);
    })
  },[]);

  // const handleClick = () => {
  //   const encodedTitle = encodeURIComponent(blog.title);
  //   navigate(`/blogs/title/${encodedTitle}`);
  // };

  return (
    <>
  <div className="min-h-screen w-full bg-sky-100">
  <ToastContainer/>
  <nav className="w-full px-4 shadow-md bg-sky-100 py-10">
  <div className="max-w-[1356px] w-full mx-auto flex flex-wrap items-center justify-center gap-y-4">

    <div className="flex flex-wrap gap-25 items-center text-black text-2xl font-poor-story">
      <a href="#">Home</a>
      <button className='cursor-pointer' onClick={() => navigate('/blog/all-blogs')}>Blogs</button>
      <button className='cursor-pointer' onClick={aboutScrollToSection}>About</button>
      <button className='cursor-pointer' onClick={contactScrollToSection}>Contact</button>
    </div>
  </div>
</nav>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

<div className="flex flex-col md:flex-row w-full min-h-screen gap-20 py-10">
  {/* Left section */}
  <div className="md:w-1/2 w-full flex justify-start items-center mb-10">
    <img
      className="w-full max-w-[636px] h-auto object-cover shadow-md"
      src={img1}
      alt="Left section"
    />
  </div>

  {/* Right section */}
  <div className="w-full lg:w-1/2 flex flex-col items-center px-4 py-6 relative">

  {/* Top border */}

  {/* Side border on large screens */}

  <div className="w-[622px] h-0 left-0 top-0 absolute border-t border-black mb-6"></div>
  <div className="w-[622px] h-0 left-[640px] top-[105px] absolute origin-top-left rotate-90 border-t border-black"></div>
  
  {/* Welcome Text */}
  <div className="text-4xl md:text-5xl font-poor-story text-black mb-6 text-center">
    Welcome....
  </div>

  {/* Image */}
  <img
    className="w-[80%] max-w-md h-auto mb-6 shadow-md"
    src={img2}
    alt="Main Visual"
  />

  {/* Title */}
  <div className="text-2xl md:text-4xl font-poor-story text-black mb-4 text-center">
    Dive into the oblivion
  </div>

  {/* Description */}
  <div className="text-base md:text-xl font-poor-story text-black mb-6 text-center px-4 md:px-0 max-w-lg">
    Diving deep into the world of peace, far far away from humanity. Leave everything....
  </div>

  {/* CTA Button */}
  <button className="bg-sky-200 text-2xl md:text-2xl font-poor-story border border-black px-6 py-3 shadow-md cursor-pointer">
    All Posts
  </button>

</div>

</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>


{/* recent blogs */}
<div className="w-full px-4 py-15 flex flex-col items-center bg-sky-100" ref={blogSectionRef}>
  {/* Section Title */}
  <div className="text-black text-5xl font-normal font-'Poor_Story' mb-8 text-center">
    Recent blogs
  </div>

  <div
  className={`w-full max-w-4xl flex flex-col items-center gap-10 transition-all duration-700 ease-in-out transform origin-top ${
    showMoreBlogs ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-100'
  }`}
>
  {/* Blog Section */}
  {/* <div className=""> */}
    {/* Blog Entry */}
    {blogs && blogs.length > 0 && 
     blogs
    .slice(0, showMoreBlogs ? 3 : 2)
    .map((blog) => (
      <div
        key={blog._id}
        className="w-full flex flex-row items-center gap-4 p-4 border border-gray-300 rounded-lg bg-sky-100 shadow-sm"
      >
        <img
          className="w-full max-w-sm h-auto object-cover rounded"
          src={img3}  
          alt="Blog thumbnail"
        />
        <div className='flex flex-col items-start justify-center gap-10 px-2'>
        <div className="text-black text-xl font-normal font-'Poor_Story' items-center">
          {new Date(blog.createdAt).toLocaleDateString()}  .  {EstimatedReadTime(blog.mainContent)} min read
        </div>
        <div className="text-black text-4xl font-normal font-'Poor_Story' items-center cursor-pointer" onClick={() => {
          const encodedTitle = encodeURIComponent(blog.title);
          navigate(`/blog/${encodedTitle}`);
        }}>
          {blog.title}
        </div>
        <p className="text-black text-xl font-normal font-'Poor_Story' line-clamp-3">
          {blog.mainContent}
        </p>
        </div>
      </div>
    ))}
  {/* </div> */}
  </div>
</div>

{blogs && blogs.length > 2 && (
<button onClick={() => setShowMoreBlogs(!showMoreBlogs)} 
className="px-8 py-3 bg-sky-200 border border-black shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] text-lg mx-auto block cursor-pointer">
  {showMoreBlogs ? 'Show Less' : 'Explore More'}
</button>
)}

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10 mb-20"></div>

{/* dylan thomas section */}
<div className='flex flex-row py-10 gap-50'>

<div className="w-1/2 flex flex-row items-center justify-end pr-10 gap-10">
    {/* Quote */}
    <div className="w-96">
      <div className="text-black text-4xl font-normal font-'Poor_Story' mb-2">
        “Do not go gentle into that good night. Rage, rage against the dying of the light.”
      </div>
      <br/>
      <span className="text-black text-xl font-normal font-'Poor_Story' ">
        - Dylan Thomas
      </span>
    </div>

    {/* Vertical line */}
    <div className="w-px h-170 bg-black mr-[-118px]" />
  </div>

<div className="h-[650px] flex justify-end w-1/2">
  <img
    className="max-w-3xl shadow-md object-cover"
    src={img4}
    alt="Visual"
  />
</div>
</div>

{/* kaustav's section */}
<div className="flex flex-row w-full">
  {/* Left section: 50% of screen */}
  <div className="w-1/2 h-[666px] relative">
  {/* Background Box */}
  <div className="absolute inset-0 bg-sky-300" />
  {/* Flex Centered Image */}
  <div className="absolute inset-0 flex items-center justify-center">
    <img
      className="w-[419px] h-[448px] object-cover"
      src={img5}
      alt="Placeholder"
    />
  </div>
</div>



  {/* Middle section: lines and spacing */}
  <div className="relative w-[100px] flex flex-col items-center justify-start pt-6 ml-15">
    {/* Horizontal Line */}
    <div className="w-[622px] h-0 left-0 top-0 absolute border-t border-black mb-6"></div>
    {/* Vertical Line */}
    <div className="w-px h-150 bg-black rotate-0" />
  </div>

  {/* Right section: text content */}
  <div className="flex flex-col justify-center items-center w-[35%] px-6 space-y-10" ref={aboutSectionRef}>
    <div className="text-black text-4xl font-'Poor_Story'">Hi, I'm Kaustav</div>
    <div className="text-black text-3xl font-'Poor_Story'">
      A software engineer by profession and blogger by passion. I write on complex human thoughts
      and random topics people find “weird” and “different”.
    </div>
    <div className="bg-sky-200 px-8 py-3 border border-black shadow-md cursor-pointer">Read More
    </div>
  </div>
</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

{/* things stir up my thoughts */}

<div className="w-full px-4 py-15 flex flex-col items-center bg-sky-100">
<div className="text-center justify-start text-black text-4xl font-normal font-'Poor_Story' mb-15">
  Every picture tells a story, tell me which one you like the most !
</div>

<div className="w-full flex flex-col justify-center items-center gap-10 transition-all duration-700 ease-in-out">
  <div className='w-full flex flex-row justify-center gap-5'>
    <div className="flex flex-row justify-center gap-5">
    {[...Array(4)].map((_, i) => (
    <img key={i} className="w-72 h-56 cursor-pointer rounded-sm" src={img6} />
    ))}
    </div>
  </div>
  
  <div className='w-full flex flex-row justify-center gap-5'>
    <div className="flex flex-row justify-center gap-5">
    {[...Array(4)].map((_, i) => (
    <img key={i} className="w-72 h-56 cursor-pointer rounded-sm" src={img6} />
    ))}
    </div>
  </div>

  <div
    className={`transition-all duration-700 ease-in-out overflow-hidden ${
      showMorePics ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
    }`}
  > 
  {/* {showMorePics && */}
  <>
  <div className='w-full flex flex-row justify-center gap-5'>
    <div className="flex flex-row justify-center gap-5">
    {[...Array(4)].map((_, i) => (
    <img key={i} className="w-72 h-56 cursor-pointer rounded-sm" src={img6} />
    ))}
    </div>
  </div>

  <div className='w-full flex flex-row justify-center gap-5 mt-10'>
    <div className="flex flex-row justify-center gap-5">
    {[...Array(4)].map((_, i) => (
    <img key={i} className="w-72 h-56 cursor-pointer rounded-sm" src={img6} />
    ))}
    </div>
  </div>
  </>
</div>

  {/* toggle button */}
<button onClick={() => setShowMorePics(!showMorePics)} 
className="px-8 py-3 bg-sky-200 border border-black shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] text-lg mx-auto block cursor-pointer">
  {showMorePics ? 'Show Less' : 'Explore More'}
</button>
</div>
</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

{/* contact me */}

<div className="w-full px-4 py-15 flex flex-col items-center bg-sky-100 gap-15" ref={contactSectionRef}>
  {/* Heading */}
  <div className="text-black text-5xl font-normal font-'Poor_Story' mb-8 text-center">
    Drop a thought, comment or anything you’d like to say!
  </div>

  {/* Form Fields Container */}
  <div className="w-1/2 flex flex-col items-start gap-20">
    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="name">Name</label>
    <input
      id="name"
      value={name}
      type="text"
      onChange={(e) => setName(e.target.value)} required
      className="w-full border-b border-black bg-transparent focus:outline-none text-black placeholder:text-gray-500 mb-[-10px]"
    />

    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="name">Email</label>
    <input
      id="name"
      value={email}
      type="email"
      onChange={(e) => setEmail(e.target.value)} required
      className="w-full border-b border-black bg-transparent focus:outline-none text-black placeholder:text-gray-500 mb-[-10px]"
    />

    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="name">Message</label>
    <input
      id="name"
      value={message}
      type="text"
      onChange={(e) => setMessage(e.target.value)}
      className="w-full border-b border-black bg-transparent focus:outline-none text-black placeholder:text-gray-500 mb-[-10px]"
    />
  </div>

  {/* Submit Button */}
  <button className="mt-8 px-10 py-1 bg-sky-200 border border-black shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] text-lg cursor-pointer" onClick={handleSubmit} disabled={loading}>
    {loading ? `Loading...` : `Submit`}
  </button>
</div>
{/* </div> */}

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20"></div>

<div className="w-full border-t border-black mt-10" />

<span className='flex justify-center'>@Blogify. All rights reserved</span>

</div>
    </>
  )
}

export default AboutAuthor