import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Content from "../layouts/content/Content";
import Header from "../layouts/header/Header";
import Home from "../pages/home/Home";
import Operation from "../pages/operation/Operation";
import History from "../pages/history/History";
import Sidebar from "../layouts/sidebar/Sidebar";
import Chat from "../components/chat/Chat";
import useWindowDimensions from "../hooks/useWindowDimensions";
import cardsIcon from "../assets/images/sidebar/cards.png";
import historyIcon from "../assets/images/sidebar/history.png";
import swapIcon from "../assets/images/sidebar/swap.png";
import classes from "./Route.module.css";
import Card from "../pages/card/Card";
import { checkAuth, getTransactions } from "../store/reducers/ActionCreators";
import { isNotEmptyObject } from "../utils/isNotEmptyObject";
import { Spin } from "antd";

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
    page: <History />,
  },
];
const RouterApp = () => {
  const { auth, user, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );
  const [isExpand, setIsExpand] = useState(true);
  const { width } = useWindowDimensions();
  const isWideWidth = width > 1400;
  const isFullSideBar = isWideWidth && isExpand;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    const interval = setInterval(() => {
      dispatch(getTransactions());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("checkAuth", checkAuth);
    dispatch(checkAuth());
  }, [auth]);

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
        {isLoading ? (
          <div
            className={classes.spinContainer}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <>
            {isNotEmptyObject(user) && (
              <Sidebar
                user={user}
                tabs={tabs}
                isFullSideBar={isFullSideBar}
                isExpand={isExpand}
                isWideWidth={isWideWidth}
                setExpand={setIsExpand}
              />
            )}
            <Content>
              <Routes>
                {isNotEmptyObject(user) ? (
                  <>
                    {tabs.map((item, key) => (
                      <Route key={key} path={item.url} element={item.page} />
                    ))}
                    <Route path="/operation/:id" element={<Operation />} />
                  </>
                ) : (
                  <Route path="/home" element={<Home />} />
                )}

                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Content>
          </>
        )}
      </div>
    </div>
  );
};

export default RouterApp;
