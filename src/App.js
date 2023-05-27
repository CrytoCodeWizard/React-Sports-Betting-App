import React,{ useEffect, useState } from "react";
import GameOverview from "./Components/GameOverview";
import Footer from "./Components/Footer";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Select from "react-select";
import { state_bookmakers, team_codes } from "./Resources.js";
import 'input-clear-icon/input-clear-icon.regular.css';
import 'input-clear-icon/input-clear-icon.js';

function App() {
  
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sport, setSport] = useState(window.localStorage.getItem('sport') || 'americanfootball_nfl');
  const [filterText, setFilterText] = useState(window.localStorage.getItem('filter_text_' + sport) ? window.localStorage.getItem('filter_text_' + sport) : '');
  const [bookies, setBookies] = useState(window.localStorage.getItem('usState')?state_bookmakers[window.localStorage.getItem('usState')]["bookmakers"]:new Set([])) ;
  
  useEffect(() => {
    const urls = ['https://api.the-odds-api.com/v4/sports/' + sport + '/odds?regions=us&oddsFormat=american&markets=spreads,h2h,totals&dateFormat=iso&apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS,
     'https://api.the-odds-api.com/v4/sports/' + sport + '/scores/?apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS];
    Promise.all(urls.map(url => fetch(url, {
      method: 'GET',
    })
        .then((response) => response.json())))
        .then(([odds, scores]) => {
          let res = scores.map(x => Object.assign(x, odds.find(y => y.id === x.id)));
          setGames(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
        window.localStorage.setItem('sport', sport);
    }, [sport]);

    useEffect(() => {
      setFilteredGames(games.filter((game) => game.away_team.toLowerCase().includes(filterText.toLowerCase()) || game.home_team.toLowerCase().includes(filterText.toLowerCase()) || team_codes[game.away_team].toLowerCase().includes(filterText.toLowerCase())
      || team_codes[game.home_team].toLowerCase().includes(filterText.toLowerCase())));
    }, [games, filterText]);
  
  function stateSelect(values){
    if(!values) {
      setBookies(new Set([]));
      localStorage.removeItem('usState');
    }
    else{
      setBookies(values.bookmakers);
      window.localStorage.setItem('usState', values.value);
    }
  }

  function filterGames(searchText){
    setFilterText(searchText);
    window.localStorage.setItem('filter_text_' + sport, searchText);
  }

  function sportChange(sportChoice){
    setSport(sportChoice);
    window.localStorage.setItem('filter_text_' + sport, '');
    setFilterText('');
  }

  return (
    <div>
      <div className="title-heading">Shop the Line</div>
        <nav className="navbar navbar-light navbar-custom justify-content-center">    
          {sport === 'americanfootball_nfl'?<button className="active navbar-text-custom nav-button-selected">NFL</button>:
          <button className="active navbar-text-custom nav-button" onClick={() => sportChange('americanfootball_nfl')}>NFL</button>}
          {sport === 'basketball_nba'?<button className="active navbar-text-custom nav-button-selected">NBA</button>:
          <button className="active navbar-text-custom nav-button" onClick={() => sportChange('basketball_nba')}>NBA</button>}
          {sport === 'baseball_mlb'?<button className="active navbar-text-custom nav-button-selected">MLB</button>:
          <button className="active navbar-text-custom nav-button" onClick={() => sportChange('baseball_mlb')}>MLB</button>}
          {sport === 'icehockey_nhl'?<button className="active navbar-text-custom-last nav-button-selected">NHL</button>:
          <button className="active navbar-text-custom-last nav-button" onClick={() => sportChange('icehockey_nhl')}>NHL</button>}
        </nav>
        <div className="header-container"><div className="field-in-header"><Select options={state_bookmakers} styles={{control: (baseStyles) => ({...baseStyles, width: '80%'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                      })} defaultValue={state_bookmakers[window.localStorage.getItem('usState')] || ""} onChange={(values) => stateSelect(values)} placeholder="State..."/></div>
                                                                                      <div className="field-in-header"><input className="search-bar" data-input-clear-icon-class="my-clear-icon" type="text" onInput={e => filterGames(e.target.value)} value={filterText} placeholder="Search..."/></div></div>
      <div className="app-container">
        <div className="game-container">
          <div className="all-container">
            {filteredGames.length > 0 ? filteredGames.map((game) => (
              game.bookmakers?
              <GameOverview
                key={game.id}
                game_id={game.id}
                bookie_list={bookies}
                homeTeam={game.home_team}
                awayTeam={game.away_team}
                bookmakers={bookies.size > 0?game.bookmakers.filter((bk) => bookies.has(bk.key)):game.bookmakers}
                startTime={game.commence_time}
                sport={game.sport_key}
                curScore={game.scores}
              />:<></>
            )): <p className="no-upcoming-message">No Upcoming Games</p>}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
