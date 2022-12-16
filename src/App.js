import logo from './logo.svg';
import React,{ useEffect, useState } from "react";
import GameOverview from "./Components/GameOverview";
import './App.css';

function App() {

  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch('https://odds.p.rapidapi.com/v4/sports/americanfootball_nfl/odds?regions=us&oddsFormat=decimal&markets=spreads&dateFormat=iso', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_SPORT_ODDS,
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      }
    })
        .then((response) => response.json())
        .then((data) => {
          setGames(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, []);

  games.map((game) => (game.commence_time = new Date(game.commence_time).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})));
  return (
    <div className="app-container">
      <h1>Upcoming Games</h1>
   
      <div className="game-container">
        <div className="all-container">
          {games.map((game, index) => (
            <GameOverview
              key={game.id}
              homeTeam={game.home_team}
              awayTeam={game.away_team}
              bookmakers={game.bookmakers}
              startTime={game.commence_time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
