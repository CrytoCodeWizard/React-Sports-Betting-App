import React, { useState } from 'react'
import OddsDisplay from "./OddsDisplay";

const GameOverview = (game) => {
    const [show,setShow] = useState(false);
    const today = new Date();
    const gameStart = new Date(game.startTime);
    game.bookmakers.sort(compareBookies);
    return (
        <div className="thumb-container">
            <div className="column-image">
                <img src={"./" + game.sportName + "TeamImages/" + game.awayTeam + ".jpg"} alt={game.awayTeam} width="208" height="208" />
                <img src={"./" + game.sportName + "TeamImages/" + game.homeTeam + ".jpg"} alt={game.homeTeam} width="208" height="208" />
            </div>
            <p className="game-text">{game.awayTeam} @ {game.homeTeam}</p>
            {today>=gameStart?<p className="live"><b>LIVE</b></p>:<p className="game-text">{game.startTime}</p>}
            <p></p>
            <button className="odds-button" onClick={()=>setShow(!show)}>{show===true?<p className="odds-button-text">Hide Odds</p>:today>=gameStart?<p className="odds-button-text">Live Odds</p>:<p className="odds-button-text">Odds</p>}</button>
            {show===true?<p></p>:<></>}
            {show===true?<div>
                {game.bookmakers.map((bookmaker, index) => (
                    <OddsDisplay
                    key={bookmaker.key}
                    bookmakerTitle={bookmaker.title}
                    favoredTeam={isFavoredOrEven(bookmaker)?bookmaker.markets[0].outcomes[0].name:bookmaker.markets[0].outcomes[1].name}
                    odds={isFavoredOrEven(bookmaker)?bookmaker.markets[0].outcomes[0].point:bookmaker.markets[0].outcomes[1].point}
                    />
                    
                ))}
            </div>:<></>}
        </div>
    )
}

function compareBookies(a, b) {
    if(a.title.toLowerCase() < b.title.toLowerCase()){
        return -1;
    }
    return 1;
}

function isFavoredOrEven(bookmaker){
   return bookmaker.markets[0].outcomes[0].point<=0;
}

export default GameOverview