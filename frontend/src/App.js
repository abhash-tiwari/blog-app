import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogEditor from './components/BlogEditor';
import Navbar from './components/navbar'; 
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createblog" element={<BlogEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
