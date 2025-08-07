import { useEffect, useState } from "react";
import  { Card, CardBody } from 'react-bootstrap';
import Placeholder from "react-bootstrap/Placeholder";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Footer from "../components/Footer";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    axios.get("http://localhost:8080/api/blog/blogs") // Replace with actual API URL
      .then((response) => {
        setBlogs(response.data)
        // console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-sky-100">
    <nav className="w-full px-4 shadow-md bg-sky-100 py-10">
    <div className="max-w-[1356px] w-full mx-auto flex flex-wrap items-center justify-center gap-y-4">

    <div className="flex flex-wrap gap-25 items-center text-black text-2xl font-poor-story">
      <button className='cursor-pointer' onClick={() => navigate('/')}>Home</button>
      <button className='cursor-pointer' onClick={() => navigate('/blog/all-blogs')}>Blogs</button>
      <button className='cursor-pointer' onClick={aboutScrollToSection}>About</button>
      <button className='cursor-pointer' onClick={contactScrollToSection}>Contact</button>
    </div>
  </div>
  </nav>

  <div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>


    <div className="p-6 max-w-5xl mx-auto font-poor-story">
      <h1 className="text-4xl font-bold text-center mb-6">Latest Blogs</h1>
      <div className="flex items-center justify-center min-h-[350px] gap-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Placeholder key={index} className="h-60 w-full rounded-lg" />
          ))
        ) : (
          blogs.map((blog) => (
            <motion.div 
              key={blog._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-30 relative blog">
                <CardBody className="p-4 blogBody">
                  <h2 className="text-xl font-semibold mb-2 title">{blog.title}</h2>
                  { !blog.mainContent ? (
                    <div className="flex justify-center items-center text-black">
                      <div>
                        {blog.subHeadings.map((sub, index) => (
                          <div key={index}>
                            <h1 className="col-span-2 text-xl font-semibold mb-2 title">{sub.title}</h1>
                            <div className="text-gray-600 col-span-2 line-clamp-3 content">{sub.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    ) : (<div className="text-gray-600 line-clamp-3 content ">{blog.mainContent}</div>)}
                  {/* <a href={`/blog/${blog._id}`} className="text-blue-500 mt-2 inline-block">Read More</a> */}
                </CardBody>
              </Card>
              <div className="flex flex-row absolute cursor-pointer ml-3" onClick={() => {
                {
                const encodedTitle = encodeURIComponent(blog.title);
                navigate(`/blog/${encodedTitle}`);
                }
              }}>
                  <img src="" alt=""></img>
                <div className="">Read More</div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>

    <div className="w-11/12 flex flex-col h-0 border-t border-black ml-20"></div>
    
    {/* footer */}
    <Footer/>


    </div>
  );
}

export default AllBlogs
