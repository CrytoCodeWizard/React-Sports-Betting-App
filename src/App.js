import React,{ useEffect, useState } from "react";
import GameOverview from "./Components/GameOverview";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Select from "react-dropdown-select";

function App() {

  const [games, setGames] = useState([]);
  const [sport, setSport] = useState(window.localStorage.getItem('sport') || 'americanfootball_nfl');
  const [bookies, setBookies] = useState(new Set([]));

  const state_bookmakers = [
    { 
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "sugarhouse", "superbook", "twinspires", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 1,
      label: "Arizona"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "circasports", "draftkings", "fanduel", "foxbet", "pointsbetus", "sugarhouse", "superbook", "williamhill_us", "wynnbet"]),
      value: 2,
      label: "Colorado"
    },
    {
      bookmakers: new Set(["betrivers", "draftkings", "fanduel", "sugarhouse"]),
      value: 3,
      label: "Connecticut"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "williamhill_us"]),
      value: 4,
      label: "Illinois"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 5,
      label: "Indiana"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "circasports", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "superbook", "unibet_us", "williamhill_us"]),
      value: 6,
      label: "Iowa"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "draftkings", "fanduel", "pointsbetus", "williamhill_us"]),
      value: 7,
      label: "Kansas"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "williamhill_us", "wynnbet"]),
      value: 8,
      label: "Lousiana"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "williamhill_us"]),
      value: 9,
      label: "Maryland"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "foxbet", "pointsbetus", "sugarhouse", "williamhill_us", "wynnbet"]),
      value: 10,
      label: "Michigan"
    },
    {
      bookmakers: new Set(["betmgm"]),
      value: 11,
      label: "Mississippi"
    },
    {
      bookmakers: new Set(["circasports", "superbook", "williamhill_us"]),
      value: 12,
      label: "Nevada"
    },
    {
      bookmakers: new Set(["draftkings"]),
      value: 13,
      label: "New Hampshire"
    },
    {
      bookmakers: new Set(["barstool", "betfair", "betmgm", "betrivers", "draftkings", "fanduel", "foxbet", "pointsbetus", "sugarhouse", "superbook", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 14,
      label: "New Jersey"
    },
    {
      bookmakers: new Set(["betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "williamhill_us", "wynnbet"]),
      value: 15,
      label: "New York"
    },
    {
      bookmakers: new Set(["betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse"]),
      value: 16,
      label: "Ohio"
    },
    {
      bookmakers: new Set(["draftkings"]),
      value: 17,
      label: "Oregon"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "foxbet", "pointsbetus", "sugarhouse", "twinspires", "unibet_us", "williamhill_us"]),
      value: 18,
      label: "Pennsylvania"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "draftkings", "fanduel", "superbook", "williamhill_us", "wynnbet"]),
      value: 19,
      label: "Tennessee"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 20,
      label: "Virginia"
    },
    {
      bookmakers: new Set(["betmgm", "williamhill_us"]),
      value: 21,
      label: "Washington DC"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "sugarhouse", "williamhill_us"]),
      value: 22,
      label: "West Virginia"
    },
    {
      bookmakers: new Set(["betmgm", "draftkings", "fanduel", "williamhill_us"]),
      value: 23,
      label: "Wyoming"
    },
    
  ]

  useEffect(() => {
    const urls = ['https://odds.p.rapidapi.com/v4/sports/' + sport + '/odds?regions=us&oddsFormat=decimal&markets=spreads&dateFormat=iso', 'https://odds.p.rapidapi.com/v4/sports/' + sport + '/scores'];
    Promise.all(urls.map(url => fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_SPORT_ODDS,
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      }
    })
        .then((response) => response.json())))
        .then(([odds, scores]) => {
          var res = scores.map(x => Object.assign(x, odds.find(y => y.id === x.id)));
          setGames(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
        window.localStorage.setItem('sport', sport);
    }, [sport, bookies]);

  return (
    <div>
      <div className="title-heading">Live Sporting Odds</div>
      <p></p>
        <nav className="navbar navbar-light navbar-custom justify-content-center">    
          {sport === 'americanfootball_nfl'?<button className="active navbar-text-custom nav-button-selected" onClick={() => setSport('americanfootball_nfl')}>NFL</button>:
          <button className="active navbar-text-custom nav-button" onClick={() => setSport('americanfootball_nfl')}>NFL</button>}
          {sport === 'basketball_nba'?<button className="active navbar-text-custom nav-button-selected" onClick={() => setSport('basketball_nba')}>NBA</button>:
          <button className="active navbar-text-custom nav-button" onClick={() => setSport('basketball_nba')}>NBA</button>}
        </nav>
        <Select options={state_bookmakers} onChange={(values) => setBookies(values[0].bookmakers)} />
      <div className="app-container">
        <div className="game-container">
          <div className="all-container">
            {games.map((game) => (
              game.bookmakers?
              <GameOverview
                key={game.id}
                homeTeam={game.home_team}
                awayTeam={game.away_team}
                bookmakers={bookies.size > 0?game.bookmakers.filter((bk) => bookies.has(bk.key)):game.bookmakers}
                startTime={game.commence_time}
                sportName={game.sport_title}
                curScore={game.scores}
              />:<></>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
