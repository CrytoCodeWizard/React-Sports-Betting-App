import React,{ useEffect, useState, useMemo } from "react";
import GameOverview from "./Components/GameOverview";
import Footer from "./Components/Footer";
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
  Option,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function App() {
  
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sport, setSport] = useState(window.sessionStorage.getItem('sport') || 'americanfootball_nfl');
  const [filterText, setFilterText] = useState(window.sessionStorage.getItem('filter_text_') ? window.sessionStorage.getItem('filter_text_') : '');
  const [bookies, setBookies] = useState(window.sessionStorage.getItem('usState')?state_bookmakers[window.sessionStorage.getItem('usState')]:new Set([])) ;
  const [stateName, setStateName] = useState(window.sessionStorage.getItem('usState') || "");
  const [openNav, setOpenNav] = useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const urls = ['https://odds.p.rapidapi.com/v4/sports/' + sport + '/odds?regions=us&oddsFormat=american&markets=spreads,h2h,totals&dateFormat=iso', 'https://odds.p.rapidapi.com/v4/sports/' + sport + '/scores'];
    Promise.all(urls.map(url => fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '82753b459emshe4de95d4eec7a58p1d0969jsn5f8bccf7b65d',
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      }
    })
        .then((response) => response.json())))
        .then(([odds, scores]) => {
          let res = scores.map(x => Object.assign(x, odds.find(y => y.id === x.id)));
          setGames(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
        window.sessionStorage.setItem('sport', sport);
    }, [sport]);

    useEffect(() => {
      setFilteredGames(games.filter((game) => game.away_team.toLowerCase().includes(filterText.toLowerCase()) || game.home_team.toLowerCase().includes(filterText.toLowerCase()) || team_codes[game.away_team].toLowerCase().includes(filterText.toLowerCase())
      || team_codes[game.home_team].toLowerCase().includes(filterText.toLowerCase())));
    }, [games, filterText]);
  
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
      <Select key={stateName} variant="outlined" label="State" color="blue" value={stateName} onChange={(values) => stateSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                {Object.keys(state_bookmakers).map((state) => (
                  <Option key={state} value={state} className="flex items-center gap-2">
                    {state}
                  </Option>
                ))}
              </Select>
    );
  }, [stateName]);

  
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
      <Navbar className="sticky inset-0 z-10 lg:px-8 lg:py-4 mx-auto max-w-screen-xl">
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
