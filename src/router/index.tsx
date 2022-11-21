import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import Content from "../layouts/content/Content";
import Header from "../layouts/header/Header";
import Home from "../pages/home/Home";
import Sidebar from "../layouts/sidebar/Sidebar";
import Chat from "../components/chat/Chat";

const RouterApp = () => {
  const { auth, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );

  return (
    <div>
      <Header />
      {auth && <Sidebar />}
      <Chat/>
      <Content>
        <Routes>
          {/* <Route path="/" element={<Post />} /> */}
          <Route path="/post" element={<div>post</div>} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Content>
    </div>
  );
};

export default RouterApp;
