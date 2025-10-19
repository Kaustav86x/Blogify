import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import img1 from '../assets/1st Image.png';
import img2 from '../assets/2nd Image.png';
import img4 from '../assets/4th Image.png';
import img5 from '../assets/5th Image.png';
import { useRef } from 'react';
import { toast, ToastContainer } from "react-toastify";
import ReactMarkdown from 'react-markdown';
import Footer from '../components/Footer';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from 'hast-util-sanitize';
import DOMPurify from 'dompurify';
import { SlugBlogs } from '../helper/TitleToSlug';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RandomImage from '../components/RandomImage';
import ScrollToTopButton from '../components/ScrollToTop';
import validator from 'validator';
import Navbar from '../components/navbar';

const Home = () => {

  const location = useLocation();

  const blogSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Delay the scroll to wait for page render
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [location]);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ 
      duration: 1400, 
      once: true 
    });
      AOS.refresh();
  }, []);

  // const[blogs, setBlogs] = useState(null);
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      setLoading(true);

      if(!name || !email ) {
        throw new Error("Please fill the mandatory fields")
      }

      if(validator.isEmail(email) === false) {
        throw new Error("Please enter a valid email address")
      }



      const response = await axios.post('https://blogify-backend-nine.vercel.app/api/contact-us', {
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
      // if(err.response && err.response.data && err.response.data.message) 
        // {
        toast.error(err.message)
        // return;
      // }
    } finally {
      setLoading(false);
    }
  }

const NoOfChar = 200;

const stripHtml = ( content ) => {
  const cleanHtml = DOMPurify.sanitize(content);
  const tmp = document.createElement("div");
  tmp.innerHTML = cleanHtml;
  return tmp.textContent || tmp.innerText || "";
}

// sorting the blogs based on publish date
SlugBlogs.sort((a,b) => b.publishDate - a.publishDate);
// console.log(SlugBlogs);

const schema = {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        span: [...(defaultSchema.attributes?.span || []), "style"],
      }
    };

  return (
    <>
  <ToastContainer/>
  <div className='bg-sky-100'>
  <div className="min-h-screen w-full bg-sky-100">
  
  <Navbar/>

<div className='' data-aos="fade-down">
<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

<div className="flex flex-col md:flex-row w-full min-h-screen gap-20 py-10">
  {/* Left section */}
  <div className="md:w-1/2 w-full flex justify-start items-center mb-10" data-aos="fade-right">
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
    alt="Main Visual" data-aos="fade-left"
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
  <Link to="/pieces">
  <button className="bg-sky-200 text-sm md:text-md font-poor-story border border-black px-4 py-2 shadow-md cursor-pointer">
    Explore
  </button>
  </Link>

</div>

</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>


{/* recent blogs */}
<div className="w-full px-4 py-15 flex flex-col items-center bg-sky-100" ref={blogSectionRef} data-aos="zoom-in" duration="1000000">
  {/* Section Title */}
  <div className="text-black text-5xl font-normal font-'Poor_Story' mb-20 text-center">
    Recent blogs
  </div>

<div className='w-full flex flex-row justify-center gap-10 mb-10'>
  
{SlugBlogs.slice(0,3).length > 0 && SlugBlogs.slice(0,3).map((blogContent, index) => (

<div className='w-1/4 flex flex-col gap-10' key={blogContent.slug}>
  <ReactMarkdown rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]} >
    {stripHtml(blogContent.content).slice(0, NoOfChar) + (stripHtml(blogContent.content).length > NoOfChar ? '...' : '')}
  </ReactMarkdown>
  
  {(SlugBlogs.length > 0 && SlugBlogs.some(blog => blog.content === blogContent.content)) ? (
    <div className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full font-bold" >
    <Link to={`/blog/${SlugBlogs.find(blog => blog.content === blogContent.content).slug}`} >Read More →</Link>
  </div>
  ) : (
    <div className='cursor-pointer hover:underline font-bold' >
    </div>
  )
  }
  
</div>

))}

</div>

</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10 mb-20"></div>

{/* dylan thomas section */}
<div className='flex flex-row py-10 gap-50'>

<div className="w-1/2 flex flex-row items-center justify-end pr-10 gap-10">
    {/* Quote */}
    <div className="w-96" data-aos="fade-right">
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
    alt="Visual" data-aos="fade-left"
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
      className="w-[419px] h-[448px] object-cover" data-aos="fade-left"
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
  <div className="flex flex-col justify-center items-center w-[35%] px-6 space-y-10" data-aos="fade-right" id='about' ref={aboutSectionRef}>
    <div className="text-black text-4xl font-'Poor_Story'">Hi, I'm Kaustav</div>
    <div className="text-black text-3xl font-'Poor_Story'">
      A software engineer by profession and blogger by passion. I write on complex human thoughts
      and random topics people find “weird” and “different”.
    </div>
    <Link to='/about/Kaustav'>
    <button className="bg-sky-200 px-8 py-3 border border-black shadow-md cursor-pointer">
      Read More
    </button>
    </Link>
  </div>
</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

{/* things stir up my thoughts */}
<RandomImage/>


<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

{/* contact me */}

<div className="w-full px-4 py-15 flex flex-col items-center bg-sky-100 gap-15" id='contact' ref={contactSectionRef}>
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
  <button className="mt-8 px-10 py-1 bg-sky-200 border border-black shadow-md text-sm cursor-pointer" onClick={handleSubmit} disabled={loading}>
    {loading ? `Loading...` : `Submit`}
  </button>
</div>
{/* </div> */}

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20"></div>

<Footer/>


</div>
<ScrollToTopButton/>
</div>
</div>
  </>
  )
}

export default Home