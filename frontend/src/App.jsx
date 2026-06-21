import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from "react";
import PageLoader from './components/PageLoader';


const Home = lazy(() => import('./pages/Home'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const AllBlogs = lazy(() => import('./pages/allBlogs'));
const PoemDetails = lazy(() => import('./pages/PoemDetails'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/:slug' element={<BlogDetails />} />
          <Route path='/poem/:slug' element={<PoemDetails />} />
          <Route path='/pieces' element={<AllBlogs />} />
          <Route path='/about/Kaustav' element={<AboutMe />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;