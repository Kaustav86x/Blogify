import React from 'react'
import { useEffect, useRef } from "react";

const GiscusComments = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "Kaustav86x/Blogify");
    script.setAttribute("data-repo-id", "R_kgDONyc4Tg");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDONyc4Ts4C7n0V");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "https://giscus.app/themes/custom_example.css");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy")
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return (
    <div ref={ref} />
  )
}

export default GiscusComments