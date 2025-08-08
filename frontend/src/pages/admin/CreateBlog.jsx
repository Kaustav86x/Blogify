import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Code from "@editorjs/code"

const CreateBlog = () => {
    
  const navigate = useNavigate();

  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const editorInstance = useRef(null);

  // editor js instance gets booted up, when the component is loaded !
  useEffect(() => {
    if(!editorInstance.current) {
        editorInstance.current = new EditorJS({
        holder: "editorjs",
        tools: {
            header: Header,
            list: List,
            code: Code,
            image: {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: "",  // backend endpoint for image uploads
                        byUrl: ""  // backend endpoints for url uploads
                    },
                },
            },
        },
    });
  }

  return () => {
    editorInstance.current?.destroy();
    editorInstance.current = null;
  };
}, [] );

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      setLoading(true);

      if(!title || !content ) {
        throw new Error("Please fill the mandatory fields")
      }

      const saveData = await editorInstance.current.save();
      console.log("blog Data:", saveData);

      const response = await axios.post('http://localhost:8080/api/blog/create', {
        title,
        saveData,  // JSON resposne of editor js
      });

      if(response.status != 200) {
        throw new Error("An error occured !!!", response.status)
      }
      setTitle("")
      setContent("")

      toast.success("Blog has been created !")

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    catch(err) {
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
 <div className="min-h-screen w-full bg-sky-100">
    <ToastContainer/>
  <nav className="w-full px-4 shadow-md bg-sky-100 py-10">
  <div className="max-w-[1356px] w-full mx-auto flex flex-wrap items-center justify-center gap-y-4">

    <div className="flex flex-wrap gap-25 items-center text-black text-2xl font-poor-story">
      <a href="#">Home</a>
      <button className='cursor-pointer' onClick={() => navigate('/blog/all-blogs')}>Blogs</button>
      <Link to='/#about' className='cursor-pointer'>About</Link>
      <Link to='/#contact' className='cursor-pointer'>Contact</Link>
    </div>
  </div>
</nav>

<div className="w-11/12 flex flex-col h-0 border-t border-black ml-20 mt-10"></div>

<div className="w-full px-4 py-15 flex flex-col items-start bg-sky-100 gap-15">
    <div className="text-black text-5xl font-normal font-'Poor_Story' mb-8 text-center">
    Create Blog
    </div>

  <div className="w-1/2 flex flex-col items-start gap-20">
    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="title">Title</label>
    <input
      id="title"
      value={title}
      type="text"
      onChange={(e) => setTitle(e.target.value)} required
      className="w-full border-b border-black bg-transparent focus:outline-none text-black placeholder:text-gray-500 mb-[-10px]"
    />

    <label className="text-black text-xl font-'Poor_Story' mb-[-25px]" htmlFor="content">Content</label>
    <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-black bg-white p-2 rounded h-40" id='editorjs'
          required
    />
  </div>

  {/* Submit Button */}
  <button className="mt-8 px-10 py-1 bg-sky-200 border border-black shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] text-lg cursor-pointer" onClick={handleSubmit} disabled={loading}>
    {loading ? `Loading...` : `Create`}
  </button>
</div>

</div>
    </>
  )
}

export default CreateBlog