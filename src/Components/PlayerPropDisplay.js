import React,{ useEffect, useState } from "react";
import { player_prop_markets, player_prop_choices } from "./../PlayerPropsMarkets.js";
import Select from "react-select";
import PropDisplay from "./PropDisplay.js";
import { bookmaker_links } from "../Bookmakers.js";
import { useData } from './DataContext.js';

const PlayerPropDisplay = (event) => {

    const [individualProps, setIndividualProps] = useState(new Map());
    const [propChoices, setPropChoices] = useState([]);
    const [playerChoices, setPlayerChoices] = useState([]);
    const [sortChoices, setSortChoices] = useState([]);
    const [player, setPlayer] = useState(window.localStorage.getItem('player_prop_player_' + event.game_id)? {value:window.localStorage.getItem('player_prop_player_' + event.game_id),label:window.localStorage.getItem('player_prop_player_' + event.game_id)} : "");
    const [prop, setProp] = useState(window.localStorage.getItem('player_prop_' + event.game_id)? {value:window.localStorage.getItem('player_prop_' + event.game_id),label:player_prop_choices[window.localStorage.getItem('player_prop_' + event.game_id)]} : "");
    const [sorter, setSorter] = useState(window.localStorage.getItem('player_prop_sorter_' + event.game_id)? {value:window.localStorage.getItem('player_prop_sorter_' + event.game_id),label:window.localStorage.getItem('player_prop_sorter_' + event.game_id)} : "");
    const specMarketsForSport = player_prop_markets.filter(sport => sport["label"] === event.sport)[0]["markets"];
    const { data } = useData();
    
    useEffect(() => {
        
        let filteredMap = new Map();
        let playerPropChoices = [];
        if(data){
            console.log(data);
            for(const propKey of data.keys()){
                for(const playerKey of data.get(propKey).keys()){
                    for(const book of data.get(propKey).get(playerKey).keys()){
                        if(event.bookies.has(book)){
                            if(!filteredMap.has(propKey)){
                                filteredMap.set(propKey, new Map());
                                playerPropChoices.push({value:propKey,label:player_prop_choices[propKey]});
                            }
                            if(!filteredMap.get(propKey).has(playerKey)){
                                filteredMap.get(propKey).set(playerKey, new Map());
                            }
                            filteredMap.get(propKey).get(playerKey).set(book, data.get(propKey).get(playerKey).get(book));
                        }
                    }
                    
                }
            }
            if(filteredMap.has(prop.value)){
                propSelect(prop, filteredMap);
            }
        }
        
        
        setPropChoices(playerPropChoices.sort(propSort));
        setIndividualProps(filteredMap);

    }, [event.bookies, data]);


    if (!data) {
        return <div>Loading...</div>;
    }

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