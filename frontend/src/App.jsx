import { BrowserRouter, useRoutes, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Blogs from './pages/allBlogs'
import SignUp from './pages/SignUp'
import Welcome from './pages/welcome'
import AboutAuthor from './pages/AboutAuthor'


const AllBlogs = () => {
  return useRoutes([
    { path: "/", element: <Blogs/> }
    // {path: "/blog/:id", element: }
  ]);
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/about-author' element={<AboutAuthor/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
