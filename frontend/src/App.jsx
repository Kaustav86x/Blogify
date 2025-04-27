import { BrowserRouter, useRoutes, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Blogs from './pages/allBlogs/allBlogs'
import SignUp from './pages/SignUp/SignUp'


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
      </Routes>
    </BrowserRouter>
  )
}

export default App
