import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="bigContainer">
        <div className="startButton">
          <Link to="/catalog">
            <button>Get Started</button>
          </Link>
        </div>
        <div className="witcherImg">
          <img
            src={"https://images8.alphacoders.com/542/thumb-1920-542508.jpg"}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Home;

/*
<div>
        <div className={styles.row}>
          <div>
            <img src={"https://prep.soyhenry.com/logo.png"} alt="" />{" "}
          </div>
          <div classname={styles.Title}>
            <h2>VideoGames app by Julian</h2>
          </div>
          <div classname={styles.col}></div>
        </div>
        <hr />
      </div>
*/
