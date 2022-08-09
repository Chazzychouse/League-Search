import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import React, { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
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

  console.log(playerData);

  return (
    <div className="App">
      <div className="container">
        <h5>League Search</h5>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        <button onClick={(e) => searchForPlayer(e)}>Search</button>
      </div>
      {JSON.stringify(playerData) != "{}" ? (
        <>
          <p>{playerData.name}</p>
          <p>Summoner Level: {playerData.summonerLevel}</p>
          <img
            height="100"
            width="100"
            src={
              "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/" +
              playerData.profileIconId +
              ".png"
            }
            alt="a"
          />
        </>
      ) : (
        <>
          <p>No player data</p>
        </>
      )}
    </div>
  );
}

export default App;
