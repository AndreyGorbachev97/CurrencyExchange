import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
// import "antd/dist/antd.css";
import "./style.less";
import { setupStore } from "./store";

const store = setupStore();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const themeAntd = {
  token: {
    colorPrimary: "#5827a8",
    radiusBase: 1,

    // radiusXS: 0,
    // radiusSM: 0,
    // radiusLG: 0,
    // radiusOuter: 0,

    // controlRadius: 0,
    // controlRadiusXS: 0,
  },
  // algorithm: [darkAlgorithm, compactAlgorithm],
};

root.render(
  <Provider store={store}>
    <ConfigProvider theme={themeAntd}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>
  </Provider>
);
