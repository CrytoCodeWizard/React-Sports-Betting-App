import React,{ useEffect, useState } from "react";
import GameOverview from "./Components/GameOverview";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [games, setGames] = useState([]);
  const [sport, setSport] = useState('americanfootball_nfl');

  useEffect(() => {
    fetch('https://odds.p.rapidapi.com/v4/sports/' + sport + '/odds?regions=us&oddsFormat=decimal&markets=spreads&dateFormat=iso', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_SPORT_ODDS,
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      }
    })
        .then((response) => response.json())
        .then((data) => {
          data.map((game) => (game.commence_time = new Date(game.commence_time).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})));
          setGames(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, [sport]);

  return (
    <div>
      <div className="title-heading">Live Sporting Odds</div>
      <p></p>
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
            <div
              className="collapse navbar-collapse justify-content-center"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <button className="nav-link active navbar-text-custom" onClick={() => setSport('americanfootball_nfl')}>NFL</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link active navbar-text-custom" onClick={() => setSport('basketball_nba')}>NBA</button>
                </li>
              </ul>
            </div>
        </nav>
      <div className="app-container">
        <div className="game-container">
          <div className="all-container">
            {games.map((game) => (
              <GameOverview
                key={game.id}
                homeTeam={game.home_team}
                awayTeam={game.away_team}
                bookmakers={game.bookmakers}
                startTime={game.commence_time}
                sportName={game.sport_title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
