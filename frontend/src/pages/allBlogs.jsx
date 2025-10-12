import { useEffect, useState } from "react";
import  { Card, CardBody } from 'react-bootstrap';
import Placeholder from "react-bootstrap/Placeholder";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { SlugBlogs } from "../helper/TitleToSlug";
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from 'hast-util-sanitize';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

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

  // useEffect(() => {
  //   const blogData = SlugBlogs.find(blog => blog.slug === slug);
    
  //   if(!blogData) {
  //     console.log("No blog found for the slug:", slug);
  //     return;
  //   }
  //   const title = blogData.title;
  //   const content = blogData.content;
  //   setBlogs(content);
  // }, [slug]);

  const schema = {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          span: [...(defaultSchema.attributes?.span || []), "style"],
        }
      };

  const NoOfChar = 200;

  const stripHtml = ( content ) => {
  const cleanHtml = DOMPurify.sanitize(content);
  const tmp = document.createElement("div");
  tmp.innerHTML = cleanHtml;
  return tmp.textContent || tmp.innerText || "";
}
      
  return (
    <div className="min-h-screen w-full bg-sky-100">
    <nav className="w-full px-4 shadow-md bg-sky-100 py-10">
    <div className="max-w-[1356px] w-full mx-auto flex flex-wrap items-center justify-center gap-y-4">

    <div className="flex flex-wrap gap-25 items-center text-black text-2xl font-poor-story">
      <Link to='/' className='cursor-pointer'>Home</Link>
      <Link to='/blogs' className='cursor-pointer'>Blogs</Link>
      <Link to='/#about' className='cursor-pointer'>About</Link>
      <Link to='/#contact' className='cursor-pointer'>Contact</Link>
    </div>
  </div>
  </nav>

  <div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>


    <div className="p-6 max-w-5xl mx-auto font-poor-story">
      <h1 className="text-4xl font-bold text-center mb-10">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full px-4 mb-10">
        {SlugBlogs.length > 0 &&
          SlugBlogs.map((blogContent, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 relative blog flex flex-col justify-between h-full max-h-[450px]">
                <CardBody className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-6 flex-grow">
          <ReactMarkdown rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}>
            {stripHtml(blogContent.content).slice(0, NoOfChar) +
              (stripHtml(blogContent.content).length > NoOfChar ? "..." : "")}
          </ReactMarkdown>
        </div>

        {SlugBlogs.length > 0 &&
        SlugBlogs.some((blog) => blog.content === blogContent.content) ? (
          <div className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full font-bold mt-4">
            <Link
              to={`/blog/${
                SlugBlogs.find((blog) => blog.content === blogContent.content)
                  .slug
              }`}
            >
              Read More →
            </Link>
          </div>
        ) : (
          <div className="cursor-pointer hover:underline font-bold"></div>
        )}
      </CardBody>
              </Card>
            </motion.div>
          ))
        }
      </div>
    </div>

    <div className="w-11/12 flex flex-col h-0 border-t border-black ml-20"></div>
    
    {/* footer */}
    <Footer/>


    </div>
  );
}

export default AllBlogs
