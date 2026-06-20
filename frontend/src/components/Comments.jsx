import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import validator from 'validator';
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { TimeAgo } from "../helper/TimeStamp";

const Comments = ({ postId }) => {

    const commentSectionRef = useRef(null);

    const[comments, setComments] = useState([]);
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[comment, setComment] = useState("");
    const[loading, setLoading] = useState("");
    const[error, setError] = useState("");
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        fetch(`https://blogify-backend-snowy.vercel.app/api/comments/${postId}`,{
          cache: "no-store"   // to prevent caching and always get the latest comments
        })
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch(() => setError("Failed to load comments"));
    },[postId]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError("");

    try {
        setLoading(true);
        

        if(!name || !email || !comment) {
            throw new Error("Please fill the mandatory fields");
        }

        if(validator.isEmail(email) === false) {
            throw new Error("Please enter a valid email address")
        }

        const response = await axios.post("https://blogify-backend-snowy.vercel.app/api/comments", {
          postId: postId,
          name: name,
          email: email,
          comment: comment
        });
    
      if (response.status != 201) throw new Error("An error occured", response.status);

      const newComment = response.data;

      setComments([newComment, ...comments]);   // prepend instantly
      setName("")
      setEmail("")
      setComment("")
      
      toast.success("Posted successfully");

    } catch(err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = () => {
  if (!email.trim()) {
    setEmailError("Email is required");
  } else {
    setEmailError("");
  }
};

  return (
    <motion.div
  className="w-full px-4 py-15 flex flex-col items-center bg-sky-100 gap-15"
  id="contact"
  ref={commentSectionRef}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
>
    <div className="w-full px-4 py-16 flex flex-col items-left bg-sky-100 gap-15" id="comment" ref={commentSectionRef}>
       <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-poor-story mb-4 text-left">
        Post a comment
      </h2>

      <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col gap-10">
      <label className="text-black text-lg sm:text-xl font-poor-story">Name</label>
          <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border-b border-black bg-transparent focus:outline-none text-black"
          required
          />

        <label className="text-black text-lg sm:text-xl font-poor-story">Email
          <span className="text-red-500"> *</span>
        </label>
          <input
          type="email"
          value={email}
          onChange={(e) => {
      setEmail(e.target.value);
      if (emailError) setEmailError(""); // clear error on typing
    }}
    onBlur={validateEmail}
    className={`w-full border-b bg-transparent focus:outline-none placeholder:text-gray-500 mb-[-10px] 
    text-black border-black 
    ${emailError ? "border-red-500" : "border-black"}`}
        />

      <p className="text-gray-500 text-xs">
      Your email is kept private.
      </p>

    {/* Validation error */}
    {emailError && (
    <p className="text-red-500 text-xs">{emailError}</p>
)}

        <label className="text-black text-lg sm:text-xl font-poor-story">Comment</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full border-b border-black bg-transparent focus:outline-none text-black"
          rows="1"
        ></textarea>
        </div>

        <div className="items-left">
        <button
        className="px-8 py-3 bg-blue-100 border border-dark text-dark rounded transition-all hover:-translate-y-0.5 hover:bg-blue-200 font-medium cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
        >
      {loading ? `Posting...` : `Post`}
      </button>
      </div>

      <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

      {/* Comments list */}
      {comments.map((c, index) => (
    <div key={c._id}>
    <div className="py-4 sm:py-6">

      {/* Name + date row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-black font-poor-story text-base sm:text-lg">
            {c.name}
          </span>
        </div>

        <span className="text-gray-400 text-xs sm:text-sm">
          {TimeAgo(c.createdAt)}
        </span>
      </div>

      {/* Comment body */}
      <p className="text-black text-sm sm:text-base leading-relaxed pl-10">
        {c.comment}
      </p>
    </div>

    {/* Divider — skip after last comment */}
    {index < comments.length - 1 && (
      <div className="w-11/12 mx-auto border-t border-black opacity-10" />
    )}
    </div>
    ))}

      {comments.length === 0 && (
        <p style={{ fontSize: "13px", color: "#64748b", textAlign: "center", marginTop: "1rem" }}>
          No comments yet. Be the first!
        </p>
      )}
    </div>
    </motion.div>
  );
}

export default Comments