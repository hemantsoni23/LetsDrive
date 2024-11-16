import { FaBars } from 'react-icons/fa';
import React from 'react';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/AuthSlice';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/profile/user-progress', label: 'User Progress' },
    { path: '/profile/license-status', label: 'License Status' },
    { path: '/profile/mock-test-results', label: 'Mock Test Results' },
  ];

  return (
    <div>
      <NavBar />
      <div className="flex flex-col min-h-screen mt-16 md:flex-row">
        <nav className="bg-gray-800 text-white w-full md:w-64 md:flex md:flex-col space-y-6 py-7 px-2">
          <div className="flex items-center justify-between px-4 md:hidden">
            <button className="text-2xl"><FaBars /></button>
          </div>
          <ul className="mt-6 space-y-2 flex md:flex-col">
            {navItems.map(item => (
              <li key={item.path} className="flex-1">
                <Link
                  to={item.path}
                  className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-2 flex md:flex-col">
            <button onClick={handleLogout} className="block py-2.5 px-4 rounded transition duration-200 bg-red-600 hover:bg-red-700 text-white w-full">Log Out</button>
            <Link to="/">
              <button className="mt-5 block py-2.5 px-4 rounded transition duration-200 bg-blue-500 hover:bg-blue-700 text-white w-full">Back to Home</button>
            </Link>
          </div>
        </nav>
        <div className="flex-1">
          <header className="flex items-center justify-between p-4 bg-gray-800 text-white md:hidden">
            <button className="text-2xl"><FaBars /></button>
          </header>
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
