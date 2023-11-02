import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" bg-slate-100 h-full w-full">
      <div className="py-12 lg:py-24 max-w-[1440px]">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
