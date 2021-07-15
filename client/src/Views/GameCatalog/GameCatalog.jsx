import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  get20Games,
  getGames,
  removeSearchedGamesByName,
} from "../../Redux/actions";
import { Link } from "react-router-dom";
import Showcase from "../../Components/Showcase/Showcase";
import Game from "../../Components/Game/Game";
import "./GameCatalog.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Filters from "../../Components/Filters/Filters";
import GenreAndDbFilter from "../../Components/Filters/Genre&DbFilter";

// PAGINATION OCCURS HERE

const renderGames = (games) => {
  return (
    <div className="showcase">
      {games.map((game, index) => {
        return (
          <div key={index}>
            <Link to={`/catalog/${game.id}`} style={{ textDecoration: "none" }}>
              <Game game={game} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export function GameCatalog(props) {
  let games = props.games;
  let gamesByName = props.gamesByName;
  let gamesFiltered = props.gamesFiltered;
  let fewGames = props.fewGames;
  const dispatch = useDispatch();
  //React Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [resetFlag, setResetFlag] = useState(false);
  const [shownGames, setShownGames] = useState(fewGames);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  const paginate = (shownGames) => {
    for (let i = 1; i <= Math.ceil(shownGames.length / itemsPerPage); i++)
      pages.push(i);

    let indexOfLastItem = currentPage * itemsPerPage;

    let indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let currentItems = shownGames.slice(indexOfFirstItem, indexOfLastItem);

    let renderPageNumbers = pages.map((number) => {
      return (
        <li key={number} id={number} onClick={handleClick}>
          {number}
        </li>
      );
    });

    return [renderPageNumbers, currentItems];
  };
  let [renderPageNumbers, currentItems] = paginate(shownGames);

  const handleReset = async () => {
    setResetFlag(true);
    dispatch(removeSearchedGamesByName());
  };

  useEffect(async () => {
    //if(!twentyGames>0)dispatch(get20Games)
    if (!games.length > 0) dispatch(getGames);
    if (gamesFiltered.length > 0) {
      await setShownGames(gamesFiltered);
      [renderPageNumbers, currentItems] = paginate(shownGames);
    } else if (gamesByName.length > 0) {
      await setShownGames(gamesByName);
      [renderPageNumbers, currentItems] = paginate(shownGames);
    } else if (games.length > 0) {
      await setShownGames(props.games);
      [renderPageNumbers, currentItems] = paginate(shownGames);
    } else {
      await setShownGames(props.fewGames);
      [renderPageNumbers, currentItems] = paginate(shownGames);
    }

    if (resetFlag === true) setResetFlag(false);

    //if (gamesByName.length > 0) games = gamesByName;
  }, [dispatch, fewGames, games, gamesByName, gamesFiltered, resetFlag]);

  return (
    <>
      <h3 className="title">Games</h3>
      <Link to="/postgame">
        <button className="postGame">Add your own Game!</button>
      </Link>
      <SearchBar reset={resetFlag} />
      <button className="gameFilterByName" onClick={handleReset}>
        Reset Name Filter
      </button>
      <Filters />
      <div className="showcase-and-genrefilters">
        <div className="genre-filter">
          {resetFlag == false && <GenreAndDbFilter />}
        </div>

        <div className="game-container">{renderGames(currentItems)}</div>
      </div>
      <ul className="page-numbers">{renderPageNumbers}</ul>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    gamesByName: state.gamesByName,
    gamesFiltered: state.gamesFiltered,
    fewGames: state.fewGames,
  };
};

export default connect(mapStateToProps)(GameCatalog);
