import { useEffect, useState } from "react";
import  { Card, CardBody } from 'react-bootstrap';
import Placeholder from "react-bootstrap/Placeholder";
import { motion } from "framer-motion";
import axios from "axios";
import './allBlogs.css';

export default function BlogShowcase() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/blogs/all") // Replace with actual API URL
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Latest Blogs</h1>
      <div className="flex items-center justify-center min-h-screen">
      {/* flex items-center justify-center min-h-screen */}
      {/* grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6  */}
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
                  <div className="text-gray-600 content">{blog.content}</div>
                  {/* <a href={`/blog/${blog._id}`} className="text-blue-500 mt-2 inline-block">Read More</a> */}
                </CardBody>
              </Card>
            </motion.div>
          ))
        )}
        {/* rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 */}
      </div>
    </div>
  );
}
