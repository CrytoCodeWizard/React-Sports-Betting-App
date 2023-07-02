import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { team_prop_choices } from "./../Resources.js";
import { 
    Select,
    Option
  } from "@material-tailwind/react";
  import PropContainer from './PropContainer.js';

const TeamPropDisplay = (game) => {
    const [propChoices, setPropChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState(window.localStorage.getItem('team_prop_' + game.game_id) || 'h2h');
    const [sortChoices, setSortChoices] = useState([]);
    const [sorter, setSorter] = useState(window.localStorage.getItem('team_prop_sorter_' + game.game_id) || "");

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
            <div className="mt-8">
                {data.has(prop) && data.get(prop).size > 0?
                    <PropContainer
                        type={"team-prop-container"}
                        game_id={game.game_id}
                        bookmakerList={data.get(prop)}
                        sorter={sorter}
                        lastIndex={data.get(prop).size-1}
                        prop={prop}
                        checkedBest={game.checkedBest}
                    />:<span>No odds available</span>}
            </div>
            
                
            
            
        </div>
        
    )
    
}

export default TeamPropDisplay