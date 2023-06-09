import React, { useState } from 'react'
import PlayerPropDisplay from "./PlayerPropDisplay";
import TeamPropDisplay from './TeamPropDisplay';
import { DataProvider } from './DataContext';
import {team_codes} from '../Resources.js';

const GameOverview = (game) => {
    const [showTeamProps,setShowTeamProps] = useState(window.localStorage.getItem('team_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const [showPlayerProps, setShowPlayerProps] = useState(window.localStorage.getItem('player_prop_clicked_' + game.game_id) === 'true' ? true : false);
    const [playerPropsClicked, setPlayerPropsClicked] = useState(window.localStorage.getItem('player_prop_clicked_' + game.game_id) === 'true' ? true : false);;
    const today = new Date();
    const gameStart = new Date(game.startTime);
    const images = importAll(require.context('./../Images/', true, /\.(png|jpe?g|svg)$/));
    const stringifiedGameStart = gameStart.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

    return (
        <div className="thumb-container">
            <div className="column-images">
                <div className="column-image-container"><img className="column-image column-image-road" src={images[game.sport + "_TeamImages/" + game.awayTeam + ".png"]} alt={game.awayTeam} /></div>
                <div className="column-image-container"><img className="column-image column-image-home" src={images[game.sport + "_TeamImages/" + game.homeTeam + ".png"]} alt={game.homeTeam} /></div>
            </div>
            <p className="game-text">{team_codes[game.awayTeam]} @ {team_codes[game.homeTeam]}</p>
            {today>=gameStart?<p className="live"><b>LIVE</b></p>:<p className="game-text">{stringifiedGameStart}</p>}
            <div>
                {game.curScore?<p className="game-text">{game.curScore[1].score} - {game.curScore[0].score}</p>:<></>}
            </div>
            <div className="odds-button-outer">
                
                {showTeamProps===true?<button className="odds-button-selected" onClick={() => OddButtonClick(setShowTeamProps, showTeamProps, setShowPlayerProps)}><p className="odds-button-text">Team Props</p></button>:
                    <button className="odds-button" onClick={() => OddButtonClick(setShowTeamProps, showTeamProps, setShowPlayerProps)}><p className="odds-button-text">Team Props</p></button>}
                {showPlayerProps===true?<button className="odds-button-selected" onClick={() => OddButtonClick(setShowPlayerProps, showPlayerProps, setShowTeamProps)}><p className="odds-button-text">Player Props</p></button>:
                    <button className="odds-button" onClick={() => OddButtonClick(setShowPlayerProps, showPlayerProps, setShowTeamProps)}><p className="odds-button-text">Player Props</p></button>}
               
            </div>


            {showTeamProps===true?<div className="bookmakers-container">
                <TeamPropDisplay
                    game_id={game.game_id}
                    bookmakers={game.bookmakers}
                    sport={game.sport}
                    bookies={game.bookie_list}
                    sortFunction={propSortByLabel}
                ></TeamPropDisplay>
                </div>:<></>
            }
            {playerPropsClicked ? <DataProvider game_id={game.game_id} sport={game.sport} showChild={showPlayerProps}>
                <div className="bookmakers-container">
                    <PlayerPropDisplay
                        game_id={game.game_id}
                        sport={game.sport}
                        bookies={game.bookie_list}
                        sortFunction={propSortByLabel}
                    ></PlayerPropDisplay>
                    </div>
                </DataProvider> : <></>
            }
            
        </div>
    )

    function OddButtonClick(setButtonClicked, buttonClickedStatus, ...setToFalse){
       
        if(playerPropsClicked === false && buttonClickedStatus === showPlayerProps){
            setPlayerPropsClicked(true);
        }
        setButtonClicked(!buttonClickedStatus);
        for(const func of setToFalse){
            func(false);
        }

        if(setButtonClicked === setShowPlayerProps){
            window.localStorage.setItem('player_prop_clicked_' + game.game_id, !buttonClickedStatus);
            window.localStorage.setItem('team_prop_clicked_' + game.game_id, false);
        }
        else if(setButtonClicked === setShowTeamProps){
            window.localStorage.setItem('team_prop_clicked_' + game.game_id, !buttonClickedStatus);
            window.localStorage.setItem('player_prop_clicked_' + game.game_id, false);
        }
    }

    function propSortByLabel(sorter){
        return function(a,b) {
            if(sorter.label === a.line.labelA){
                if(!a.line.priceA || !b.line.priceA){
                    if(!a.line.priceA && b.line.priceA) return 1;
                    else if(!b.line.priceA && a.line.priceA) return -1;
                }
                if(Math.abs(a.line.pointA) < Math.abs(b.line.pointA)) return -1;
                else if(a.line.pointA === b.line.pointA){
                    if(a.line.priceA > b.line.priceA) return -1;
                    else if(a.line.priceA === b.line.priceA){
                        if(a.line.title < b.line.title) return -1;
                    }
                }
            }
            else{
                if(!a.line.priceB || !b.line.priceB){
                    if(!a.line.priceB && b.line.priceB) return 1;
                    else if(!b.line.priceB && a.line.priceB) return -1;
                }
                if(Math.abs(a.line.pointB) < Math.abs(b.line.pointB)) return -1;
                else if(a.line.pointB === b.line.pointB){
                    if(a.line.priceB > b.line.priceB) return -1;
                    else if(a.line.priceB === b.line.priceB){
                        if(a.line.title < b.line.title) return -1;
                    }
                }
            }
            return 1;
        }
    }


}

function importAll(r) {
    let images = {};
    r.keys().forEach(item => { images[item.replace('./', '')] = r(item); });
    return images;
}

export default GameOverview