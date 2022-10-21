import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// export const UserContext = createContext(null);
// export const UserDetails = createContext(null);
// export const UserListData = createContext(null);

export const UserArray = createContext(null);
export const UserDetail = createContext(null);
export const CityArray = createContext(null);
export const CountryArray = createContext(null);
export const LanguageList = createContext(null);
export const UserArrayStatus = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
