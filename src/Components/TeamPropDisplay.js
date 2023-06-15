import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { bookmaker_links, team_prop_choices } from "./../Resources.js";
import PropDisplay from './PropDisplay';
import { 
    Select,
    Option
  } from "@material-tailwind/react";


const TeamPropDisplay = (game) => {
    const [propChoices, setPropChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState(window.localStorage.getItem('team_prop_' + game.game_id) || 'h2h');
    const [sortChoices, setSortChoices] = useState([]);
    const [sorter, setSorter] = useState(window.localStorage.getItem('team_prop_sorter_' + game.game_id) || "");
    let lastPoint = 0.0;

    useEffect(() => {

        let team_props = new Map();
        let prop_choices = [];
     
        
        for (const bookmaker of game.bookmakers){
            for (const market of bookmaker.markets){
                if(!team_props.has(market.key)){
                    prop_choices.push(market.key);
                    team_props.set(market.key, new Map());
                }
                
                team_props.get(market.key).set(bookmaker.key, {
                    labelA: market.outcomes[0].name,
                    priceA: market.outcomes[0].price,
                    pointA: market.outcomes[0].point ? market.outcomes[0].point : "",
                    labelB: market.outcomes[1].name,
                    priceB: market.outcomes[1].price,
                    pointB: market.outcomes[1].point ? market.outcomes[1].point : ""});
                
            }
        }
        setPropChoices(prop_choices);
        setData(team_props);
    
    }, [game.bookies, game.bookmakers]);

    useEffect(() => {
        if(data.has(prop)){
            let sortingChoices = [];
            let labelRetrieve = data.get(prop).values().next().value;
            if(labelRetrieve.labelA) sortingChoices.push(labelRetrieve.labelA);
            if(labelRetrieve.labelB) sortingChoices.push(labelRetrieve.labelB);
            setSortChoices(sortingChoices);

            if(sortingChoices.length > 0){
                if(sorter !== sortingChoices[0] && sorter !== sortingChoices[1]){
                    setSorter(sortingChoices[0]);
                }
            }
        }

    }, [prop, data, sorter]);

    const propSelect = useCallback((propChoice) => {
        if(propChoice !== prop){
            setProp(propChoice);
            window.localStorage.setItem('team_prop_' + game.game_id, propChoice);
        }
    }, [game.game_id, prop]);

    const sorterSelect = useCallback((sorterChoice) => {
        if(sorterChoice !== sorter){
            setSorter(sorterChoice);
            window.localStorage.setItem('team_prop_sorter_' + game.game_id, sorterChoice);
        }
    }, [sorter, game.game_id]);

    const propSelector = useMemo(() => {
        return (
          <Select key={"prop: " + propChoices + game.game_id} variant="outlined" label="Prop" color="blue" value={prop} onChange={(values) => propSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {propChoices.map((team_prop) => (
                      <Option key={team_prop} value={team_prop} className="flex items-center gap-2">
                        {team_prop_choices[team_prop]}
                      </Option>
                    ))}
                  </Select>
        );
      }, [prop, propChoices, propSelect, game.game_id]);

      const sortSelector = useMemo(() => {
        return (
          <Select key={"sorter: " + sortChoices + game.game_id} variant="outlined" label="Sort for" color="blue" value={sorter} onChange={(values) => sorterSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {sortChoices.map((label) => (
                      <Option key={label} value={label} className="flex items-center gap-2">
                        {label}
                      </Option>
                    ))}
                  </Select>
        );
      }, [sorter, sortChoices, sorterSelect, game.game_id]);
   

    return (
        <div>
            {sorter && prop && sortChoices.length > 0 && propChoices.length > 0 ? 
            <div>
                {propSelector}
                <br></br>
                {sortSelector}
            </div>
            : <></>}
            <div>
                {data.has(prop) && data.get(prop).size > 0?<div className="bookmakers-container">
                {Array.from(data.get(prop), ([bookmaker, line]) => ({ bookmaker, line })).sort(game.sortFunction(sorter)).map((bookmaker, index) => {
                    let endOfPointBucket = false;
                    if(bookmaker.line.pointA !== lastPoint || index === 0){
                        endOfPointBucket = true;
                        lastPoint = bookmaker.line.pointA;
                    }
                    return (<PropDisplay
                        key={bookmaker.bookmaker}
                        bookmaker={bookmaker.bookmaker}
                        bookmakerLink={bookmaker_links[bookmaker.bookmaker]}
                        descriptOfPriceALabel={bookmaker.line.labelA}
                        aPrice={bookmaker.line.priceA > 0 ? '+' + bookmaker.line.priceA : bookmaker.line.priceA}
                        aPoint={prop === "spreads" && bookmaker.line.pointA > 0 ? '+' + bookmaker.line.pointA : bookmaker.line.pointA}
                        descriptOfPriceBLabel={bookmaker.line.labelB}
                        bPrice={bookmaker.line.priceB > 0 ? '+' + bookmaker.line.priceB : bookmaker.line.priceB}
                        bPoint={prop === "spreads" && bookmaker.line.pointB > 0 ? '+' + bookmaker.line.pointB : bookmaker.line.pointB}
                        endOfBucket={endOfPointBucket}
                        firstEntry={index === 0 ? true : false}
                        sorter={sorter}
                    
                    />)
                })}<hr className="bookmaker-child-end-of-block"></hr>
                </div>:<p>No odds available</p>}
            </div>
            
                
            
            
        </div>
        
    )
    
}

export default TeamPropDisplay