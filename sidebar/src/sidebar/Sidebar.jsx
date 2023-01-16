import React, { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import coding_img from "../assets/coding.png";
import { Link } from "react-router-dom";
import {
  FaCamera,
  FaChartLine,
  FaMoneyBill,
  FaRandom,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [sidebarState, setSidebarState] = useState("normal");
  const [imgStyle, setImgStyle] = useState("");
  const [spanStyle, setSpanStyle] = useState("");

  const subscribeMethod = (topic, msg) => {
    setSidebarState(msg.data);
  };

  useEffect(() => {
    PubSub.subscribe("sidebarTopic", subscribeMethod);
  }, []);

  useEffect(() => {
    if (sidebarState === "minimized" || sidebarState === "hidden") {
      setTimeout(() => {
        setImgStyle("imgHidden");
      }, 200);
      setTimeout(() => {
        setSpanStyle("hidden");
      }, 150);
    } else if (sidebarState === "normal") {
      setTimeout(() => {
        setImgStyle("");
        setSpanStyle("");
      }, 100);
    }
  }, [sidebarState]);
  return (
    <aside
      className={`${styles.sidebar} ${
        sidebarState === "hidden"
          ? styles.hidden
          : sidebarState === "minimized"
          ? styles.minimized
          : ""
      }`}
    >
      <div className={styles.sidebar_logo_container}>
        <img
          src={coding_img}
          alt="coding"
          className={`${styles.img} ${
            imgStyle === "imgHidden" && styles.imgHidden
          }`}
        />
      </div>

      <ul>
        <li>
          <Link to="/landing">
            <FaCamera />
            <span
              className={`${styles.sidebar_span} ${
                (spanStyle === "minimized" || spanStyle === "hidden") &&
                styles.spanHidden
              }`}
            >
              LANDING PAGE
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaChartLine />
            <span
              className={`${styles.sidebar_span} ${
                (spanStyle === "minimized" || spanStyle === "hidden") &&
                styles.spanHidden
              }`}
            >
              DASHBOARD
            </span>
          </Link>
        </li>
        <li>
          <Link to="/landing">
            <FaRandom />
            <span
              className={`${styles.sidebar_span} ${
                (spanStyle === "minimized" || spanStyle === "hidden") &&
                styles.spanHidden
              }`}
            >
              FORMS
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaUser />
            <span
              className={`${styles.sidebar_span} ${
                (spanStyle === "minimized" || spanStyle === "hidden") &&
                styles.spanHidden
              }`}
            >
              PROFILE
            </span>
          </Link>
        </li>
        <li>
          <Link to="/landing">
            <FaShoppingBag />
            <span
              className={`${styles.sidebar_span} ${
                (spanStyle === "minimized" || spanStyle === "hidden") &&
                styles.spanHidden
              }`}
            >
              SALES
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaMoneyBill />
            <span
              className={`${styles.sidebar_span} ${
                (spanStyle === "minimized" || spanStyle === "hidden") &&
                styles.spanHidden
              }`}
            >
              CUSTOMERS
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
