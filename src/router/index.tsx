import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  HashRouter,
} from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import Content from "../layouts/content/Content";
import Header from "../layouts/header/Header";
import Home from "../pages/home/Home";
import Sidebar from "../layouts/sidebar/Sidebar";
import Chat from "../components/chat/Chat";
import { PlayCircleOutlined } from "@ant-design/icons";

const tabs = [
  {
    name: "Мои карты",
    url: "/cards",
    icon: <PlayCircleOutlined />,
  },
];
const RouterApp = () => {
  // const { auth, isLoading, error } = useAppSelector(
  //   (state) => state.authReducer
  // );
  const auth = true;

  return (
    <div>
      <Header />
      <Chat />
      <div>
        <Content>
          <Sidebar
            user={{ username: "test" }}
            tabs={tabs}
            isFullSideBar={true}
            isExpand={true}
            isWideWidth={true}
            setExpand={() => console.log("expand")}
          />
          <Routes>
            {/* <Route path="/" element={<Post />} /> */}
            <Route path="/post" element={<div>post</div>} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Content>
      </div>
    </div>
  );
};

export default RouterApp;
