import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRef } from 'react';
import { ToastContainer } from "react-toastify";
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RandomImage from '../components/RandomImage';
import ScrollToTopButton from '../components/ScrollToTop';
import Navbar from '../components/navbar';
import RecentBlogs from '../components/RecentBlogs';
import DylanThomas from '../components/DylanThomas';
import MySection from '../components/MySection';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';
import HomeDesktop from './HomeDesktop';
import NotFound from './NotFound';

import { useMediaQuery } from 'react-responsive';

const Home = () => {

  const isMobile = useMediaQuery({ maxWidth: 768 });
  // const isDesktop = useMediaQuery({ minWidth: 768 });

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Delay the scroll to wait for page render
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [location]);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ 
      duration: 1400, 
      once: true 
    });
      AOS.refresh();
  }, []);

  return (
    <>
  {isMobile ? (
  // <div className="bg-sky-100">
  // <div className="min-h-screen w-full bg-sky-100 flex flex-col">
  //   <ToastContainer />
  //   <Navbar />

  //   {/* Top Divider */}
  //   <div className="w-11/12 mx-auto border-t border-black mt-6 sm:mt-10"></div>

  //   {/* Hero Section */}
  //   <HeroSection/>

  //   {/* Divider */}
  //   <div className="w-11/12 mx-auto border-t border-black mt-10"></div>

  //   {/* Recent Blogs Section */}
  //   <RecentBlogs/>

  //   <div className="w-11/12 mx-auto border-t border-black mt-10"></div>

  //   {/* Dylan Thomas Section */}
  //   <DylanThomas/>

  //   {/* Divider */}
  //   <div className="w-11/12 mx-auto border-t border-black mt-10 mb-10"></div>

  //   {/* Kaustav Section */}
  //   <MySection/>

  //   {/* Divider */}
  //   <div className="w-11/12 mx-auto border-t border-black mt-10"></div>

  //   {/* Random Image Section */}
  //   <RandomImage />

  //   {/* Contact Form */}
  //   <ContactForm/>

  //   {/* Footer */}
  //   <Footer />
  //   <ScrollToTopButton />
  // </div>
  // </div>
  <NotFound />
) : (<HomeDesktop />)} 
  </>
  )
}

export default Home