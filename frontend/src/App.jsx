import { BrowserRouter, useRoutes, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Blogs from './pages/allBlogs'
import SignUp from './pages/SignUp'
import Welcome from './pages/welcome'
import BlogDetails from './pages/BlogDetails'
import AllBlogs from './pages/allBlogs'
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/blog/:title" element={<BlogDetails/>}/>
        <Route path="/blog/all-blogs" element={<AllBlogs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
