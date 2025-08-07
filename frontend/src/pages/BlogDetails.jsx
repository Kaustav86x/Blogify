import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify"
import { useRef } from 'react';
import img1 from '../assets/1st Image.png';
import img2 from '../assets/2nd Image.png';
import img3 from '../assets/3rd Image.png';
import img4 from '../assets/4th Image.png';
import img5 from '../assets/5th Image.png';
import img6 from '../assets/6th Image.png';
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'


const BlogDetails = () => {

    const navigate = useNavigate();

    const { title } = useParams()
    const [blog, setBlog] = useState(null)

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

    const EstimatedReadTime = (content) => {
    const wordsPerMinute = 200; // average for an adult
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute)
    return time;
  }

  const formatMainContent = (content, subHeadings) => {
  if (!subHeadings || subHeadings.length === 0) return content;

  let formatted = content;

  subHeadings.forEach((sub) => {
    const headingText = sub.heading; // ✅ Change this to match your object structure
    if (typeof headingText === 'string') {
      const escapedSub = headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedSub, 'g');

      formatted = formatted.replace(
        regex,
        `<br/><br/><strong>${headingText}</strong><br/><br/>`
      );
    }
  });

  return formatted;
};


    useEffect(() => {
        axios.get(`http://localhost:8080/api/blog/${title}`)
        .then((res) => setBlog(res.data))
        .catch((err) => console.log(err))
    }, [title])

    if(!blog) return <div>Hello</div>
  return (
    <>
    <div className="min-h-screen w-full bg-sky-100">
  <ToastContainer/>
  <nav className="w-full px-4 shadow-md bg-sky-100 py-10">
  <div className="max-w-[1356px] w-full mx-auto flex flex-wrap items-center justify-center gap-y-4">

    <div className="flex flex-wrap gap-25 items-center text-black text-2xl font-poor-story">
      <button className='cursor-pointer' onClick={() => navigate('/')}>Home</button>
      <button className='cursor-pointer' onClick={blogScrollToSection}>Blogs</button>
      <button className='cursor-pointer' onClick={aboutScrollToSection}>About</button>
      <button className='cursor-pointer' onClick={contactScrollToSection}>Contact</button>
    </div>
  </div>
</nav>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

<div className="flex flex-col items-center px-4 md:px-8 py-10 max-w-4xl mx-auto">
  {/* Image */}
  <img 
    src={img5} 
    alt="Blog Main Visual"
    className="w-100 h-100 max-w-md md:max-w-xl shadow-md border border-black mb-8 " 
  />

  {/* Blog Title & Meta */}
  <div className="w-full text-center">
    <h1 className="text-3xl md:text-4xl font-normal font-'Poor_Story'] mb-10">{blog.title}</h1>
    <p className="text-base md:text-xl font-normal font-'Poor_Story' mb-10 text-gray-700">
      {new Date(blog.createdAt).toLocaleDateString()}  ·  {EstimatedReadTime(blog.mainContent)} min read
    </p>
  </div>

  {/* Blog Content */}
  {/* {blog.mainContent && blog.subHeadings.length > 0 && 
  blog.subHeadings.map((sub) => ( */}
  <div className="text-justify text-black text-base md:text-lg leading-7 font-'Poor_Story'"
  dangerouslySetInnerHTML={{
    __html: formatMainContent(blog.mainContent, blog.subHeadings),
  }}
  />
    {/* {blog.mainContent} */}
  {/* </div> */}
  {/* ))} */}
  

  {/* Author Note */}
  <div className="mt-12 text-center text-black text-base md:text-xl font-normal font-'Poor_Story'">
    Written and sketched by 
    <span className='relative ml-1 cursor-pointer group'>
      Kaustav
      <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
      </span>
  </div>
</div>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20"></div>

<Footer/>

</div>
    </>
  )
}

export default BlogDetails