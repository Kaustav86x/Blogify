import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { SlugBlogs } from '../helper/TitleToSlug';
import { useRef } from 'react';
import { defaultSchema } from 'hast-util-sanitize';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

const RecentBlogs = () => {

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
  )
}

export default RecentBlogs