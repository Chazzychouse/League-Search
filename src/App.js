import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import React, { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [moreData, setMoreData] = useState({});
  const API_KEY = "RGAPI-1feb4546-c319-4568-a975-c8eac306985e";

  function searchForPlayer(event) {
    var APICallString =
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      API_KEY;

    axios
      .get(APICallString)
      .then(function (response) {
        //success
        setPlayerData(response.data);
      })
      .catch(function (error) {
        //Error
        console.log(error);
      });
  }

  let summoner_id = playerData.id;
  let summonerString = "" + summoner_id;

  function getPlayerDetails(event) {
    var detailCallString =
      "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
      summonerString +
      "?api_key=" +
      API_KEY;
    axios
      .get(detailCallString)
      .then(function (response) {
        //success
        setMoreData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        //Error
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <h5>League Search</h5>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        <button onClick={(e) => searchForPlayer(e)}>Search</button>
      </div>
      <div id="loaded-content">
        {JSON.stringify(playerData) != "{}" ? (
          <>
            <p id="player-name">{playerData.name}</p>
            <div className="break"></div>
            <p id="player-level">Summoner Level: {playerData.summonerLevel}</p>
            <div className="break"></div>
            <img
              height="100"
              width="100"
              id="icon"
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/" +
                playerData.profileIconId +
                ".png"
              }
              alt="a"
            />
            <div className="break"></div>
            <button id="details" onClick={(e) => getPlayerDetails(e)}>
              More Details
            </button>
            <div className="break"></div>
          </>
        ) : (
          <>
            <p>No player data</p>
          </>
        )}
      </div>
      <div id="loaded-details">
        {JSON.stringify(moreData) != "{}" ? (
          <>
            <p>Rank: {moreData[0].tier + " " + moreData[0].rank}</p>
            <p>
              Wins: {moreData[0].wins} Losses: {moreData[0].losses}
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
    //Fix this bug ^^
  );
}

export default App;
