import React from "react";
import classes from "./SideBar.module.css";

import { Avatar, Tooltip } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";

type propType = {
  isFullSideBar: boolean;
  isExpand: boolean;
  isWideWidth: boolean;
  setExpand: Function;
  user: any;
  tabs: any[];
  // tabs: ITabs[];
};

const Sidebar = ({
  user,
  isFullSideBar,
  isExpand,
  isWideWidth,
  setExpand,
  tabs,
}: propType) => {
  let location = useLocation();

  React.useEffect(() => {}, [location]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${
        !isFullSideBar
          ? classes.container + " " + classes.smallWidth
          : classes.container
      }`}
    >
      <div
        className={`${
          !isFullSideBar
            ? classes.content + " " + classes.smallWidth
            : classes.content
        }`}
      >
        {isWideWidth && (
          <div className={classes.expand} onClick={() => setExpand(!isExpand)}>
            {isExpand ? <LeftOutlined /> : <RightOutlined />}
          </div>
        )}
        <div className={classes.contentMain}>
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: "#87d068", margin: 24 }}
            size={isFullSideBar ? 120 : 64}
            icon={<UserOutlined />}
          />
          {isFullSideBar && (
            <div className={classes.fio}>{`${user.username}`}</div>
          )}
          <div className={isExpand ? classes.list : classes.listMarginTop}>
            {tabs.map(({ name, url, icon }) =>
              isFullSideBar ? (
                <div
                  key={url}
                  onClick={() => navigate(url)}
                  className={`${
                    location.pathname === url
                      ? classes.listItem + " " + classes.active
                      : classes.listItem
                  }`}
                >
                  <img src={icon} alt="Logo" />
                  <div className={classes.itemText}>{name}</div>
                  {location.pathname === url && (
                    <div className={classes.itemLabelContainer}>
                      <div className={classes.itemLabel}></div>
                    </div>
                  )}
                </div>
              ) : (
                <Tooltip placement="right" title={name}>
                  <div
                    key={url}
                    onClick={() => navigate(url)}
                    className={`${
                      location.pathname === url
                        ? classes.listItem + " " + classes.active
                        : classes.listItem
                    }`}
                  >
                    <img src={icon} alt="Logo" />
                    {location.pathname === url && (
                      <div className={classes.itemLabelContainer}>
                        <div className={classes.itemLabel}></div>
                      </div>
                    )}
                  </div>
                </Tooltip>
              )
            )}
          </div>
        </div>

        <div className={classes.exitBlock} onClick={() => console.log("выход")}>
          {/* <img src={exit} alt="Logo" /> */}
          <LogoutOutlined />
          {isFullSideBar && <div className={classes.itemText}>Выход</div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
