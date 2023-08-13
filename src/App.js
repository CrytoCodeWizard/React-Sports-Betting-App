import React,{ useEffect, useState, useMemo } from "react";
import GameOverview from "./Components/GameOverview";
import './App.css';
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import { state_bookmakers, team_codes } from "./Resources.js";
import { 
  Collapse,
  Input,
  Navbar,
  Typography,
  IconButton,
  Select,
  Option,
  Spinner
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import {americanfootball_nfl_team_props, americanfootball_nfl_scores} from './SampleData/americanfootball_nfl_team_props.js';
import {icehockey_nhl_team_props, icehockey_nhl_scores} from './SampleData/hockey_nhl_team_props.js';
import {baseball_mlb_team_props, baseball_mlb_scores} from './SampleData/baseball_mlb_team_props.js';
import {basketball_nba_team_props, basketball_nba_scores} from './SampleData/basketball_nba_team_props.js';


function App() {
  const numGamesPerPage = 9;
  const [filteredGames, setFilteredGames] = useState([]);
  const [sport, setSport] = useState(window.sessionStorage.getItem('sport') || 'americanfootball_nfl');
  const [filterText, setFilterText] = useState(window.sessionStorage.getItem('filter_text_') ? window.sessionStorage.getItem('filter_text_') : '');
  const [bookies, setBookies] = useState(window.localStorage.getItem('usState')?state_bookmakers[window.localStorage.getItem('usState')]:state_bookmakers["New York"]) ;
  const [stateName, setStateName] = useState(window.localStorage.getItem('usState') || "All");
  const [openNav, setOpenNav] = useState(false);
  const [pages, setPages] = useState(0);
  const [endIndex, setEndIndex] = useState(numGamesPerPage);
  const [checkedBest, setCheckedBest] = useState(window.sessionStorage.getItem('checkedBest') === 'true' ? true : false);
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

  const fetchData = async () => {
    
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
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
      return res;
    } else {
      const url = process.env.AWS_API + '/game-data-fetch?sport=' + sport;
      const playerData = await fetch(url, {
        method: 'GET'
      });
      if (!playerData.ok) {
        console.error('HTTP Error:', playerData.status, playerData.statusText);
        throw new Error(playerData.status, playerData.statusText);
      }
      const odds = await playerData.json();
      return odds;
    }
  };

  const { data: games, status } = useQuery([sport], fetchData,
      {
        staleTime: 20000,
        refetchOnWindowFocus: true,
        retry: 2
      }
  );

  useEffect(() => {
    if(sport !== window.sessionStorage.getItem('sport')) setActive(1);
    window.sessionStorage.setItem('sport', sport);
  }, [sport]);

    useEffect(() => {
      if(games && !games.error){
        let gamesFiltered = games.filter((game) => game.away_team.toLowerCase().includes(filterText.toLowerCase()) || game.home_team.toLowerCase().includes(filterText.toLowerCase()) || team_codes[game.away_team].toLowerCase().includes(filterText.toLowerCase())
        || team_codes[game.home_team].toLowerCase().includes(filterText.toLowerCase()));
        setFilteredGames(gamesFiltered);
      
        let pageNumber = Math.min(3,Math.ceil(gamesFiltered.length / numGamesPerPage));
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
      window.localStorage.removeItem('usState');
    }
    else{
      setBookies(state_bookmakers[values]);
      setStateName(values);
      window.localStorage.setItem('usState', values);
    }
    
  }

  function filterGames({ target }){
    setFilterText(target.value);
    setActive(1);
    window.sessionStorage.setItem('filter_text_', target.value);
  }

  function sportChange(sportChoice){
    setOpenNav(false);
    setSport(sportChoice);
  }

  function checkedBestChange(checkedChoice){
    setCheckedBest(checkedChoice);
    window.sessionStorage.setItem('checkedBest', checkedChoice);
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
                label="Search"
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
      
      {status === "loading" || status === "error" ?
        <div className="flex flex-wrap justify-center items-center mt-8 mb-8">
          {status === "loading" ? <Spinner className="h-12 w-12" />:
          status === "error" ? <span className="text-red-500 font-bold text-sm text-center">An unexpected error has occurred. Please try again later</span>:<></> }
        </div> : <div>
     
      {filteredGames.length > 0 ?
      <div className="flex items-center justify-center mt-3">
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input type="checkbox" checked={checkedBest} className="sr-only peer" onChange={(value) => checkedBestChange(value.target.checked)}></input>
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-700 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300"></div>
            <span className="ml-3 text-sm font-medium text-blue-gray-500"> Only Show Best Lines</span>       
        </label>
        
      </div>
      :<></>}
      

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
                checkedBest={checkedBest}
              />:<></>
            )): <span className="text-gray-500 font-bold drop-shadow-lg text-5xl text-center">No Upcoming Games</span>}
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
            <Typography color="gray" className="font-normal mt-3">
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
      </div></div>}
      <Footer></Footer>
    </div>
  );
}

export function importAll(r) {
  let images = {};
  r.keys().forEach(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

export default App;
