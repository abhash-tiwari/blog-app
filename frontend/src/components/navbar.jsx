import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if the user is logged in by checking for a token and username in localStorage
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    console.log("Token:", token); // Debugging: check if token exists
    console.log("Stored Username:", storedUsername); // Debugging: check if username exists

    if (token && storedUsername) {
      setUsername(storedUsername); // Set the username if the user is logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    onSearch(searchTerm);
    setSearchTerm('');
  };

  const handleWriteClick = () => {
    if (!username) {
      alert("You should login first."); // Alert if not logged in
    } else {
      navigate("/create-blog"); // Navigate to create blog if logged in
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-yellow-300 tracking-wide shadow-lg">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold hover:text-yellow-400 transition duration-300">
            WriteUp
          </h1>
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            placeholder="Search by country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded-l border border-gray-600 text-black"
            aria-label="Search by country"
          />
          <button type="submit" className="bg-yellow-400 text-gray-800 p-2 rounded-r hover:bg-yellow-300 transition duration-300">
            Search
          </button>
        </form>

        <ul className="flex space-x-6">
          <li>
            <button
              onClick={handleWriteClick}
              className="hover:text-yellow-400 transition duration-200"
            >
              Post
            </button>
          </li>
          {!username ? (
            <>
              <li>
                <Link
                  to="/register"
                  className="hover:text-yellow-400 transition duration-200"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-yellow-400 transition duration-200"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-yellow-400 transition duration-200">
                {username.toUpperCase()}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
