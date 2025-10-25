import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { SlugBlogs } from '../helper/TitleToSlug';
import { useRef } from 'react';
import { defaultSchema } from 'hast-util-sanitize';
import DOMPurify from 'dompurify';

const RecentBlogs = () => {

 const blogSectionRef = useRef(null);

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
    <div
      className="w-full px-4 py-10 flex flex-col items-center bg-sky-100"
      ref={blogSectionRef}
      data-aos="zoom-in"
    >
      <h2 className="text-black text-4xl sm:text-5xl font-poor-story mb-20 text-center">
        Recent blogs
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10">
        {SlugBlogs.slice(0, 3).map((blogContent, index) => (
          <div className="w-full sm:w-[45%] lg:w-1/4 flex flex-col gap-6" key={blogContent.slug}>
            <ReactMarkdown rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}>
              {stripHtml(blogContent.content).slice(0, NoOfChar) +
                (stripHtml(blogContent.content).length > NoOfChar ? '...' : '')}
            </ReactMarkdown>

            {SlugBlogs.some(blog => blog.content === blogContent.content) && (
              <div className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full font-bold text-center sm:text-left">
                <Link to={`/blog/${SlugBlogs.find(blog => blog.content === blogContent.content).slug}`}>
                  Read More →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentBlogs