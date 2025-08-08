import { BrowserRouter, useRoutes, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Welcome from './pages/welcome'
import BlogDetails from './pages/BlogDetails'
import AllBlogs from './pages/allBlogs'
import Home from './pages/Home'
import CreateBlog from './pages/admin/CreateBlog'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/blog/:title" element={<BlogDetails/>}/>
        <Route path="/blog/all-blogs" element={<AllBlogs/>}/>
        <Route path="/admin/create-blog" element={<CreateBlog/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
