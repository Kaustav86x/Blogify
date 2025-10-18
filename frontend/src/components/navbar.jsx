import React, {useState} from 'react'
// import Logo from '../assets/niximo_group.png'
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {

  
  const location = useLocation();
  // const { pathname } = location;

  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', path: '/'},
    { label: 'Pieces', path: '/pieces'},
    { label: 'About', path: '/#about'},
    { label: 'Contact', path: '/#contact'}
  ]

  return (
      <nav className="w-full px-4 shadow-md bg-sky-100 py-10">
        <div className="max-w-[1356px] w-full mx-auto flex flex-wrap items-center justify-center gap-y-4">
        <div className="flex flex-wrap gap-25 items-center text-black text-2xl font-poor-story">
        {navItems.map((item) => (
          <NavLink 
          key={item.path} 
          to={item.path}
          className={`cursor-pointer"
            ${location.pathname === item.path ? 
            "underline font-bold" : 
            ""}`}>
            {item.label}
          </NavLink>
        ))}
        </div>
        </div>
      </nav>
  )
}

export default Navbar