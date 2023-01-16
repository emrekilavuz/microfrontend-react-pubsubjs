import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import Sidebar from "./sidebar/Sidebar";

const App = () => (
  <BrowserRouter>
    <Sidebar />
    <div className="pl-52 text-3xl mx-auto max-w-6xl">
      <div>Name: sidebar</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Tailwind</div>
    </div>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
