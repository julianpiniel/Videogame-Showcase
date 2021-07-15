import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import "./Nav.css";
function Nav() {
  return (
    <>
      <nav>
        <div class="logo">
          <h4>Videogame ShowCase</h4>
        </div>
        <ul class="nav-links">
          <Link class="react-link" to="/">
            <li>Home</li>
          </Link>
          <Link class="react-link" to="/about">
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Nav;

/*<div className={`${styles.navContainer}`}>
        <div className="Title">
          <h1>VideoGames App</h1>
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={`${styles.home}`}>
            <h1>HOME</h1>
          </div>
        </Link>
        <div className="About">
          <h1>About</h1>
        </div>
        <div className={`${styles.henry}`}>
          <img src={"https://prep.soyhenry.com/logo.png"} alt="" />
        </div>
      </div> 
      
      <li>
            <img src="https://avatars.githubusercontent.com/u/57154655?s=200&v=4" />
          </li>
      
      */
