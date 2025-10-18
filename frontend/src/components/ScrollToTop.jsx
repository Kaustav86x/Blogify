import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {

  const [visible, setVisible] = useState(false);

  // show button when user scrolls down 300px
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-sky-300 text-white shadow-lg hover:bg-sky-400 transition-all duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
