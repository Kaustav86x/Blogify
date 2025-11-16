import { BrowserRouter, useRoutes, Routes, Route} from 'react-router-dom'
import BlogDetails from './pages/BlogDetails'
import AllBlogs from './pages/allBlogs'
import Home from './pages/Home'
import PoemDetails from './pages/PoemDetails'
import AboutMe from './pages/AboutMe'
import NotFound from './pages/NotFound'


function App() {

  const routeList = [
    
    { path: '/', element: <Home/> },
    { path: '/blog/:slug', element: <BlogDetails/> },
    { path: '/poem/:slug', element: <PoemDetails/> },
    { path: '/pieces', element: <AllBlogs/> },
    { path: '/about/Kaustav', element: <AboutMe/> },
    { path: '*', element: <NotFound/> }
  ]

  return (
    <BrowserRouter>
      <Routes>
        {routeList.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
