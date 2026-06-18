import { useState, useEffect } from "react";
import axios from 'axios';
import validator from 'validator';

const Comments = ({ postId }) => {

    const[comments, setComments] = useState([]);
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[comment, setComment] = useState("");
    const[loading, setLoading] = useState("");
    const[error, setError] = useState("");

    useEffect(() => {
        fetch(`/api/comments/${postId}`)
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

        // console.log("hello");
        
        const response = await axios.post("/api/comments", {
          postId: postId,
          name: name,
          email: email,
          comment: comment
        })
        .then((response) => response)
        .catch((err) => console.log(err));

      console.log(response);
      
      // console.log("huku")

      if (!response) throw new Error();

      const newComment = response.data;
      // console.log(newComment);

      setComments([newComment, ...comments]);   // prepend instantly
      setName("");
      setEmail("");
      setComment("");
    } catch {
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Comments</h2>

      {/* Form */}
      <div className="comment-form">
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Email (kept private)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <textarea
          className="form-textarea"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
        <div className="form-actions">
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post comment"}
          </button>
        </div>
      </div>

      {/* Comments list */}
      {comments.map((c) => (
        <div key={c._id} className="comment-item">
          <div className="comment-meta">
            <div className="comment-avatar">
              {c.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="comment-author">{c.name}</span>
              <span className="comment-date">
                {" "}· {new Date(c.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </span>
            </div>
          </div>
          <p className="comment-body">{c.comment}</p>
        </div>
      ))}

      {comments.length === 0 && (
        <p style={{ fontSize: "13px", color: "#64748b", textAlign: "center", marginTop: "1rem" }}>
          No comments yet. Be the first!
        </p>
      )}
    </div>
  );
}

export default Comments