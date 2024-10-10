import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../src/assets/writeup.jpg";

const Navbar = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <header className=" flex items-center justify-between p-4">
        <div className="relative">
          <img src={Logo} alt="Logo" className="w-16 h-16 mx-4" />
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search..." 
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button type="submit" className="ml-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition duration-300">
            Search
          </button>
        </form>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:bg-gray-700 p-2 rounded transition duration-300">Home</Link>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="hover:bg-gray-700 p-2 rounded transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-gray-700 p-2 rounded transition duration-300">Login</Link>
              <Link to="/register" className="hover:bg-gray-700 p-2 rounded transition duration-300">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Navbar;
