import React, {useEffect, useState, useRef} from 'react';
import { bookmaker_links } from "./../Bookmakers.js";
import {team_prop_choices} from "./../TeamPropsMarkets.js";
import Select from "react-select";
import PropDisplay from './PropDisplay';


const TeamPropDisplay = (game) => {

    const [propChoices, setPropChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState("");
    
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
                        bookmakerTitle: bookmaker.title,
                        LabelA: market.outcomes[0].name,
                        PriceA: market.outcomes[0].price,
                        PointsA: market.outcomes[0].point ? market.outcomes[0].point : "",
                        LabelB: market.outcomes[1].name,
                        PriceB: market.outcomes[1].price,
                        PointsB: market.outcomes[1].point ? market.outcomes[1].point : ""});
                }
            }
        }

        setPropChoices(prop_choices);
        setData(team_props);

    }, [game.bookies]);

   

    return (
        <div>

            <div className="state-dropdown">
            <Select options={propChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                    })} defaultValue={''} onChange={(prop) => setProp(prop)} value={prop || ''}/>
            </div>
            <div>
                {data.has(prop.value)?<div className="bookmakers-container">
                {Array.from(data.get(prop.value), ([bookmaker, line]) => ({ bookmaker, line })).map((bookmaker, index) => (
                    <PropDisplay
                        key={bookmaker.bookmaker}
                        bookmaker={bookmaker.bookmaker}
                        bookmakerLink={bookmaker_links[bookmaker.bookmaker]}
                        bookmakerTitle={bookmaker.line.bookmakerTitle}
                        descriptOfPriceALabel={bookmaker.line.LabelA}
                        aPrice={bookmaker.line.PriceA > 0 ? '+' + bookmaker.line.PriceA : bookmaker.line.PriceA}
                        aPoint={bookmaker.line.PointsA}
                        descriptOfPriceBLabel={bookmaker.line.LabelB}
                        bPrice={bookmaker.line.PriceB > 0 ? '+' + bookmaker.line.PriceB : bookmaker.line.PriceB}
                        bPoint={bookmaker.line.PointsB}
                    
                    />
                ))}</div>:<></>}
            </div>

            
            
        </div>
        
    )
    
}

export default TeamPropDisplay