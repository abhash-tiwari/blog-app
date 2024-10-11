import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = ({ searchCountry }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://blog-app-2-xci4.onrender.com/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          throw new Error("Failed to fetch blog posts");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.location && blog.location.toLowerCase().includes(searchCountry ? searchCountry.toLowerCase() : "")
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBlogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to WriteUp</h1>
      <p className="text-lg text-center mb-6">
        Explore our latest articles and insights on various topics. Stay updated and inspired!
      </p>
      <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-2xl">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded shadow-md mb-4 cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-600">{blog.subheading}</p>
                <p className="text-gray-700 mt-2">{blog.content.substring(0, 150)}...</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>By: {blog.author.username}</span>
                  {blog.location && <span> | Location: {blog.location}</span>}
                </div>
              </div>
            ))
          ) : (
            <p>No blog posts available</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-4 w-full max-w-2xl">
        <button
          onClick={prevPage}
          disabled={currentPage === 1 || filteredBlogs.length === 0}
          className={`py-2 px-4 rounded-lg ${currentPage === 1 || filteredBlogs.length === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(filteredBlogs.length / blogsPerPage) || filteredBlogs.length === 0}
          className={`py-2 px-4 rounded-lg ${currentPage >= Math.ceil(filteredBlogs.length / blogsPerPage) || filteredBlogs.length === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
