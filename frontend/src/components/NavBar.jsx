import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark, FaUser } from 'react-icons/fa6';
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { AuthContext } from '../AuthContext/AuthProvider';
const logo = require("../assets/logo.png");

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { authToken, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleProfileMenuEnter = () => {
    setIsProfileMenuOpen(true);
  }

  const handleProfileMenuLeave = () => {
    setTimeout(function(){setIsProfileMenuOpen(false)},3000);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = [
    { link: 'Home', path: '/' },
    { link: 'Learn to Drive', path: '/learnToDrive' },
    { link: 'Get Your License', path: '/getYourLicense' },
    { link: 'About Us', path: '/about' },
    { link: 'Contact Us', path: '/contact' }
  ]

  const profileNavItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/profile/user-progress', label: 'User Progress' },
    { path: '/profile/license-status', label: 'License Status' },
    { path: '/profile/mock-test-results', label: 'Mock Test Results' },
    { label: 'Logout', path: '/', onClick: logout }
  ];

  return (
    <header className='w-full bg-transparent fixed z-50 top-0 left-0 right-0 transition-all ease-in duration-300 font-semibold'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : "bg-teal-100"}`}>
        <div className='flex justify-between items-center text-base gap-8'>
          <Link to='/' className='flex items-center gap-2'><img src={logo} alt='LetsDrive' width={220} height={220} /></Link>

          {/* Nav options */}
          <ul className='md:flex md:space-x-10 hidden '>
            {navItems.map(({ link, path }) => (
              <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>
            ))}
          </ul>

          {/* Login and signup buttons or profile icon */}
          <div className='relative flex items-center space-x-2 lg:space-x-4'>
            {authToken ? (
              <div onMouseEnter={handleProfileMenuEnter} onMouseLeave={handleProfileMenuLeave}>
                <button className='text-base text-black uppercase cursor-pointer hover:text-blue-700 border border-black rounded-md p-2'>
                  <FaUserCircle className='w-5 h-5' />
                </button>
                {isProfileMenuOpen && (
                  <div
                    className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50'
                    onMouseEnter={handleProfileMenuEnter}
                    onMouseLeave={handleProfileMenuLeave}
                  >
                    {profileNavItems.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                        onClick={item.onClick}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to='/login'>
                  <button className='text-base text-black uppercase cursor-pointer hover:text-blue-700 border border-black rounded-md p-2 hidden lg:flex items-center'>
                    <FaUser className='w-5 h-5 mr-2' />
                    Login
                  </button>
                  <button className='text-base text-black uppercase cursor-pointer hover:text-blue-700 border border-black rounded-md p-2 lg:hidden'>
                    <FaUser className='w-5 h-5' />
                  </button>
                </Link>
                <Link to='/signup'>
                  <button className='text-base text-black uppercase cursor-pointer hover:text-blue-700 border border-black rounded-md p-2 hidden lg:flex items-center'>
                    <FaSignInAlt className='w-5 h-5 mr-2' />
                    SignUp
                  </button>
                  <button className='text-base text-black uppercase cursor-pointer hover:text-blue-700 border border-black rounded-md p-2 lg:hidden'>
                    <FaSignInAlt className='w-5 h-5' />
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger button */}
          <div className='space-x-12 hidden items-center'>
            <button><FaBarsStaggered className='w-5 hover:text-blue-700 ' /></button>
          </div>

          {/* Toggle logic */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isMenuOpen ? <FaXmark className='h-5 w-5 hover:text-black' /> : <FaBarsStaggered className='h-5 w-5 hover:text-black' />}
            </button>
          </div>
        </div>

        {/* Nav items for small devices */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {navItems.map(({ link, path }) => (
            <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default NavBar;
