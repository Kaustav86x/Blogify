import React, {useState} from 'react'
// import Logo from '../assets/niximo_group.png'
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {

  
  const location = useLocation();
  const { pathname } = location

  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About us', path: '/'},
    { label: 'Our Works', path: '/our-works'},
    { label: 'Career', path: '/career'},
    { label: 'Blog', path: '/blogs'},
    { label: 'Services', path: '/services'}
  ]

  return (
    <header className="w-full px-4 sm:px-6 lg:px-20 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        {/* <a href='/'><img src={Logo} alt="Logo" className="w-36 sm:w-44 h-12" /></a> */}
      </div>

      {/* Hamburger - Mobile Only */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-black">
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Menu - Desktop */}
      <nav className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <NavLink 
          key={item.path} 
          to={item.path}
          className={`${pathname === item.path ? "bg-cyan-300 p-1.5 rounded-sm text-lg font-normal font-'Space_Grotesk' leading-7 cursor-pointer border-cyan-500 opacity-100 scale-x-100" : "text-black text-lg font-normal font-'Space_Grotesk' leading-7 cursor-pointer opacity-90 scale-x-100"
          } transition-all`}>
            {item.label}
          </NavLink>
        ))}

        {pathname === '/sign-up' ? 
        (<NavLink to={'/sign-up'}>
          <div className="px-6 py-3 bg-cyan-300 rounded-2xl border border-zinc-900 cursor-pointer transition-all">
          <div className="text-black text-lg font-normal font-'Space_Grotesk'">
            Request a quote</div>
          </div>
        </NavLink>) : (
        <NavLink to={'/sign-up'}>
        <div className="px-6 py-3 rounded-2xl border border-zinc-900 cursor-pointer transition-all">
          <div className="text-black text-lg font-normal font-'Space_Grotesk'">
            Request a quote</div>
        </div>
        </NavLink> )}
        
      </nav>

      {/* Menu - Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-10 right-10 bg-white shadow-md flex flex-col items-start px-6 py-4 lg:hidden z-50">
          {navItems.map((item) => (
          <NavLink 
          key={item.path} 
          to={item.path}
          className={`${pathname === item.path ? "bg-cyan-300 p-1.5 rounded-sm text-lg font-normal font-'Space_Grotesk' leading-7 cursor-pointer border-cyan-500" : "text-black text-lg font-normal font-'Space_Grotesk' leading-7 cursor-pointer p-1"
          } transition-all`}>
            {item.label}
          </NavLink>
        ))}

        {pathname === '/sign-up' ? 
        (<NavLink to={'/sign-up'}>
          <div className="w-full mt-4 px-6 py-3 bg-cyan-300 rounded-2xl border border-zinc-900 text-black text-lg text-center cursor-pointer">
            Request a quote
          </div>
        </NavLink>) : (
        <NavLink to={'/sign-up'}>
        <div className="w-full mt-4 px-6 py-3 rounded-2xl border border-zinc-900 text-black text-lg text-center cursor-pointer">
            Request a quote
          </div>
        </NavLink> )}
        </div>
      )}
    </header>
  )
}

export default Navbar