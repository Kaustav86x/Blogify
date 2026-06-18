import React from 'react'
import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CusdisComments = ({ postId, postTitle }) => {

    const ref = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if(!ref.current) return;

        const script = document.createElement("script");
        script.src = "https://cusdis.com/js/cusdis.es.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

    },[]);

    useEffect(() => {
        if(window.CUSDIS)
        {
            window.CUSDIS.renderTo(ref.current);
        }
    },[pathname]);

  return (
    <div className="cusdis-wrapper">
    <h2 className="cusdis-heading">Comments</h2>
    <div 
      ref={ref}
      id="cusdis_thread"
      data-host="https://cusdis.com"
      data-app-id="caed120f-1eb1-4478-8af2-9f4f9436b759"       
      data-page-id={postId}            // unique per post (e.g. post slug)
      data-page-url={window.location.href}
      data-theme={`../../public/cusdis-theme.css`}
    />
    </div>
    
  )
}

export default CusdisComments