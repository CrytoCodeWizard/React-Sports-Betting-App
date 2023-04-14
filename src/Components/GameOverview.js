import React, { useState } from 'react'
import PlayerPropDisplay from "./PlayerPropDisplay";
import TeamPropDisplay from './TeamPropDisplay';

const GameOverview = (game) => {
    const [showTeamProps,setShowTeamProps] = useState(false);
    const [showPlayerProps, setShowPlayerProps] = useState(false);
    const today = new Date();
    const gameStart = new Date(game.startTime);
    const stringifiedGameStart = gameStart.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

    return (
        <div className="thumb-container">
            <div className="column-images">
                <img className="column-image" src={"./" + game.sport + "_TeamImages/" + game.awayTeam + ".jpg"} alt={game.awayTeam} />
                <img className="column-image" src={"./" + game.sport + "_TeamImages/" + game.homeTeam + ".jpg"} alt={game.homeTeam} />
            </div>
            <p className="game-text">{game.awayTeam} @ {game.homeTeam}</p>
            {today>=gameStart?<p className="live"><b>LIVE</b></p>:<p className="game-text">{stringifiedGameStart}</p>}
            <div>
                {game.curScore?<p className="game-text">{game.curScore[1].score} - {game.curScore[0].score}</p>:<p><br></br></p>}
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
                ></TeamPropDisplay>
                </div>:<></>
            }
            {showPlayerProps===true?<div className="bookmakers-container">
                <PlayerPropDisplay
                    game_id={game.game_id}
                    sport={game.sport}
                    bookies={game.bookie_list}
                ></PlayerPropDisplay>
                </div>:<></>
            }
            
        </div>
    )
}

function OddButtonClick(setButtonClicked, buttonClickedStatus, ...setToFalse){
    setButtonClicked(!buttonClickedStatus);
    for(const func of setToFalse){
        func(false);
    }
}

export default GameOverview