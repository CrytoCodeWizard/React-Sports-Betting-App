import React,{ useEffect, useState } from "react";
import { player_prop_markets, player_prop_choices } from "./../PlayerPropsMarkets.js";
import Select from "react-select";
import PropDisplay from "./PropDisplay.js";
import { bookmaker_links } from "../Bookmakers.js";
import football_data from './../SampleData/americanfootball_nfl_player_props.json';
import basketball_data from './../SampleData/basketball_nba_player_props.json';
import baseball_data from './../SampleData/baseball_mlb_player_props.json';
import hockey_data from './../SampleData/hockey_nhl_player_props.json';

const PlayerPropDisplay = (event) => {

    const [individualProps, setIndividualProps] = useState(new Map());
    const [propChoices, setPropChoices] = useState([]);
    const [playerChoices, setPlayerChoices] = useState([]);
    const [sortChoices, setSortChoices] = useState([]);
    const [player, setPlayer] = useState(window.localStorage.getItem('player_prop_player_' + event.game_id)? {value:window.localStorage.getItem('player_prop_player_' + event.game_id),label:window.localStorage.getItem('player_prop_player_' + event.game_id)} : "");
    const [prop, setProp] = useState(window.localStorage.getItem('player_prop_' + event.game_id)? {value:window.localStorage.getItem('player_prop_' + event.game_id),label:player_prop_choices[window.localStorage.getItem('player_prop_' + event.game_id)]} : "");
    const [sorter, setSorter] = useState(window.localStorage.getItem('player_prop_sorter_' + event.game_id)? {value:window.localStorage.getItem('player_prop_sorter_' + event.game_id),label:window.localStorage.getItem('player_prop_sorter_' + event.game_id)} : "");
    const specMarketsForSport = player_prop_markets.filter(sport => sport["label"] === event.sport)[0]["markets"];

    
    useEffect(() => {
        /*
        const url = 'https://api.the-odds-api.com/v4/sports/' + event.sport + '/events/' + event.game_id + '/odds?regions=us&oddsFormat=american&markets=player_points&dateFormat=iso&apiKey=aa3f46ee1d1c10e731dbd155079bc050';
        fetch(url, {
        method: 'GET'
        })
            .then((response) => response.json())
            .then((odds) => {
                */
                
                let odds;
                if(event.sport === 'americanfootball_nfl') odds = football_data;
                else if(event.sport === 'baseball_mlb') odds = baseball_data;
                else if(event.sport === 'basketball_nba') odds = basketball_data;
                else odds = hockey_data;
                
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
                    setSorter("");
                    setPlayerChoices([]);
                    setSortChoices([]);
                }
                else{
                    propSelect(prop, individual_props);
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
                                                                                        })} onChange={(propChoice) => propSelect(propChoice, individualProps)} value={prop || ''} placeholder="Prop..."/>
                <Select key={`players_for_${prop}`} options={playerChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                        })} onChange={(playerChoice) => playerSelect(playerChoice)} value={player || ''} isDisabled={prop ? false : true} placeholder="Player..."/>
            </div>
            <div>
                {individualProps.has(prop.value) && individualProps.get(prop.value).has(player.value) && individualProps.get(prop.value).get(player.value).size > 0?<div className="bookmakers-container">
                {Array.from(individualProps.get(prop.value).get(player.value), ([bookmaker, line]) => ({ bookmaker, line })).sort(propSortByLabel).map((bookmaker, index) => (
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
                {prop && player ?
                <div className="state-dropdown">
                    <Select key={`sorter_for_${prop}`} options={sortChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                            })} onChange={(sorterChoice) => sorterSelect(sorterChoice)} value={sorter || ''} isDisabled={prop && player ? false : true}/>
                </div>:<></>}
            </div>
        </div>
        
    )

    function propSelect(propChoice, propMap){

        if(propMap.has(propChoice.value)){
            setProp(propChoice);
            window.localStorage.setItem('player_prop_' + event.game_id, propChoice.value);
            let playerChoices = [];
            let foundPlayer = false;
            for(const key of propMap.get(propChoice.value).keys()){
                if(key === player.value){
                    foundPlayer = true;
                }
                playerChoices.push({value:key,label:key});
            }
            setPlayerChoices(playerChoices.sort(propSort));
            playerSelect(foundPlayer ? player : playerChoices[0]);

            let sortingChoices = [];
            let labelRetrieve = propMap.get(propChoice.value).values().next().value.values().next().value;
            sortingChoices.push({value:labelRetrieve.labelA,label:labelRetrieve.labelA});
            sortingChoices.push({value:labelRetrieve.labelB,label:labelRetrieve.labelB});
            setSortChoices(sortingChoices);
            if(sorter.label !== labelRetrieve.labelA && sorter.label !== labelRetrieve.labelB){
                sorterSelect(sortingChoices[0]);
            }
        }
        else{
            setProp("");
        }
        
    }

    function playerSelect(playerChoice){
        if(playerChoice.value !== player.value){
            setPlayer(playerChoice);
            window.localStorage.setItem('player_prop_player_' + event.game_id, playerChoice.value);
        }
    }

    function sorterSelect(sorterChoice){
        if(sorterChoice.label !== sorter.label){
            setSorter(sorterChoice);
            window.localStorage.setItem('player_prop_sorter_' + event.game_id, sorterChoice.value);
        }
    }

    function propSortByLabel(a, b){
        if(sorter.label === a.line.labelA){
            if(a.line.pointA < b.line.pointA) return -1;
            else if(a.line.pointA === b.line.pointA){
                if(a.line.priceA > b.line.priceA) return -1;
                else if(a.line.priceA === b.line.priceA){
                    if(a.line.title < b.line.title) return -1;
                }
            }
        }
        else{
            if(a.line.pointB < b.line.pointB) return -1;
            else if(a.line.pointB === b.line.pointB){
                if(a.line.priceB > b.line.priceB) return -1;
                else if(a.line.priceB === b.line.priceB){
                    if(a.line.title < b.line.title) return -1;
                }
            }
        }
        return 1;
    }

    function propSort(a, b){
        if(a.label < b.label) return -1;
        else return 1;
    }
    
    
}

export default PlayerPropDisplay