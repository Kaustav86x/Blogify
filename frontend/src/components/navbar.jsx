import React, {useState} from 'react'
// import Logo from '../assets/niximo_group.png'
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {

  
  const location = useLocation();
  // const { pathname } = location;

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/'},
    { label: 'Pieces', path: '/pieces'},
    { label: 'About', path: '/#about'},
    { label: 'Contact', path: '/#contact'}
  ]

  return (
      <nav className="w-full px-4 shadow-md bg-sky-100 py-6 relative z-50">
      <div className="max-w-[1356px] w-full mx-auto flex items-center justify-between">
        
        {/* Logo / Title */}
        <h1 className="text-3xl font-poor-story text-black select-none">Kaustav Dey</h1>

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden text-3xl focus:outline-none transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap gap-10 items-center text-black text-2xl font-poor-story">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`cursor-pointer transition-all ${
                location.pathname === item.path ? "underline font-bold" : ""
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Navigation (Animated) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 text-xl font-poor-story">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)} // Close on click
              className={`cursor-pointer transition-colors ${
                location.pathname === item.path ? "underline font-bold" : ""
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar