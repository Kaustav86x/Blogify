import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "hast-util-sanitize";
import ScrollToTop from "../components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

const AboutMe = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const schema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      span: [...(defaultSchema.attributes?.span || []), "style"],
    },
  };

  useEffect(() => {
    AOS.init();

    const loadMarkdown = async () => {
      try {
        // dynamically load the raw markdown file
        const res = await import("../assets/AboutMe.md?raw");
        setContent(res.default);
      } catch (err) {
        console.error("Error loading AboutMe.md:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, []);

  return (
    <div className="min-h-screen w-full bg-sky-100">
    <Navbar />

    <div className="w-11/12 mx-auto border-t border-black mt-4 sm:mt-8"></div>

  {/* Main content area */}
  <main className="flex-grow flex items-center justify-center bg-sky-100 px-4 sm:px-6">
    <div className="w-full max-w-3xl text-left">
      <div className="typewriter">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-poor-story text-center mt-6 sm:mt-10">
          Hi, This is Kaustav
        </h1>
      </div>

      {loading ? (
        <p className="text-center mt-8 text-gray-500 text-base sm:text-lg">
          Loading content...
        </p>
      ) : (
        <div data-aos="fade-up" data-aos-duration="1000" className="mt-6 sm:mt-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 font-poor-story text-center">
            A Software Engineer and Passionate Blogger
          </h2>

          <ReactMarkdown
            rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema], remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4"
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
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  </main>

  <Footer />
  <ScrollToTop />
    </div>

  );
};

export default AboutMe;