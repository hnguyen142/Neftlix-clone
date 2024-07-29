import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/52e4cd00-9a33-4f8b-afa0-6623070f7654/US-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_6392408d-671b-40c8-83c8-888c04ea535d_large.jpg"
        alt="Signup Background"
      />
      <div className="bg-black/70 fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-black/80 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-white text-left">Sign Up</h1>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white">Email or Mobile Number</label>
              <input
                className="w-full p-4 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                type="text"
                id="email"
                autoComplete="email"
                placeholder="Email or Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-white mt-4">Password</label>
              <input
                className="w-full p-4 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-3 mt-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition">
              Sign Up
            </button>
            <div className="flex justify-between items-center text-gray-600 mt-4">
              <p>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberLogin}
                  onChange={(e) => setRememberLogin(e.target.checked)}
                />
                Remember me
              </p>
              <p>Need Help?</p>
            </div>
            <p className="my-4 text-gray-600">
              <span className="text-gray-600 mr-2">Already subscribed to Netflix? </span>
              <Link to="/login" className="text-red-600 hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
