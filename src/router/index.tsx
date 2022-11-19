import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Content from "../layouts/content/Content";
import Header from "../layouts/header/Header";
import Home from "../pages/home/Home";

const RouterApp = () => {
  return (
    <div>
      <Header />
      {/* <div>
        <nav>
          <Link to="/">Post</Link> | <Link to="/home">Home</Link>
        </nav>
      </div> */}
      <Content>
        <Routes>
          {/* <Route path="/" element={<Post />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>
    </div>
  );
};

export default RouterApp;
