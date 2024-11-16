import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/AuthSlice';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (!validatePassword(password)) {
      setPasswordError('Invalid password');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    if (!validatePassword(password)) {
      setError('Invalid password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/users/register`, {
        email,
        password,
      },
      { withCredentials: true }
      );

      dispatch(login(email));
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign Up Form</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      value={email}
                      type="email"
                      autoComplete="username"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error && validateEmail(e.target.value)) setError(null);
                      }}
                      placeholder="Email address"
                    />
                    {error && !validateEmail(email) && <div className="text-red-500">Invalid email</div>}
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      value={password}
                      onChange={(e) => {
                        handlePasswordChange(e.target.value);
                        if (error && validatePassword(e.target.value)) setError(null);
                      }}
                      placeholder="Password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </span>
                    {passwordError && <div className="text-red-500">{passwordError}</div>}
                  </div>
                  <div className="relative">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (error && password === e.target.value) setError(null);
                      }}
                      placeholder="Confirm Password"
                    />
                    {error && password !== confirmPassword && <div className="text-red-500">Passwords do not match</div>}
                  </div>
                  <div className="relative flex justify-center">
                    <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
                      Submit
                    </button>
                  </div>
                  {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                  <div className="relative text-center mt-4">
                    <p className="text-gray-700">
                      Already have an account?{' '}
                      <a href="/login" className="text-blue-500 hover:underline">
                        Log in
                      </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      <Link to="/" className="text-blue-500 hover:underline">
                        Back to Home
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
