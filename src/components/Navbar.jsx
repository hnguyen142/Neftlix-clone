import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure the import path is correct

const Navbar = () => {
  const { user, logOut } = useAuth(); // Properly use useAuth hook
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-bold cursor-pointer text-5xl">neftlix</h1>
      </Link>
      {
        user?.email?(<div>
          {user ? (
            <>
              <Link to="/profile">
              <button className="capitalize pr-4">profile</button>
              </Link>
              <button 
                className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="capitalize pr-4 text-white">Login</button>
              </Link>
              <Link to="/signup">
                <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer">Signup</button>
              </Link>
            </>
          )}
        </div>

        ):
        (
          <div>
        {user ? (
          <>
            <span className="capitalize pr-4 text-white">Hello, {user.email}</span>
            <button 
              className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="capitalize pr-4 text-white">Login</button>
            </Link>
            <Link to="/signup">
              <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer">Signup</button>
            </Link>
          </>
        )}
      </div>
        )
      }

      
    </div>
  );
}

export default Navbar;
