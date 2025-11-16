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
import 'aos/dist/aos.css';
import RandomImage from '../components/RandomImage';
import ScrollToTopButton from '../components/ScrollToTop';
import validator from 'validator';
import Navbar from '../components/navbar';
import { motion } from "framer-motion";

const HomeDesktop = () => {

  const location = useLocation();

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

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

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



      const response = await axios.post('https://blogify-backend-umber.vercel.app/api/contact-us', {
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

  const validateEmail = () => {
  if (!email.trim()) {
    setEmailError("Email is required");
  } else {
    setEmailError("");
  }
};

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

<div className=''>
<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"/>

<motion.section
  className="flex flex-col lg:flex-row min-h-[600px]"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>

  <div className="flex-1 flex items-center justify-center p-12 lg:p-20">
    <div className="w-144 h-108 flex items-center justify-center text-dark text-lg">
      <div className="relative overflow-hidden rounded-lg shadow-xl group 
                transition-all duration-500 ease-out w-full max-w-[636px]">

        {/* Image */}
        <img
          src={img1}
          alt="Left section"
          className="w-full h-auto object-cover rounded-lg shadow-md
                     transition-transform duration-700 ease-out
                     group-hover:scale-110 group-hover:rotate-[1deg]"
        />

        {/* Glass Shine */}
        <div className="absolute inset-0 bg-gradient-to-r 
                        from-transparent via-white/10 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-all duration-700 pointer-events-none
                        translate-x-[-200%] group-hover:translate-x-[200%]"></div>
      </div>
    </div>
  </div>

  <div className="hidden lg:block w-px h-180 bg-black"></div>

  <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-20 space-y-8">
    <h1 className="text-4xl lg:text-5xl font-light text-center text-dark tracking-wide">Welcome</h1>

    <div className="relative overflow-hidden rounded-lg shadow-xl group 
                transition-all duration-500 ease-out w-[80%] max-w-md mb-6">

      {/* Main Image */}
      <img
        src={img2}
        alt="Main Visual"
        className="w-full h-auto object-cover rounded-sm
                   transition-transform duration-700 ease-out
                   group-hover:scale-110 group-hover:rotate-[1deg]"
      />

      {/* Glass Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r 
                      from-transparent via-white/10 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-all duration-700 pointer-events-none
                      translate-x-[-200%] group-hover:translate-x-[200%]"></div>
    </div>

    <h2 className="text-2xl lg:text-3xl font-medium text-center text-dark">Take a deep breath</h2>
    <p className="text-center max-w-md text-gray-600 leading-relaxed text-lg">Welcome to the world of randomness</p>

    <Link to="/pieces">
      <button className="px-8 py-3 bg-blue-100 border border-dark text-dark rounded transition-all hover:-translate-y-0.5 hover:bg-blue-200 font-medium cursor-pointer">
        Explore
      </button>
    </Link>
  </div>

</motion.section>


<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>


{/* recent blogs */}
<div className="w-full px-4 py-15 flex flex-col items-center bg-sky-100">

  <h2 className="text-black text-5xl font-poor-story mb-20 text-center">
    Recent Blogs
  </h2>

  <div className="w-full flex flex-wrap justify-center gap-12">
    {SlugBlogs.slice(0, 3).map((blogContent, index) => {

      const preview =
        stripHtml(blogContent.content).slice(0, NoOfChar) +
        (stripHtml(blogContent.content).length > NoOfChar ? "..." : "");

      return (
        <motion.div
          key={blogContent.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: index * 0.18 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 max-w-[320px] flex flex-col gap-6 p-6
                     rounded-xl bg-blue-100/10 backdrop-blur-md shadow-lg
                     border border-black/10 hover:shadow-xl hover:bg-blue-100 hover:-translate-y-1
                     transition-all duration-300"
        >
          <div className="text-gray-800 text-md leading-relaxed mb-2">
          <ReactMarkdown
            rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}
          >
            {preview}
          </ReactMarkdown>
          </div>

          <Link
            to={`/blog/${
              SlugBlogs.find((blog) => blog.content === blogContent.content).slug
            }`}
            className="font-semibold text-black relative inline-block group"
          >
            Read More →
            <span className="block h-[2px] bg-black w-0 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>
      );
    })}
  </div>
</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10 mb-20"></div>

<motion.section
  className="flex flex-col lg:flex-row min-h-[400px] mb-10 overflow-hidden"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>

  {/* Left: Quote Section */}
  <div 
    className="flex-1 flex flex-col justify-center p-12 lg:p-20 
               animate-fade-in-up [animation-delay:200ms]"
  >
    <div className="text-2xl lg:text-3xl italic mb-6 text-dark leading-relaxed
                    bg-gradient-to-r from-black/90 to-black/40 bg-clip-text text-transparent">
      “Do not go gentle into that good night. Rage, rage against the dying of the light.”
    </div>

    <div className="text-lg text-gray-600 text-right font-medium">
      —Dylan Thomas
    </div>
  </div>

  {/* Animated Vertical Divider (only on lg screens) */}
  <div className="hidden lg:flex justify-center">
    <div className="w-px bg-black animate-divider-grow"></div>
  </div>

  {/* Right: Image Section */}
  <div 
    className="flex-1 flex items-center justify-center p-12 lg:p-20 
               animate-fade-in-up [animation-delay:400ms]"
  >
    <div className="relative overflow-hidden rounded-lg shadow-xl group 
                    transition-all duration-500 ease-out">

      {/* Main Image */}
      <img
        className="object-cover rounded-sm 
                  transition-transform duration-700 ease-out
                  group-hover:scale-110 group-hover:rotate-[1deg]"
        src={img4}
        alt="Visual"
      />

      {/* Glass Shine Effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      opacity-0 group-hover:opacity-100 
                      transition-all duration-700 pointer-events-none
                      translate-x-[-200%] group-hover:translate-x-[200%]"></div>
    </div>
  </div>

</motion.section>

<motion.div
  className="flex flex-row w-full"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>

  {/* Left section: 50% of screen */}
  <div className="w-1/2 h-[666px] relative">
    <div className="absolute inset-0 bg-sky-300" />
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
    <div className="w-[622px] h-0 left-0 top-0 absolute border-t border-black mb-6"></div>
    <div className="w-px h-150 bg-black rotate-0" />
  </div>

  {/* Right section: text content */}
  <div className="flex flex-col justify-center items-center w-[35%] px-6 space-y-10" id="about" ref={aboutSectionRef}>
    <div className="text-black text-4xl font-medium">Hi, I'm Kaustav</div>
    <div className="text-gray-600 text-3xl font-'Poor_Story'">
      A software engineer by profession and blogger by passion. I write on complex human thoughts
      and random topics people find “weird” and “different”.
    </div>

    <Link to="/about/Kaustav">
      <button className="px-8 py-3 bg-blue-100 border border-dark text-dark rounded transition-all hover:-translate-y-0.5 hover:bg-blue-200 font-medium cursor-pointer">
        Read More
      </button>
    </Link>
  </div>

</motion.div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

{/* things stir up my thoughts */}
<RandomImage/>


<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

{/* contact me */}

<motion.div
  className="w-full px-4 py-15 flex flex-col items-center bg-sky-100 gap-15"
  id="contact"
  ref={contactSectionRef}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>

  {/* Heading */}
  <div className="text-black text-5xl font-normal font-'Poor_Story' mb-8 text-center">
    Drop a thought, comment or anything you’d like to say!
  </div>

  {/* Form Fields Container */}
  <div className="w-1/2 flex flex-col items-start gap-20">

    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="name">
      Name
    </label>
    <input
      id="name"
      value={name}
      type="text"
      onChange={(e) => setName(e.target.value)}
      required
      className="w-full border-b border-black bg-transparent focus:outline-none text-black placeholder:text-gray-500 mb-[-10px]"
    />

    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="email">
  Email<span className="text-red-500"> *</span>
</label>

<input
  id="email"
  value={email}
  type="email"
  onChange={(e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(""); // clear error on typing
  }}
  onBlur={validateEmail}
  className={`w-full border-b bg-transparent focus:outline-none placeholder:text-gray-500 mb-[-10px] 
    text-black border-black 
    ${emailError ? "border-red-500" : "border-black"}`}
/>

{emailError && (
  <p className="text-red-500 text-sm font-medium">{emailError}</p>
)}

    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="message">
      Message
    </label>
    <input
      id="message"
      value={message}
      type="text"
      onChange={(e) => setMessage(e.target.value)}
      className="w-full border-b border-black bg-transparent focus:outline-none text-black placeholder:text-gray-500 mb-[-10px]"
    />

  </div>

  {/* Submit Button */}
  <button
    className="px-8 py-3 bg-blue-100 border border-dark text-dark rounded transition-all hover:-translate-y-0.5 hover:bg-blue-200 font-medium cursor-pointer"
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading ? `Loading...` : `Submit`}
  </button>

</motion.div>

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

export default HomeDesktop