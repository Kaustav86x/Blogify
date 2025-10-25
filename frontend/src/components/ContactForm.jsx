import React from 'react'
import { useRef, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import validator from 'validator';

const ContactForm = () => {

  const contactSectionRef = useRef(null);

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      setLoading(true);

      if(!name || !email ) {
        throw new Error("Please fill the mandatory fields")
      }

      if(validator.isEmail(email) === false) {
        throw new Error("Please enter a valid email address")
      }

      const response = await axios.post('https://blogify-backend-umber.vercel.app/api/contact-us', {
        name,
        email,
        message,
      });

      if(response.status != 200) {
        throw new Error("An error occured !!!", response.status)
      }
      setName("")
      setEmail("")
      setMessage("")

      toast.success("Your details have been saved !")

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    catch(err) {
      // if(err.response && err.response.data && err.response.data.message) 
        // {
        toast.error(err.message)
        // return;
      // }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-4 py-16 flex flex-col items-center bg-sky-100 gap-15" id="contact" ref={contactSectionRef}>
      <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-poor-story mb-4 text-center">
        Drop a thought, comment or anything you’d like to say!
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

        <label className="text-black text-lg sm:text-xl font-poor-story">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border-b border-black bg-transparent focus:outline-none text-black"
          required
        />

        <label className="text-black text-lg sm:text-xl font-poor-story">Message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full border-b border-black bg-transparent focus:outline-none text-black"
          rows="1"
        ></textarea>
      </div>

      <button
        className="mt-8 px-8 py-2 bg-sky-200 border border-black shadow-md text-sm cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  )
}

export default ContactForm