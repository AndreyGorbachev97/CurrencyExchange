import React, { useEffect, useState } from "react";
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
import useWindowDimensions from "../hooks/useWindowDimensions";
import cardsIcon from "../assets/images/sidebar/cards.png";
import historyIcon from "../assets/images/sidebar/history.png";
import swapIcon from "../assets/images/sidebar/swap.png";
import classes from "./Route.module.css";
import Card from "../pages/card/Card";

const tabs = [
  {
    name: "Обмен валют",
    url: "/home",
    icon: swapIcon,
    page: <Home />,
  },
  {
    name: "Мои карты",
    url: "/cards",
    icon: cardsIcon,
    page: <Card />,
  },
  {
    name: "История операций",
    url: "/history",
    icon: historyIcon,
    page: <div style={{ width: "100%" }}>История операций</div>,
  },
];
const RouterApp = () => {
  // const { auth, isLoading, error } = useAppSelector(
  //   (state) => state.authReducer
  // );
  const auth = true;
  const [isExpand, setIsExpand] = useState(true);
  const { width } = useWindowDimensions();
  const isWideWidth = width > 1400;
  const isFullSideBar = isWideWidth && isExpand;
  useEffect(() => {
    if (isWideWidth) {
      setIsExpand(true);
    } else {
      setIsExpand(false);
    }
  }, [isWideWidth]);

  return (
    <div>
      <Header />
      <Chat />
      <div className={classes.container}>
        <Sidebar
          user={{ username: "test" }}
          tabs={tabs}
          isFullSideBar={isFullSideBar}
          isExpand={isExpand}
          isWideWidth={isWideWidth}
          setExpand={setIsExpand}
        />
        <Content>
          <Routes>
            {tabs.map((item, key) => (
              <Route key={key} path={item.url} element={item.page} />
            ))}
            <Route path="/post" element={<div>post</div>} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Content>
      </div>
    </div>
  );
};

export default RouterApp;
