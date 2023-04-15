import React, {useEffect, useState} from 'react';
import { bookmaker_links } from "./../Bookmakers.js";
import {team_prop_choices} from "./../TeamPropsMarkets.js";
import Select from "react-select";
import PropDisplay from './PropDisplay';


const TeamPropDisplay = (game) => {

    const [propChoices, setPropChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState(window.localStorage.getItem('team_prop_' + game.game_id)?{value:window.localStorage.getItem('team_prop_' + game.game_id),label:team_prop_choices[window.localStorage.getItem('team_prop_' + game.game_id)]} : {value:'h2h', label:team_prop_choices['h2h']});
    
    useEffect(() => {

        let team_props = new Map()
        let prop_choices = [];
        for (const bookmaker of game.bookmakers){
            for (const market of bookmaker.markets){
                if(!team_props.has(market.key)){
                    prop_choices.push({value:market.key,label:team_prop_choices[market.key]});
                    team_props.set(market.key, new Map());
                }
                else{
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
        }

        
        setPropChoices(prop_choices);
        setData(team_props);

    }, [game.bookies]);

    function propSelect(choice){
        if(choice !== prop){
            setProp(choice);
            window.localStorage.setItem('team_prop_' + game.game_id, choice.value);
        }
    }
   

    return (
        <div>

            <div className="state-dropdown">
            <Select options={propChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                    })} defaultValue={''} onChange={(choice) => propSelect(choice)} value={prop || ''}/>
            </div>
            <div>
                {data.has(prop.value)?<div className="bookmakers-container">
                {Array.from(data.get(prop.value), ([bookmaker, line]) => ({ bookmaker, line })).sort(compareBookies).map((bookmaker, index) => (
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

export default TeamPropDisplay