import { BrowserRouter } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import PubSub from "pubsub-js";
const Navbar = React.lazy(() => import("navbar/Navbar"));
const Sidebar = React.lazy(() => import("sidebar/Sidebar"));

const MainPage = () => {
  const [sidebarState, setSidebarState] = useState("normal");

  const publishTopic = () => {
    let msg = { data: "normal" };
    PubSub.publish("sidebarTopic", msg);
  };

  const subscribeMethod = (topic, msg) => {
    setSidebarState(msg.data);
  };

  useEffect(() => {
    publishTopic();
  }, []);

  useEffect(() => {
    PubSub.subscribe("sidebarTopic", subscribeMethod);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </Suspense>
      <div
        className={`mainPage ${
          sidebarState === "hidden"
            ? "full"
            : sidebarState === "minimized"
            ? "almost"
            : ""
        }`}
      >
        <Suspense fallback={<div>Loading</div>}>
          <Navbar />
        </Suspense>
        <div className="mt-10 text-3xl mx-auto max-w-6xl">
          <div>Name: container</div>
          <div>Framework: react</div>
          <div>Language: TypeScript</div>
          <div>CSS: Tailwind</div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainPage;
