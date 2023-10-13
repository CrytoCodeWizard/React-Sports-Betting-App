import React, { useState } from 'react'
import PlayerPropDisplay from "./PlayerPropDisplay";
import TeamPropDisplay from './TeamPropDisplay';
import { DataProvider } from './DataContext';
import {bookmaker_names, team_titles} from '../Resources.js';

import {
    Card,
    CardBody,
    Typography,
    Button
  } from "@material-tailwind/react";
  

const GameOverview = (game) => {
    const [showTeamProps,setShowTeamProps] = useState(window.sessionStorage.getItem('team_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const [showPlayerProps, setShowPlayerProps] = useState(window.sessionStorage.getItem('player_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const [eitherPropClicked, setPlayerPropsClicked] = useState(window.sessionStorage.getItem('player_prop_clicked_' + game.game_id) === 'true' || window.sessionStorage.getItem('team_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const gameStart = new Date(game.startTime);
    const today = process.env.JEST_WORKER_ID ? new Date('2023-09-23T00:20:00Z') : new Date();
    const isLive = today>=gameStart;
    const daysTilStart = (gameStart - today) / (1000 * 3600 * 24)
    const stringifiedGameStart = gameStart.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

    return (
                
            
        <Card className="w-80" color="transparent" variant="gradient">
            <CardBody className="text-center">
                <div className="lg:hidden">
                    <div className={game.sport !== "americanfootball_ncaaf" ? "h-24 mb-1"  : "h-24 mb-3" }>
                        <div className="h-16 flex mb-1">
                            <div className="w-6/12">
                                <img className={game.sport !== "americanfootball_ncaaf" ? "w-16 h-16 opacity-80 ml-auto":"w-16 h-16 opacity-80 m-auto"} src={game.teamImages[game.sport + "_TeamImages/" + game.awayTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.awayTeam} />
                            </div>
                            <div className="w-1/12 mt-10"><Typography variant="h6" color="gray">@</Typography></div>
                            <div className="w-6/12">
                                <img className={game.sport !== "americanfootball_ncaaf" ? "w-16 h-16 transform -scale-x-100 opacity-80 mr-auto":"w-16 h-16 transform -scale-x-100 opacity-80 m-auto"} src={game.teamImages[game.sport + "_TeamImages/" + game.homeTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.homeTeam} />
                            </div>
                        </div>
                        <div className="h-8 align-top">
                            
                            <div className={game.sport !== "americanfootball_ncaaf" ? "flex w-6/12 m-auto": "flex"}>
                                <div className="w-4/12 text-center m-auto overflow-hidden text-ellipsis line-clamp-2">
                                    <Typography variant={game.sport !== "americanfootball_ncaaf" ? "h6":"small"} color="blue-gray" className="font-semibold">
                                        {team_titles[game.awayTeam] || (game.sport !== "americanfootball_ncaaf" ? game.awayTeam.substring(0,3).toUpperCase() : game.awayTeam)}
                                    </Typography>
                                </div>
                                <div className="w-4/12 text-center m-auto"></div>
                                <div className="w-4/12 text-center m-auto overflow-hidden text-ellipsis line-clamp-2">
                                    <Typography variant={game.sport !== "americanfootball_ncaaf" ? "h6":"small"} color="blue-gray" className="font-semibold">
                                        {team_titles[game.homeTeam] || (game.sport !== "americanfootball_ncaaf" ? game.homeTeam.substring(0,3).toUpperCase() : game.homeTeam)}
                                    </Typography>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                     
                    
                   
                    {isLive ? <div className={game.sport !== "americanfootball_ncaaf" ? "flex w-6/12 m-auto": "flex"}>
                            <div className="w-4/12 text-center m-auto">
                                <Typography  variant="small" color="blue-gray" className="font-medium" textGradient>
                                    {game.curScore?<span>{game.curScore[0].name === game.awayTeam ? game.curScore[0].score : game.curScore[1].score}</span>:<></>}
                                </Typography>
                            </div>
                            <div className="w-4/12 text-center m-auto">
                                <Typography  variant="small" color="blue-gray" className="font-medium" textGradient>
                                    <span className="live opacity-60">LIVE</span>
                                </Typography>
                            </div>
                            <div className="w-4/12 text-center m-auto">
                                <Typography  variant="small" color="blue-gray" className="font-medium" textGradient>
                                    {game.curScore?<span>{game.curScore[0].name === game.homeTeam ? game.curScore[0].score : game.curScore[1].score}</span>:<></>}
                                </Typography>
                            </div>
                        </div>:
                        <Typography  variant="small" color="blue-gray" className="font-medium" textGradient>
                            <span>{stringifiedGameStart}</span>
                        </Typography>}
                    
                    {!isLive && daysTilStart <= 2 && game.sport !== "americanfootball_ncaaf" ?
                    <div className="h-18 w-48 mx-auto flex justify-center items-center">
                        {showTeamProps===true?<Button variant="text" className="w-1/2 border-r-2 font-bold" color="blue" size="sm" onClick={() => teamPress()}><span className='text-miniscule'>Team<br></br>Props</span></Button>
                        :<Button variant="text" className="w-1/2 border-r-2" color="blue-gray" size="sm" onClick={() => teamPress()}><span className='text-miniscule'>Team<br></br>Props</span></Button>}
                        {showPlayerProps===true?<Button variant="text" className="w-1/2 border-l-2 font-bold" color="blue" size="sm" onClick={() => playerPress()}><span className='text-miniscule'>Player<br></br>Props</span></Button>
                        :<Button variant="text" className="w-1/2 border-l-2" color="blue-gray" size="sm" onClick={() => playerPress()}><span className='text-miniscule'>Player<br></br>Props</span></Button>}
                    </div>
                    : 
                    <div className="h-18 w-24 mx-auto flex justify-center items-center">
                        {showTeamProps===true?<Button variant="text" className="border-l-2 border-r-2 font-bold" color="blue" size="sm" onClick={() => teamPress()}><span className='text-miniscule'>Team<br></br>Props</span></Button>
                        :<Button variant="text" className="border-l-2 border-r-2" color="blue-gray" size="sm" onClick={() => teamPress()}><span className='text-miniscule'>Team<br></br>Props</span></Button>}
                    </div>
                    }
                    {showPlayerProps || showTeamProps ? <br></br>:<></>}
                </div>
                <div className="hidden lg:block">
                    <div className="h-36 mb-1">
                        <div className="h-24 flex">
                            <div className="w-6/12 text-right">
                                <img className="w-24 h-24 opacity-80 ml-auto" src={game.teamImages[game.sport + "_TeamImages/" + game.awayTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.awayTeam} />
                            </div>
                            <div className="w-1/12 mt-16"><Typography variant="h5" color="gray">@</Typography></div>
                            <div className="w-6/12 text-left">
                                <img className="w-24 h-24 transform -scale-x-100 opacity-80 mr-auto" src={game.teamImages[game.sport + "_TeamImages/" + game.homeTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.homeTeam} />
                            </div>
                        </div>
                        <div className="h-12 align-top">
                            
                            <div className={game.sport !== "americanfootball_ncaaf" ? "flex w-8/12 m-auto" : "flex"}>
                                <div className={game.sport !== "americanfootball_ncaaf" ? "w-4/12 text-center m-auto" : "w-5/12 text-center m-auto overflow-hidden text-ellipsis line-clamp-2"}>
                                    <Typography variant={game.sport !== "americanfootball_ncaaf" ? "h5":"h6"} color="blue-gray">
                                        {team_titles[game.awayTeam] || (game.sport !== "americanfootball_ncaaf" ? game.awayTeam.substring(0,3).toUpperCase() : game.awayTeam)}
                                    </Typography>
                                </div>
                                {game.sport !== "americanfootball_ncaaf" ? <div className="w-4/12 text-center m-auto"></div> : <div className="w-2/12 text-center m-auto"></div>}
                                <div className={game.sport !== "americanfootball_ncaaf" ? "w-4/12 text-center m-auto" : "w-5/12 text-center m-auto overflow-hidden text-ellipsis line-clamp-2"}>
                                    <Typography variant={game.sport !== "americanfootball_ncaaf" ? "h5":"h6"} color="blue-gray">
                                        {team_titles[game.homeTeam] || (game.sport !== "americanfootball_ncaaf" ? game.homeTeam.substring(0,3).toUpperCase() : game.homeTeam)}
                                    </Typography>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                     
                    
                     
                    <Typography  variant="h6" color="blue-gray" className="font-medium" textGradient>
                        
                        {isLive ? <div className={game.sport !== "americanfootball_ncaaf" ? "flex w-8/12 m-auto" : "flex"}>
                            <div className={game.sport !== "americanfootball_ncaaf" ? "w-4/12 text-center m-auto":"w-5/12 text-center m-auto"}>{game.curScore?<span>{game.curScore[0].name === game.awayTeam ? game.curScore[0].score : game.curScore[1].score}</span>:<></>}</div>
                            <div className={game.sport !== "americanfootball_ncaaf" ? "w-4/12 text-center m-auto":"w-2/12 text-center m-auto"}><span className="live opacity-60">LIVE</span></div>
                            <div className={game.sport !== "americanfootball_ncaaf" ? "w-4/12 text-center m-auto":"w-5/12 text-center m-auto"}>{game.curScore?<span>{game.curScore[0].name === game.homeTeam ? game.curScore[0].score : game.curScore[1].score}</span>:<></>}</div>
                        </div>:<span>{stringifiedGameStart}</span>}
                       
                    </Typography>
                    {!isLive && daysTilStart <= 2 && game.sport !== "americanfootball_ncaaf" ?
                    <div className="h-24 w-48 mx-auto flex justify-center items-center">
                        {showTeamProps===true?<Button variant="text" className="w-1/2 border-r-2 font-bold" color="blue" onClick={() => teamPress()}>Team<br></br>Props</Button>
                        :<Button variant="text" className="w-1/2 border-r-2" color="blue-gray" onClick={() => teamPress()}>Team<br></br>Props</Button>}
                        {showPlayerProps===true?<Button variant="text" className="w-1/2 border-l-2 font-bold" color="blue" onClick={() => playerPress()}>Player<br></br>Props</Button>
                        :<Button variant="text" className="w-1/2 border-l-2" color="blue-gray" onClick={() => playerPress()}>Player<br></br>Props</Button>}
                    </div>
                    : 
                    <div className="h-24 w-24 mx-auto flex justify-center items-center">
                        {showTeamProps===true?<Button variant="text" className="border-l-2 border-r-2 font-bold" color="blue" onClick={() => teamPress()}>Team<br></br>Props</Button>
                        :<Button variant="text" className="border-l-2 border-r-2" color="blue-gray" onClick={() => teamPress()}>Team<br></br>Props</Button>}
                    </div>
                    }
                </div>
                
                {(isLive || daysTilStart > 2) && showTeamProps ? 
                    <TeamPropDisplay
                        key={"team-prop-" + game.game_id}
                        game_id={game.game_id}
                        away_team={game.awayTeam}
                        home_team={game.homeTeam}
                        bookmakers={game.bookmakers}
                        sport={game.sport}
                        bookies={game.bookie_list}
                        checkedBest={game.checkedBest}
                        withinRange={false}
                    ></TeamPropDisplay> :
                eitherPropClicked ? <DataProvider game_id={game.game_id} sport={game.sport} showChild={showTeamProps}>
                    <TeamPropDisplay
                        key={"team-prop-" + game.game_id}
                        game_id={game.game_id}
                        away_team={game.awayTeam}
                        home_team={game.homeTeam}
                        bookmakers={game.bookmakers}
                        sport={game.sport}
                        bookies={game.bookie_list}
                        checkedBest={game.checkedBest}
                        withinRange={true}
                    ></TeamPropDisplay>
                    </DataProvider>:<></>
                }
                {eitherPropClicked ? <DataProvider game_id={game.game_id} sport={game.sport} showChild={showPlayerProps}>
                        <PlayerPropDisplay
                            key={"player-prop-" + game.game_id}
                            game_id={game.game_id}
                            sport={game.sport}
                            bookies={game.bookie_list}
                            checkedBest={game.checkedBest}
                        ></PlayerPropDisplay>
                    
                    </DataProvider> : <></>
                }


            </CardBody>

            
        </Card>
        
    )

    function playerPress(){
        if(eitherPropClicked === false) setPlayerPropsClicked(true);
        setShowPlayerProps(!showPlayerProps);
        setShowTeamProps(false);
        window.sessionStorage.setItem('player_prop_clicked_' + game.game_id, !showPlayerProps);
        window.sessionStorage.setItem('team_prop_clicked_' + game.game_id, false);
    }

    function teamPress(){
        if(eitherPropClicked === false) setPlayerPropsClicked(true);
        setShowTeamProps(!showTeamProps);
        setShowPlayerProps(false);
        window.sessionStorage.setItem('team_prop_clicked_' + game.game_id, !showTeamProps);
        window.sessionStorage.setItem('player_prop_clicked_' + game.game_id, false);
    }
}

export function propSortByLabel(sorter){
    return function(a,b) {
        if(sorter === a.line.labelA){
            if(!a.line.priceA || !b.line.priceA){
                if(!a.line.priceA && b.line.priceA) return 1;
                else if(!b.line.priceA && a.line.priceA) return -1;
            }
            if((a.line.pointA) < (b.line.pointA)) return -1;
            else if(a.line.pointA === b.line.pointA){
                if(a.line.priceA > b.line.priceA) return -1;
                else if(a.line.priceA === b.line.priceA){
                    if(bookmaker_names[a.bookmaker] < bookmaker_names[b.bookmaker]) return -1;
                }
            }
        }
        else{
            if(!a.line.priceB || !b.line.priceB){
                if(!a.line.priceB && b.line.priceB) return 1;
                else if(!b.line.priceB && a.line.priceB) return -1;
            }
            if((a.line.pointB) < (b.line.pointB)) return -1;
            else if(a.line.pointB === b.line.pointB){
                if(a.line.priceB > b.line.priceB) return -1;
                else if(a.line.priceB === b.line.priceB){
                    if(bookmaker_names[a.bookmaker] < bookmaker_names[b.bookmaker]) return -1;
                }
            }
        }
        return 1;
    }
}

export default GameOverview