import React, { useState } from 'react'
import OddsDisplay from "./OddsDisplay";

const GameOverview = (game, index) => {
    const [show,setShow] = useState(false);
    const today = new Date();
    const gameStart = new Date(game.startTime);
    return (
        <div className="thumb-container">
            <div className="column-image">
                <img src={"./TeamImages/" + game.awayTeam + ".jpg"} width="192" height="192" />
                <img src={"./TeamImages/" + game.homeTeam + ".jpg"} width="192" height="192" />
            </div>
            <p><b>{game.awayTeam}</b> @ <b>{game.homeTeam}</b></p>
            {today>=gameStart?<p className="live"><b>LIVE</b></p>:<p>{game.startTime}</p>}
            <p></p>
            <button class="button" onClick={()=>setShow(!show)}>{show===true?<p className="odds-button">Hide Odds</p>:today>=gameStart?<p className="odds-button">Live Odds</p>:<p className="odds-button">Odds</p>}</button>
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

function isFavoredOrEven(bookmaker){
   return bookmaker.markets[0].outcomes[0].point<=0;
}

export default GameOverview