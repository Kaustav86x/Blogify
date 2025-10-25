import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "hast-util-sanitize";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { SlugBlogs } from "../helper/TitleToSlug";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();

  const loadBlog = async () => {
    try {
      const blogData = SlugBlogs.find((b) => b.slug === slug);

      if (!blogData) {
        console.error("No blog found for slug:", slug);
        return;
      }
      // Lazy load the markdown dynamically
      const res = await import(`../assets/${blogData.title}.md?raw`);
      setBlog(res.default);
    } catch (error) {
      console.error("Error loading the blog:", error);
    } 
  };

  loadBlog();

}, [slug]);


  const schema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      span: [...(defaultSchema.attributes?.span || []), "style"],
    },
  };

  return (
    <>
      <div className="min-h-screen w-full bg-sky-100">
        <Navbar />

        {/* Top border */}
        <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

        {/* Poem content */}
        <div
          className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-10 max-w-4xl mx-auto text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="white-space-pre-line container flex flex-col items-center">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-base sm:text-lg leading-relaxed text-gray-700 mb-3 sm:mb-4"
                  {...props}
                />
              ),
            }}
          >
            {blog}
          </ReactMarkdown>
          </div>

          <div className="mt-10 sm:mt-12 text-center text-black text-sm sm:text-base md:text-xl font-normal font-'Poor_Story'">
            Written and sketched by{" "}
            <span className="relative ml-1 cursor-pointer group">
              <Link to="/about/Kaustav">Kaustav</Link>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
        </div>

        <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

        <Footer />
      </div>

      <ScrollToTop />
    </>
  );
};

export default BlogDetails;
