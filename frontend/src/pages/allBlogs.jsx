import { useEffect, useState } from "react";
import  { Card, CardBody } from 'react-bootstrap';
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { SlugBlogs } from "../helper/TitleToSlug";
import { SlugPieces } from "../helper/Pieces";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from 'hast-util-sanitize';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/navbar";

const AllBlogs = () => {
  
      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const schema = {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          span: [...(defaultSchema.attributes?.span || []), "style"],
        }
      };

  const NoOfCharForBlog = 180;
  const NoOfCharForPoem = 30;

  const stripHtml = ( content ) => {
  const cleanHtml = DOMPurify.sanitize(content);
  const tmp = document.createElement("div");
  tmp.innerHTML = cleanHtml;
  return tmp.textContent || tmp.innerText || "";
}

// calculate the estimated read time
  const EstimatedReadTime = (content) => {
    const wordsPerMinute = 200; // average for an adult
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute)
    return `${time} min read\n`;
}


      
  return (
    <div className="min-h-screen w-full bg-sky-100">
  <Navbar />

  {/* Top border */}
  <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

  {/* Heading */}
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-8 mb-10 font-'Poor_Story' px-4">
    Pick up the pieces and complete the puzzle!
  </h1>

  {/* Main content container */}
  <div className="flex-grow w-full max-w-6xl mx-auto p-4 sm:p-6 font-poor-story">
    {/* Blogs Section */}
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">Blogs</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
      {SlugBlogs.map((blogContent, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between h-full max-h-[470px]">
            <CardBody className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
              <div className="flex flex-col gap-4 sm:gap-6 flex-grow">
                <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                  <span className="italic tracking-wide">
                    {EstimatedReadTime(blogContent.content)}
                  </span>
                </div>

                <ReactMarkdown rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}>
                  {stripHtml(blogContent.content).slice(0, NoOfCharForBlog) +
                    (stripHtml(blogContent.content).length > NoOfCharForBlog ? "..." : "")}
                </ReactMarkdown>
              </div>

              {SlugBlogs.some((blog) => blog.content === blogContent.content) && (
                <div className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full font-bold mt-4 text-sm sm:text-base">
                  <Link
                    to={`/blog/${
                      SlugBlogs.find((blog) => blog.content === blogContent.content).slug
                    }`}
                  >
                    Read More →
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Poems Section */}
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-16 mb-8">Poems</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
      {SlugPieces.map((poemContent, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between h-full max-h-[450px]">
            <CardBody className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
              <div className="flex flex-col gap-4 sm:gap-6 flex-grow">
                <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                  <span className="italic tracking-wide">
                    {EstimatedReadTime(poemContent.content)}
                  </span>
                </div>

                <ReactMarkdown rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}>
                  {stripHtml(poemContent.content).slice(0, NoOfCharForPoem) +
                    (stripHtml(poemContent.content).length > NoOfCharForPoem ? "..." : "")}
                </ReactMarkdown>
              </div>

              {SlugPieces.some((poem) => poem.content === poemContent.content) && (
                <div className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full font-bold mt-4 text-sm sm:text-base">
                  <Link
                    to={`/poem/${
                      SlugPieces.find((poem) => poem.content === poemContent.content).slug
                    }`}
                  >
                    Read More →
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Bottom border */}
  <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

  {/* Footer */}
  <Footer />

  <ScrollToTop />
    </div>

    
  );
}

export default AllBlogs
