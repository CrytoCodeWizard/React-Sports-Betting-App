import React, { useState } from 'react'
import OddsDisplay from "./OddsDisplay";

const GameOverview = (game) => {
    const [show,setShow] = useState(false);
    const today = new Date();
    const gameStart = new Date(game.startTime);
    const stringifiedGameStart = gameStart.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    
    const bookmaker_links={ 
        "barstool":"https://www.barstoolsportsbook.com/",
        "betonlineag":"https://www.betonline.ag/",
        "betfair":"https://www.betfair.com/",
        "betmgm":"https://sports.ny.betmgm.com/en/sports",
        "betrivers":"https://betrivers.com/?page=landing#home",
        "betus":"https://www.betus.com.pa/sportsbook/",
        "bovada":"https://www.bovada.lv/",
        "circasports":"https://co.circasports.com/sports",
        "draftkings":"https://www.draftkings.com/",
        "fanduel":"https://sportsbook.fanduel.com/",
        "foxbet":"https://www.foxbet.com/",
        "gtbets":"https://www.gtbets.ag/",
        "intertops":"https://sports.everygame.eu/",
        "lowvig":"https://sportsbook.lowvig.ag/",
        "mybookieag":"https://www.mybookie.ag/sportsbook/",
        "pointsbetus":"https://pointsbet.com/",
        "sugarhouse":"https://www.playsugarhouse.com/",
        "superbook":"https://co.superbook.com/sports",
        "twinspires":"https://www.twinspires.com/",
        "unibet_us":"https://unibet.com/",
        "williamhill_us":"https://www.williamhill.com/us/",
        "wynnbet":"https://www.wynnbet.com/"
    };

    game.bookmakers.sort(compareBookies);
    return (
        <div className="thumb-container">
            <div className="column-image">
                <img src={"./" + game.sportName + "TeamImages/" + game.awayTeam + ".jpg"} alt={game.awayTeam} width="208" height="208" />
                <img src={"./" + game.sportName + "TeamImages/" + game.homeTeam + ".jpg"} alt={game.homeTeam} width="208" height="208" />
            </div>
            <p className="game-text">{game.awayTeam} @ {game.homeTeam}</p>
            {today>=gameStart?<p className="live"><b>LIVE</b></p>:<p className="game-text">{stringifiedGameStart}</p>}
            <p></p>
            <button className="odds-button" onClick={()=>setShow(!show)}>{show===true?<p className="odds-button-text">Hide Odds</p>:today>=gameStart?<p className="odds-button-text">Live Odds</p>:<p className="odds-button-text">Odds</p>}</button>
            {show===true?<p></p>:<></>}
            {show===true?<div>
                {game.bookmakers.map((bookmaker, index) => (
                    <OddsDisplay
                    key={bookmaker.key}
                    bookmakerTitle={bookmaker.title}
                    bookmakerLink={bookmaker_links[bookmaker.key]}
                    favoredTeam={isFirstTeamFavoredOrEven(bookmaker)?bookmaker.markets[0].outcomes[0].name:bookmaker.markets[0].outcomes[1].name}
                    odds={isFirstTeamFavoredOrEven(bookmaker)?bookmaker.markets[0].outcomes[0].point:bookmaker.markets[0].outcomes[1].point}
                    />
                    
                ))}
            </div>:<></>}
        </div>
    )
}

function compareBookies(a, b) {
    var aOdds = getSpread(a), bOdds = getSpread(b);

    if(Math.abs(aOdds) < Math.abs(bOdds)){
        return -1;
    }
    else if(aOdds === bOdds){
        if(a.title.toLowerCase() < b.title.toLowerCase()){
            return -1;
        }
    }
    return 1;
}

function getSpread(bookmaker){
    if(isFirstTeamFavoredOrEven(bookmaker)){
        return bookmaker.markets[0].outcomes[0].point;
    }
    return bookmaker.markets[0].outcomes[0].point;
}

function isFirstTeamFavoredOrEven(bookmaker){
   return bookmaker.markets[0].outcomes[0].point<=0;
}


export default GameOverview