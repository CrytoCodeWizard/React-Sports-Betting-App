import React,{ useEffect, useState } from "react";
import { player_prop_markets, player_prop_choices } from "./../PlayerPropsMarkets.js";
import Select from "react-select";
import PropDisplay from "./PropDisplay.js";
import { bookmaker_links } from "../Bookmakers.js";
import football_data from './../SampleData/americanfootball_nfl_player_props.json';
import basketball_data from './../SampleData/basketball_nba_player_props.json';
import baseball_data from './../SampleData/baseball_mlb_player_props.json';

const PlayerPropDisplay = (event) => {

    const [individualProps, setIndividualProps] = useState(new Map());
    const [propChoices, setPropChoices] = useState([]);
    const [playerChoices, setPlayerChoices] = useState([]);
    const [player, setPlayer] = useState(window.localStorage.getItem('player_prop_player_' + event.game_id)? {value:window.localStorage.getItem('player_prop_player_' + event.game_id),label:window.localStorage.getItem('player_prop_player_' + event.game_id)} : "");
    const [prop, setProp] = useState(window.localStorage.getItem('player_prop_' + event.game_id)? {value:window.localStorage.getItem('player_prop_' + event.game_id),label:player_prop_choices[window.localStorage.getItem('player_prop_' + event.game_id)]} : "");
    const specMarketsForSport = player_prop_markets.filter(sport => sport["label"] === event.sport)[0]["markets"];

    
    useEffect(() => {
        /*
        const urls = ['https://api.the-odds-api.com/v4/sports/' + event.sport + '/events/' + event.game_id + '/odds?regions=us&oddsFormat=american&markets=' + specMarketsForSport +'&dateFormat=iso&apiKey=aa3f46ee1d1c10e731dbd155079bc050'];
        Promise.all(urls.map(url => fetch(url, {
        method: 'GET',
        headers: {
            'apiKey': 'aa3f46ee1d1c10e731dbd155079bc050',
        }
        })
            .then((response) => response.json())))
            .then(([odds]) => {
                */
                let odds;
                if(event.sport === 'americanfootball_nfl') odds = football_data;
                else if(event.sport === 'baseball_mlb') odds = baseball_data;
                else if(event.sport === 'basketball_nba') odds = basketball_data;
                else odds = football_data;
                let individual_props = new Map();
                let prop_choices = [];
                for(const bookmaker of odds.bookmakers){
                    if(event.bookies.has(bookmaker.key)){
                        for(const market of bookmaker.markets){
                            if(!individual_props.has(market.key)){
                                prop_choices.push({value:market.key,label:player_prop_choices[market.key]});
                                individual_props.set(market.key, new Map());
                            }
                            for(const player_line of market.outcomes){
                                if(!individual_props.get(market.key).has(player_line.description)){
                                    individual_props.get(market.key).set(player_line.description, new Map());
                                }
        
                                if(!individual_props.get(market.key).get(player_line.description).has(bookmaker.key)){
                                    if(player_line.name === 'Over' || player_line.name === 'Yes'){
                                        individual_props.get(market.key).get(player_line.description).set(bookmaker.key, {labelA: player_line.name, labelB:'', title: bookmaker.title, pointA: player_line.point, pointB:'', priceA: player_line.price, priceB: ''});
                                    }else{
                                        individual_props.get(market.key).get(player_line.description).set(bookmaker.key, {labelB: player_line.name, labelA:'', title: bookmaker.title, pointA:'', pointB:player_line.point, priceA: '', priceB: player_line.price});
                                    }
                                }
                                else{
                                    let line = individual_props.get(market.key).get(player_line.description).get(bookmaker.key);
                                    if(player_line.name === 'Over' || player_line.name === 'Yes'){
                                        line.priceA = player_line.price;
                                        line.labelA = player_line.name;
                                        line.pointA = player_line.point;
                                    }else{
                                        line.priceB = player_line.price;
                                        line.labelB = player_line.name;
                                        line.pointB = player_line.point;
                                    }
                                }
                            }
                            
                            
                        }
                    }
                }
        
        
                if(!individual_props.has(prop.value)){
                    setProp("");
                    setPlayer("");
                    setPlayerChoices([]);
                }
                else{
                    if(!individual_props.get(prop.value).has(player.value)) setPlayer("");
                    let choices = [];
                    for(const key of individual_props.get(prop.value).keys()){
                        choices.push({value:key,label:key});
                    }
                    setPlayerChoices(choices.sort(propSort));
                }
                setPropChoices(prop_choices.sort(propSort));
                setIndividualProps(individual_props);
                /*
            })
            .catch((err) => {
            console.log(err.message);
            });
            */
        
    }, [event.bookies]);

    return (
        <div>
            <div className="state-dropdown">
                <Select key={`prop_for_${event.bookies}`} options={propChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                        })} defaultValue={""} onChange={(values) => propSelect(values)} value={prop || ''}/>
                <Select key={`players_for_${prop}`} options={playerChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                        })} defaultValue={""} onChange={(p) => playerSelect(p)} value={player || ''} isDisabled={prop ? false : true}/>
            </div>
            <div>
                {individualProps.has(prop.value) && individualProps.get(prop.value).has(player.value) && individualProps.get(prop.value).get(player.value).size > 0?<div className="bookmakers-container">
                {Array.from(individualProps.get(prop.value).get(player.value), ([bookmaker, line]) => ({ bookmaker, line })).sort(compareBookies).map((bookmaker, index) => (
                    <PropDisplay
                        key={bookmaker.bookmaker}
                        bookmaker={bookmaker.bookmaker}
                        bookmakerLink={bookmaker_links[bookmaker.bookmaker]}
                        bookmakerTitle={bookmaker.line.title}
                        descriptOfPriceALabel={bookmaker.line.labelA}
                        aPrice={bookmaker.line.priceA > 0 ? '+' + bookmaker.line.priceA : bookmaker.line.priceA}
                        aPoint={bookmaker.line.pointA}
                        descriptOfPriceBLabel={bookmaker.line.labelB}
                        bPrice={bookmaker.line.priceB > 0 ? '+' + bookmaker.line.priceB : bookmaker.line.priceB}
                        bPoint={bookmaker.line.pointB}
                    
                    />
                ))}</div>:<></>}
            </div>
        </div>
        
    )

    function propSelect(choice){
        if(choice.value !== prop.value){
            setProp(choice);
            window.localStorage.setItem('player_prop_' + event.game_id, choice.value);
            let choices = [];
            let foundPlayer = false;
            for(const key of individualProps.get(choice.value).keys()){
                console.log("key ", key);
                console.log("plauer ", player);
                if(key === player.value){
                    foundPlayer = true;
                }
                choices.push({value:key,label:key});
            }
            if(!foundPlayer) setPlayer(choices[0]);
            window.localStorage.setItem('player_prop_player_' + event.game_id, choices[0].value);
            setPlayerChoices(choices.sort(propSort));
        }
        
    }

    function playerSelect(choice){
        if(choice.value !== player.value){
            setPlayer(choice);
            window.localStorage.setItem('player_prop_player_' + event.game_id, choice.value);
        }
    }
    
}

function propSort(a, b){
    if(a.label < b.label) return -1;
    else return 1;
}

function compareBookies(a,b){
    let aPoint = Math.abs(a.line.pointA) + Math.abs(a.line.pointB), bPoint = Math.abs(b.line.pointA) + Math.abs(b.line.pointB);
    if(aPoint < bPoint){
        return -1;
    }
    else if(aPoint === bPoint){
        let aPrice = Math.abs(a.line.priceA - a.line.priceB), bPrice = Math.abs(b.line.priceA - b.line.priceB);
        if(aPrice < bPrice){
            return -1;
        }
        else if(aPrice === bPrice){
            let aTitle = a.line.title, bTitle = b.line.title;
            if(aTitle < bTitle) return -1;
            else return 1;
        }
        return 1;
    }  
    return 1;
}

export default PlayerPropDisplay