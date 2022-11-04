import React from "react";
import classes from "./Content.module.css";

interface propType {
  children: React.ReactNode;
}

const Content = ({ children }: propType) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        Content
        {children}
      </div>
    </div>
  );
};

export default Content;
