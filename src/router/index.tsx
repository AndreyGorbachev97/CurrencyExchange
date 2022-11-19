import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import Content from "../layouts/content/Content";
import Header from "../layouts/header/Header";
import Home from "../pages/home/Home";
import Post from "../pages/Post";

const RouterApp = () => {
  const { auth, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );

  console.log("auth", auth);
  return (
    <div>
      <Header />
      {/* <div>
        <nav>
          <Link to="/">Post</Link> | <Link to="/home">Home</Link>
        </nav>
      </div> */}
      <Content>
        {auth && <h3 style={{ color: "white" }}>Вы успешно авторизовались!</h3>}
        {!auth && (
          <Routes>
            {/* <Route path="/" element={<Post />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Content>
    </div>
  );
};

export default RouterApp;
