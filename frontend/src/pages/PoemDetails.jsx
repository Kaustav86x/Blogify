import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer } from "react-toastify"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from 'hast-util-sanitize';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import 'aos/dist/aos.css';
import Navbar from '../components/navbar'
import ScrollToTop from '../components/ScrollToTop'
import { SlugPieces } from '../helper/Pieces'
import AOS from "aos";
import "aos/dist/aos.css";
import '../App.css';

const PoemDetails = () => {
  const { slug } = useParams();
  const [poem, setPoem] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();

    const loadPoem = async () => {
      try {
        const poemData = SlugPieces.find((blog) => blog.slug === slug);
        if (!poemData) {
          console.log("No piece found for the slug:", slug);
          return;
        }
        const res = await import(`../assets/${poemData.title}.md?raw`);
        setPoem(res.default);
      } catch (error) {
        console.error("Error loading the piece:", error);
      }
    };

    loadPoem();
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
        <ToastContainer />
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
              {poem}
            </ReactMarkdown>
          </div>

          {/* Author credit */}
          <div className="mt-10 sm:mt-12 text-center text-black text-sm sm:text-base md:text-xl font-normal font-'Poor_Story'">
            Written and sketched by{" "}
            <span className="relative ml-1 cursor-pointer group">
              <Link to="/about/Kaustav">Kaustav</Link>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
        </div>

        {/* Bottom border */}
        <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
};

export default PoemDetails