import React, { useState } from 'react'
import SpreadDisplay from "./SpreadDisplay";
import H2HDisplay from "./H2HDisplay";
import TotalsDisplay from "./TotalsDisplay";

const GameOverview = (game) => {
    const [showSpread,setShowSpread] = useState(false);
    const [showH2H,setShowH2H] = useState(false);
    const [showTotal,setShowTotal] = useState(false);
    const today = new Date();
    const gameStart = new Date(game.startTime);
    const stringifiedGameStart = gameStart.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    const spreadList = []; 
    const totalsList = [];
    const moneyLineList = [];
    
    for (const bookmaker of game.bookmakers){
        for (const market of bookmaker.markets){
            if(market.key === 'spreads'){spreadList.push(manipJSON(bookmaker, market));}
            else if(market.key === 'h2h'){moneyLineList.push(manipJSON(bookmaker, market));}
            else if(market.key === 'totals'){totalsList.push(manipJSON(bookmaker, market));}
        }
    }
    
    console.log(totalsList);
    console.log(moneyLineList);
    
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

    spreadList.sort(compareBookiesSpread);
    return (
        <div className="thumb-container">
            <div className="column-images">
                <img className="column-image" src={"./" + game.sportName + "TeamImages/" + game.awayTeam + ".jpg"} alt={game.awayTeam} />
                <img className="column-image" src={"./" + game.sportName + "TeamImages/" + game.homeTeam + ".jpg"} alt={game.homeTeam} />
            </div>
            <p className="game-text">{game.awayTeam} @ {game.homeTeam}</p>
            {today>=gameStart?<p className="live"><b>LIVE</b></p>:<p className="game-text">{stringifiedGameStart}</p>}
            <div>
                {game.curScore?<p className="game-text">{game.curScore[1].score} - {game.curScore[0].score}</p>:<p><br></br></p>}
            </div>
            <div className="odds-button-outer">
                <button className="odds-button" onClick={() => OddButtonClick('spread', showSpread, setShowSpread, showH2H, setShowH2H, showTotal, setShowTotal)}>{showSpread===true?<p className="odds-button-text">Spread</p>:<p className="odds-button-text">Spread</p>}</button>
                <button className="odds-button" onClick={() => OddButtonClick('h2h', showSpread, setShowSpread, showH2H, setShowH2H, showTotal, setShowTotal)}>{showH2H===true?<p className="odds-button-text">Moneyline</p>:<p className="odds-button-text">Moneyline</p>}</button>
                <button className="odds-button" onClick={() => OddButtonClick('total', showSpread, setShowSpread, showH2H, setShowH2H, showTotal, setShowTotal)}>{showTotal===true?<p className="odds-button-text">Total</p>:<p className="odds-button-text">Total</p>}</button>
            </div>
            {showSpread===true?<div>
                {spreadList.map((bookmaker, index) => (
                    <SpreadDisplay
                    key={bookmaker.key}
                    bookmakerTitle={bookmaker.title}
                    bookmakerLink={bookmaker_links[bookmaker.key]}
                    favoredTeam={isFirstTeamFavoredOrEvenSpread(bookmaker)?bookmaker.markets[0].outcomes[0].name:bookmaker.markets[0].outcomes[1].name}
                    odds={isFirstTeamFavoredOrEvenSpread(bookmaker)?bookmaker.markets[0].outcomes[0].point:bookmaker.markets[0].outcomes[1].point}
                    />
                    
                ))}
            </div>:<></>}
            {showH2H===true?<div>
                {moneyLineList.map((bookmaker, index) => (
                    <H2HDisplay
                    key={bookmaker.key}
                    bookmakerTitle={bookmaker.title}
                    bookmakerLink={bookmaker_links[bookmaker.key]}
                    favoredTeam={isFirstTeamFavoredML(bookmaker) ? bookmaker.markets[0].outcomes[0].name +  ' ' + EuroToAmericanMLConverter(bookmaker.markets[0].outcomes[0].price) : bookmaker.markets[0].outcomes[1].name +  ' ' + EuroToAmericanMLConverter(bookmaker.markets[0].outcomes[1].price)}
                    underdog={isFirstTeamFavoredML(bookmaker) ? bookmaker.markets[0].outcomes[1].name +  ' ' + EuroToAmericanMLConverter(bookmaker.markets[0].outcomes[1].price) : bookmaker.markets[0].outcomes[0].name +  ' ' + EuroToAmericanMLConverter(bookmaker.markets[0].outcomes[0].price)}
                    />
                    
                ))}
            </div>:<></>}
            {showTotal===true?<div>
                {totalsList.map((bookmaker, index) => (
                    <TotalsDisplay
                    key={bookmaker.key}
                    bookmakerTitle={bookmaker.title}
                    bookmakerLink={bookmaker_links[bookmaker.key]}
                    over_under={bookmaker.markets[0].outcomes[0].point}
                    />
                    
                ))}
            </div>:<></>}
            
        </div>
    )
}

function OddButtonClick(type, showSpread, setShowSpread, showH2H, setShowH2H, showTotal, setShowTotal){
    if(type==='spread'){
        setShowSpread(!showSpread);
        setShowH2H(false);
        setShowTotal(false);
    }
    else if(type==='h2h'){
        setShowH2H(!showH2H);
        setShowSpread(false);
        setShowTotal(false);
    }
    else if(type==='total'){
        setShowTotal(!showTotal);
        setShowSpread(false);
        setShowH2H(false);
    }

}

function manipJSON(bookmaker, market){
    const j = JSON.parse(JSON.stringify(bookmaker));
    j.markets = [];
    j.markets.push(market);
    return j;
}

function compareBookiesSpread(a, b) {
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
    if(isFirstTeamFavoredOrEvenSpread(bookmaker)){
        return bookmaker.markets[0].outcomes[0].point;
    }
    return bookmaker.markets[0].outcomes[0].point;
}

function isFirstTeamFavoredOrEvenSpread(bookmaker){
   return bookmaker.markets[0].outcomes[0].point<=0;
}

function isFirstTeamFavoredML(bookmaker){
    return bookmaker.markets[0].outcomes[0].price<=bookmaker.markets[0].outcomes[1].price;
}

function EuroToAmericanMLConverter(decimal){
    if(decimal < 2){
        return '' + Math.round(-100 / (decimal-1));
    }
    else{
        return '+' + Math.round((decimal - 1) * 100);
    }
}


export default GameOverview