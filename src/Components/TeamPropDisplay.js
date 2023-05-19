import React, {useEffect, useState} from 'react';
import { bookmaker_links, team_prop_choices } from "./../Resources.js";
import Select from "react-select";
import PropDisplay from './PropDisplay';


const TeamPropDisplay = (game) => {

    const [propChoices, setPropChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState(window.localStorage.getItem('team_prop_' + game.game_id)?{value:window.localStorage.getItem('team_prop_' + game.game_id),label:team_prop_choices[window.localStorage.getItem('team_prop_' + game.game_id)]} : {value:'h2h', label:team_prop_choices['h2h']});
    const [sortChoices, setSortChoices] = useState([]);
    const [sorter, setSorter] = useState(window.localStorage.getItem('player_prop_sorter_' + game.game_id)? {value:window.localStorage.getItem('player_prop_sorter_' + game.game_id),label:window.localStorage.getItem('player_prop_sorter_' + game.game_id)} : "");
    let lastPoint = 0.0;

    useEffect(() => {

        let team_props = new Map();
        let prop_choices = [];
     
        
        for (const bookmaker of game.bookmakers){
            for (const market of bookmaker.markets){
                if(!team_props.has(market.key)){
                    prop_choices.push({value:market.key,label:team_prop_choices[market.key]});
                    team_props.set(market.key, new Map());
                }
                
                team_props.get(market.key).set(bookmaker.key, {
                    title: bookmaker.title,
                    labelA: market.outcomes[0].name,
                    priceA: market.outcomes[0].price,
                    pointA: market.outcomes[0].point ? market.outcomes[0].point : "",
                    labelB: market.outcomes[1].name,
                    priceB: market.outcomes[1].price,
                    pointB: market.outcomes[1].point ? market.outcomes[1].point : ""});
                
            }
        }
        
        

        propSelect(prop, team_props);
        setPropChoices(prop_choices);
        setData(team_props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.bookies, game.bookmakers]);

    function propSelect(propChoice, prop_map){

        if(prop_map.has(propChoice.value)){
            setProp(propChoice);
            window.localStorage.setItem('team_prop_' + game.game_id, propChoice.value);
            let sortingChoices = [];
            let labelRetrieve = prop_map.get(propChoice.value).values().next().value;
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

    function sorterSelect(sorterChoice){
        if(sorterChoice.label !== sorter.label){
            setSorter(sorterChoice);
            window.localStorage.setItem('player_prop_sorter_' + game.game_id, sorterChoice.value);
        }
    }
   

    return (
        <div>

            <div className="state-dropdown">
                <Select options={propChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                        })} onChange={(propChoice) => propSelect(propChoice, data)} value={prop || ''}/>
                </div>
            <div>
                {data.has(prop.value) && data.get(prop.value).size > 0?<div className="bookmakers-container">
                {Array.from(data.get(prop.value), ([bookmaker, line]) => ({ bookmaker, line })).sort(game.sortFunction(sorter)).map((bookmaker, index) => {
                    let endOfPointBucket = false;
                    if(bookmaker.line.pointA !== lastPoint || index === 0){
                        endOfPointBucket = true;
                        lastPoint = bookmaker.line.pointA;
                    }
                    return (<PropDisplay
                        key={bookmaker.bookmaker}
                        bookmaker={bookmaker.bookmaker}
                        bookmakerLink={bookmaker_links[bookmaker.bookmaker]}
                        bookmakerTitle={bookmaker.line.title}
                        descriptOfPriceALabel={bookmaker.line.labelA}
                        aPrice={bookmaker.line.priceA > 0 ? '+' + bookmaker.line.priceA : bookmaker.line.priceA}
                        aPoint={prop.value === "spreads" && bookmaker.line.pointA > 0 ? '+' + bookmaker.line.pointA : bookmaker.line.pointA}
                        descriptOfPriceBLabel={bookmaker.line.labelB}
                        bPrice={bookmaker.line.priceB > 0 ? '+' + bookmaker.line.priceB : bookmaker.line.priceB}
                        bPoint={prop.value === "spreads" && bookmaker.line.pointB > 0 ? '+' + bookmaker.line.pointB : bookmaker.line.pointB}
                        endOfBucket={endOfPointBucket}
                        firstEntry={index === 0 ? true : false}
                        sorter={sorter.label}
                    
                    />)
                })}<hr className="bookmaker-child-end-of-block"></hr><div className="state-dropdown">
                <Select key={`sorter_for_${prop}`} options={sortChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                        })} onChange={(sorterChoice) => sorterSelect(sorterChoice)} value={sorter || ''} isDisabled={prop ? false : true}/>
            </div></div>:<p>No odds available</p>}
            </div>
            
                
            
            
        </div>
        
    )
    
}

export default TeamPropDisplay