import React,{ useEffect, useState, useMemo } from "react";
import GameOverview from "./Components/GameOverview";
//import Footer from "./Components/Footer";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { state_bookmakers, team_codes } from "./Resources.js";
import { 
  Collapse,
  Input,
  Navbar,
  Typography,
  IconButton,
  Select,
  Option
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

//import {americanfootball_nfl_team_props, americanfootball_nfl_scores} from './SampleData/americanfootball_nfl_team_props.js';
//import {icehockey_nhl_team_props, icehockey_nhl_scores} from './SampleData/hockey_nhl_team_props.js';
//import {baseball_mlb_team_props, baseball_mlb_scores} from './SampleData/baseball_mlb_team_props.js';
//import {basketball_nba_team_props, basketball_nba_scores} from './SampleData/basketball_nba_team_props.js';


function App() {
  const numGamesPerPage = 9;
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sport, setSport] = useState(window.sessionStorage.getItem('sport') || 'americanfootball_nfl');
  const [filterText, setFilterText] = useState(window.sessionStorage.getItem('filter_text_') ? window.sessionStorage.getItem('filter_text_') : '');
  const [bookies, setBookies] = useState(window.sessionStorage.getItem('usState')?state_bookmakers[window.sessionStorage.getItem('usState')]:new Set([])) ;
  const [stateName, setStateName] = useState(window.sessionStorage.getItem('usState') || "");
  const [openNav, setOpenNav] = useState(false);
  const [pages, setPages] = useState(0);
  const [endIndex, setEndIndex] = useState(numGamesPerPage);
  const stateImages = importAll(require.context('./Images/StateIcons/', true, /\.(png|jpe?g|svg)$/));
  const teamImages = importAll(require.context('./Images/TeamImages/', true, /\.(png|jpe?g|svg)$/));
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  const [active, setActive] = useState(parseInt(window.sessionStorage.getItem('page_num')) || 1);

  const next = () => {
    if (active === pages) return;
    setActive(active + 1);
  };
  
  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
          if(sport !== window.sessionStorage.getItem('sport')) setActive(1);
        })
        .catch((err) => {
          console.log(err.message);
        });
        window.sessionStorage.setItem('sport', sport);
    /*
    let odds;
    let scores;
    if(sport === 'americanfootball_nfl'){
      odds = americanfootball_nfl_team_props;
      scores = americanfootball_nfl_scores;
    }else if(sport === 'baseball_mlb') {
      odds = baseball_mlb_team_props;
      scores = baseball_mlb_scores;
    }else if(sport === 'basketball_nba') {
      odds = basketball_nba_team_props;
      scores = basketball_nba_scores;
    }else{
      odds = icehockey_nhl_team_props;
      scores = icehockey_nhl_scores;
    }
    
    
      let res = scores.map(x => Object.assign(x, odds.find(y => y.id === x.id)));
      setGames(res);
      if(sport !== window.sessionStorage.getItem('sport')) setActive(1);
    
      window.sessionStorage.setItem('sport', sport);
      */
    
    }, [sport]);

    useEffect(() => {
      let gamesFiltered = games.filter((game) => game.away_team.toLowerCase().includes(filterText.toLowerCase()) || game.home_team.toLowerCase().includes(filterText.toLowerCase()) || team_codes[game.away_team].toLowerCase().includes(filterText.toLowerCase())
      || team_codes[game.home_team].toLowerCase().includes(filterText.toLowerCase()));
      setFilteredGames(gamesFiltered);
      if(gamesFiltered.length > 0){
        let pageNumber = Math.ceil(gamesFiltered.length / numGamesPerPage);
        setPages(pageNumber);
        if(parseInt(window.sessionStorage.getItem('page_num')) > pageNumber) setActive(1);
      }
    }, [games, filterText]);

    useEffect(() => {
      window.sessionStorage.setItem('page_num', active);
      setEndIndex(active*numGamesPerPage);
    }, [active]);
  
  function stateSelect(values){
    if(!values) {
      setBookies(new Set([]));
      setStateName("");
      sessionStorage.removeItem('usState');
    }
    else{
      setBookies(state_bookmakers[values]);
      setStateName(values);
      window.sessionStorage.setItem('usState', values);
    }
    
  }

  function filterGames({ target }){
    setFilterText(target.value);
    setActive(1);
    window.sessionStorage.setItem('filter_text_', target.value);
  }

  function sportChange(sportChoice){
    setSport(sportChoice);
    window.sessionStorage.setItem('sport', sportChoice);
  }

  function NavList() {
    let inactive = "flex items-center hover:text-blue-700 transition-colors";
    let active = "flex items-center font-bold text-blue-700 transition-colors";

    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          {sport === 'basketball_nba' ?<button className={active}>NBA</button>:
          <button className={inactive} onClick={() => sportChange('basketball_nba')}>NBA</button>}
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          {sport === 'americanfootball_nfl' ?<button className={active}>NFL</button>:
          <button className={inactive} onClick={() => sportChange('americanfootball_nfl')}>NFL</button>}
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          {sport === 'icehockey_nhl' ?<button className={active}>NHL</button>:
          <button className={inactive} onClick={() => sportChange('icehockey_nhl')}>NHL</button>}
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          {sport === 'baseball_mlb' ?<button className={active}>MLB</button>:
          <button className={inactive} onClick={() => sportChange('baseball_mlb')}>MLB</button>}
        </Typography>
      </ul>
    );
  }

  const SelectInHeader = useMemo(() => {
    return (
      <Select key={stateName} selected={(element) => element && React.cloneElement(element, {className: "flex items-center px-0 gap-2 pointer-events-none",})} 
      variant="outlined" label="State" color="blue" value={stateName} onChange={(values) => stateSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                {Object.keys(state_bookmakers).map((state) => (
                  <Option key={state} value={state} className="flex items-center gap-2">
                    <img className="h-5 w-5 object-cover" src={stateImages[state + ".png"]} alt={state} />
                    {state}
                  </Option>
                ))}
              </Select>
    );
  }, [stateName, stateImages]);

  
  const InputInHeader = useMemo(() => {
    return (
      <Input
                type="search"
                color="blue"
                label="Team Search"
                value={filterText}
                onChange={filterGames}
                className="pr-20"
                containerProps={{
                  className: "min-w-[60px]",
                }}
              />
    );
  }, [filterText]);

  return (
    <div>
      <Navbar className="sticky inset-0 z-10 lg:px-8 lg:py-4 mx-auto max-w-screen-2xl">
        <div className="flex flex-wrap items-center justify-between text-blue-700">
          <Typography
            color="blue"
            variant="h6"
            className="mr-4 cursor-pointer text-inherit py-1.5"
          >
            Shop the Line
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden lg:block">
            <div className="min-w-[450px] grid grid-cols-2 gap-2">
              <div>{SelectInHeader}</div>
              <div>{InputInHeader}</div>
            </div>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
        <div className="relative flex w-full gap-2 pt-3 
         lg:hidden">
            {SelectInHeader}
            {InputInHeader}
        </div>
      </Navbar>

      <div className="mx-auto max-w-screen-xl mb-16 mt-8">
          <div className="flex flex-wrap justify-center items-center mb-16 gap-4">
            {filteredGames.length > 0 ? filteredGames.slice(endIndex-numGamesPerPage,endIndex).map((game) => (
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
                teamImages={teamImages}
              />:<></>
            )): <p className="no-upcoming-message">No Upcoming Games</p>}
          </div>

          {pages > 1 ? <div className="flex items-center justify-center gap-8">
            <IconButton
              size="sm"
              variant="outlined"
              color="blue-gray"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
              <strong className="text-blue-gray-900">{pages}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              color="blue-gray"
              onClick={next}
              disabled={active === pages}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div> : <></>}
      </div>   
    </div>
  );
}

export function importAll(r) {
  let images = {};
  r.keys().forEach(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

export default App;
