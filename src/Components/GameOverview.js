import React, { useState } from 'react'
import PlayerPropDisplay from "./PlayerPropDisplay";
import TeamPropDisplay from './TeamPropDisplay';
import { DataProvider } from './DataContext';
import {team_codes, bookmaker_names} from '../Resources.js';

import {
    Card,
    CardBody,
    Typography,
    Button
  } from "@material-tailwind/react";
  

const GameOverview = (game) => {
    const [showTeamProps,setShowTeamProps] = useState(window.sessionStorage.getItem('team_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const [showPlayerProps, setShowPlayerProps] = useState(window.sessionStorage.getItem('player_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const [playerPropsClicked, setPlayerPropsClicked] = useState(window.sessionStorage.getItem('player_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const today = process.env.JEST_WORKER_ID ? new Date('2023-08-06T00:20:00Z') : new Date();
    const gameStart = new Date(game.startTime);
    const isLive = today>=gameStart;
    const stringifiedGameStart = gameStart.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

    return (
                
            
        <Card className="w-80" color="transparent" variant="gradient">
            <CardBody className="text-center">
                <div className="lg:hidden">
                    <div className="h-16 flex justify-center items-center">
                        <img className="w-16 h-16 opacity-75" src={game.teamImages[game.sport + "_TeamImages/" + game.awayTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.awayTeam} />
                        <img className="w-16 h-16 transform -scale-x-100 opacity-75" src={game.teamImages[game.sport + "_TeamImages/" + game.homeTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.homeTeam} />
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    {team_codes[game.awayTeam]} @ {team_codes[game.homeTeam]}
                    </Typography>
                    <Typography  variant="small" color="blue-gray" className="font-medium" textGradient>
                    {isLive?<span className="live">LIVE</span>:<span>{stringifiedGameStart}</span>}
                    <br></br>
                    {game.curScore?<span>{game.curScore[1].score} - {game.curScore[0].score}</span>:<></>}
                    </Typography>
                </div>
                <div className="hidden lg:block">
                    <div className="h-24 flex justify-center items-center">
                        <img className="w-24 h-24 opacity-80" src={game.teamImages[game.sport + "_TeamImages/" + game.awayTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.awayTeam} />
                        <img className="w-24 h-24 transform -scale-x-100 opacity-80" src={game.teamImages[game.sport + "_TeamImages/" + game.homeTeam + ".png"] || game.teamImages[game.sport + "_TeamImages/NotFound.png"]} alt={game.homeTeam} />
                    </div>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                    {team_codes[game.awayTeam]} @ {team_codes[game.homeTeam]}
                    </Typography>
                    <Typography  variant="h6" color="blue-gray" className="font-medium" textGradient>
                    {isLive?<span className="live">LIVE</span>:<span>{stringifiedGameStart}</span>}
                    <br></br>
                    {game.curScore?<span>{game.curScore[1].score} - {game.curScore[0].score}</span>:<></>}
                    </Typography>
                </div>
                

                {!isLive?
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

                {showTeamProps===true?
                    <TeamPropDisplay
                        key={"team-prop-" + game.game_id}
                        game_id={game.game_id}
                        bookmakers={game.bookmakers}
                        sport={game.sport}
                        bookies={game.bookie_list}
                        checkedBest={game.checkedBest}
                    ></TeamPropDisplay>
                    :<></>
                }
                {playerPropsClicked ? <DataProvider game_id={game.game_id} sport={game.sport} showChild={showPlayerProps}>
                    <div className="bookmakers-container">
                        <PlayerPropDisplay
                            key={"player-prop-" + game.game_id}
                            game_id={game.game_id}
                            sport={game.sport}
                            bookies={game.bookie_list}
                            checkedBest={game.checkedBest}
                        ></PlayerPropDisplay>
                        </div>
                    </DataProvider> : <></>
                }


            </CardBody>

            
        </Card>
        
    )

    function playerPress(){
        if(playerPropsClicked === false) setPlayerPropsClicked(true);
        setShowPlayerProps(!showPlayerProps);
        setShowTeamProps(false);
        window.sessionStorage.setItem('player_prop_clicked_' + game.game_id, !showPlayerProps);
        window.sessionStorage.setItem('team_prop_clicked_' + game.game_id, false);
    }

    function teamPress(){
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