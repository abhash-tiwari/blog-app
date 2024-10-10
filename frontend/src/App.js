import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from './components/navbar';
import Home from './components/Home';
import BlogEditor from './components/BlogEditor';
import PaymentPage from './components/PaymentPage';
import BlogDetail from './components/BlogDetail';

const App = () => {

  const [searchCountry, setSearchCountry] = useState("");

  const handleCountrySearch = (value) =>  {
    setSearchCountry(value);
  }


  return (
    <Router>
      <Navbar onSearch={handleCountrySearch} />
      <Routes>
        <Route path="/" element={<Home searchCountry={searchCountry}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<BlogEditor />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/blog/:id" element={<BlogDetail/>}/>
      </Routes>
    </Router>
  );
};

export default App;