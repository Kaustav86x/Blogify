import { BrowserRouter, useRoutes, Routes, Route} from 'react-router-dom'
import Welcome from './pages/welcome'
import BlogDetails from './pages/BlogDetails'
import AllBlogs from './pages/allBlogs'
import Home from './pages/Home'
import PoemDetails from './pages/PoemDetails'
import AboutMe from './pages/AboutMe'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/sign-up' element={<SignUp/>}/> */}
        {/* <Route path='/welcome' element={<Welcome/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path="/blog/:slug" element={<BlogDetails/>}/>
        <Route path="/poem/:slug" element={<PoemDetails/>}/>
        <Route path="/pieces" element={<AllBlogs/>}/>
        <Route path="/about/Kaustav" element={<AboutMe/>}/>
        {/* <Route path="/admin/create-blog" element={<CreateBlog/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
