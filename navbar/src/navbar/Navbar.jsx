import React, { useState, useEffect } from "react";
import PubSub from "pubsub-js";
import main_logo from "../assets/calendar.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [sidebarState, setSidebarState] = useState("normal");

  const subscribeMethod = (topic, msg) => {
    setSidebarState(msg.data);
  };

  const publishTopic = (sidebarPayload) => {
    let msg = { data: sidebarPayload };
    PubSub.publish("sidebarTopic", msg);
  };

  useEffect(() => {
    PubSub.subscribe("sidebarTopic", subscribeMethod);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (sidebarState === "normal") {
      publishTopic("minimized");
    } else if (sidebarState === "minimized") {
      publishTopic("hidden");
    } else if (sidebarState === "hidden") {
      publishTopic("normal");
    }
  };
  return (
    <nav className={styles.topNav}>
      <div className={styles.header_logo_container}>
        <img
          src={main_logo}
          alt="notebook"
          className={styles.img}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>

      <div className={styles.headerUl}>
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Pricing</li>
        </ul>
      </div>

      <div className={styles.headerButtonsContainer}>
        <button className={styles.btn}>Sign Up</button>
        <button className={styles.btn}>Login</button>
      </div>
    </nav>
  );
}
