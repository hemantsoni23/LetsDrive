import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/AuthSlice';
const logo = require('../assets/white_logo.png');

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Call the logout function from context
    navigate('/login'); // Use navigate to redirect to login page
  };

  const navItems = [
    { path: 'manage-courses', label: 'Manage Courses' },
    { path: 'learner-license-applicants', label: 'Learner License Applicants' },
    { path: 'user-management', label: 'User Management' },
    { path: 'enquiries-management', label: 'Enquiries Management' },
  ];

  return (
    <div className="flex min-h-screen">
      <nav className={ ` bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between px-4">
          {/* <span className="text-2xl font-extrabold">LetsDrive</span> */}
          <Link to='/' className='hidden md:flex md:items-center md:gap-2'><img src={logo} alt='LetsDrive' width={200} height={200}/></Link>
          <button onClick={toggleSidebar} className="text-2xl md:hidden"><FaTimes /></button>
        </div>
        <ul className="mt-6 space-y-2">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block py-2.5 px-4 rounded mt-5 transition duration-200 hover:bg-gray-700 ${location.pathname.includes(item.path) ? 'bg-gray-700' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-2">
          <button onClick={handleLogout} className="block py-2.5 px-4 rounded transition duration-200 bg-red-600 hover:bg-red-700 text-white w-full">Log Out</button>
        </div>
      </nav>
      <div className="flex-1">
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white md:hidden">
          <button onClick={toggleSidebar} className="text-2xl"><FaBars /></button>
          {/* <span className="text-2xl font-extrabold">LetsDrive</span> */}
          <Link to='/' className='flex items-center gap-2'><img src={logo} alt='LetsDrive' width={200} height={200}/></Link>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
