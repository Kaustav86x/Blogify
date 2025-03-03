import { BrowserRouter, useRoutes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Blogs from './pages/allBlogs/allBlogs'


const AllBlogs = () => {
  return useRoutes([
    { path: "/", element: <Blogs/> }
    // {path: "/blog/:id", element: }
  ]);
};


function App() {
  return (
    <BrowserRouter>
      <AllBlogs/>
    </BrowserRouter>
  )
}

export default App
