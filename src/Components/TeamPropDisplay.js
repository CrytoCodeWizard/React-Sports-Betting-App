import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { team_prop_titles, additional_team_props, additional_team_prop_titles, team_codes } from "./../Resources.js";
import { useData } from './DataContext.js';
import { 
    Select,
    Option,
    Spinner
  } from "@material-tailwind/react";
  import PropContainer from './PropContainer.js';

const TeamPropDisplay = (game) => {
    const [propChoices, setPropChoices] = useState([]);
    const [subPropChoices, setSubPropChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState(window.sessionStorage.getItem('team_prop_' + game.game_id) || "h2h");
    const [subProp, setSubProp] = useState(window.sessionStorage.getItem('team_sub_prop_' + game.game_id) || "h2h");
    const [sortChoices, setSortChoices] = useState([]);
    const [sorter, setSorter] = useState(window.sessionStorage.getItem('team_prop_sorter_' + game.game_id) || "");
    const { data:additional_markets = {}, status = "success" } = useData() || {};
    const [additionalMarketsData, setAdditionalMarketsData] = useState(additional_markets);

    useEffect(() =>{
        if (additional_markets && additional_markets.bookmakers) {
            setAdditionalMarketsData(additional_markets);
        }
    },[additional_markets]);
    
    useEffect(() => {

        let team_props = new Map();
        let prop_choices = [];

        
        for (const bookmaker of game.bookmakers){
            for (const market of bookmaker.markets){
                if(!team_props.has(market.key)){
                    prop_choices.push(market.key);
                    team_props.set(market.key, new Map());
                    team_props.get(market.key).set(market.key, new Map());
                }
                
                team_props.get(market.key).get(market.key).set(bookmaker.key, {
                    labelA: market.outcomes[0].name,
                    priceA: market.outcomes[0].price,
                    pointA: market.outcomes[0].point ? market.outcomes[0].point : "",
                    labelB: market.outcomes[1].name,
                    priceB: market.outcomes[1].price,
                    pointB: market.outcomes[1].point ? market.outcomes[1].point : ""});
                
            }
        }
        

        if(additionalMarketsData && additionalMarketsData.bookmakers){
            for(const bookmaker of additionalMarketsData.bookmakers){
                const i = game.bookmakers.findIndex(b => b.key === bookmaker.key);
                if (i > -1) {
                    for(const market of bookmaker.markets){
                        if(additional_team_props.has(market.key)){
                            let category = "";
                            if(market.key === "alternate_spreads") category = "alternate_spreads";
                            else if(market.key.includes("h2h")) category = "h2h";
                            else if(market.key.includes("spreads")) category = "spreads";
                            else if(market.key.includes("totals")) category = "totals";
                            else continue;
                            if(!team_props.has(category) && category !== "alternate_spreads")continue;
                            
                            if(market.key === "alternate_spreads"){
                                if(!team_props.has(category)){
                                    team_props.set(market.key, new Map());
                                    prop_choices.push(market.key);
                                }
                                let j = 0;
                                while(j < market.outcomes.length){
                                    let outcome = market.outcomes[j];
                                    const k = market.outcomes.findIndex(m => outcome.point <= 0 ? (Math.abs(outcome.point) === m.point && outcome.name !== m.name) : ((outcome.point * -1) === m.point && outcome.name !== m.name));
                                    if(j > k){
                                        j++;
                                        continue;
                                    }
                                    if(k > -1){
                                        let matchedSpread = market.outcomes[k];
                                        let curKey; 
                                        if(outcome.point === 0) curKey = "EVEN";
                                        else if(outcome.name === game.away_team){
                                            curKey = team_codes[outcome.name] + " " + (outcome.point > 0 ? "+" + outcome.point : outcome.point) + " | " + team_codes[matchedSpread.name] + " " + (matchedSpread.point > 0 ? "+" + matchedSpread.point : matchedSpread.point);
                                        }else{
                                            curKey = team_codes[matchedSpread.name] + " " + (matchedSpread.point > 0 ? "+" + matchedSpread.point : matchedSpread.point) + " | " + team_codes[outcome.name] + " " + (outcome.point > 0 ? "+" + outcome.point : outcome.point);
                                        }
                                        if(!team_props.get(category).has(curKey)){
                                            team_props.get(category).set(curKey, new Map());
                                        }
                                        if(!team_props.get(category).get(curKey).has(bookmaker.key)){
                                            team_props.get(category).get(curKey).set(bookmaker.key, {
                                                labelA: outcome.name,
                                                priceA: outcome.price,
                                                pointA: outcome.point ? outcome.point : "",
                                                labelB: matchedSpread.name,
                                                priceB: matchedSpread.price,
                                                pointB: matchedSpread.point ? matchedSpread.point : ""});
                                            }
                                    }
                                    j++;
                                    
                                }
                            }
                            else{
                                if(!team_props.get(category).has(market.key)){
                                    team_props.get(category).set(market.key, new Map());
                                }

                                team_props.get(category).get(market.key).set(bookmaker.key, {
                                    labelA: market.outcomes[0].name,
                                    priceA: market.outcomes[0].price,
                                    pointA: market.outcomes[0].point ? market.outcomes[0].point : market.outcomes[0].point === 0 ? "EVEN" : "",
                                    labelB: market.outcomes[1].name,
                                    priceB: market.outcomes[1].price,
                                    pointB: market.outcomes[1].point ? market.outcomes[1].point : market.outcomes[1].point === 0 ? "EVEN" : ""});
                            }
                        }
                    }
                }
            }
        }

        setPropChoices(prop_choices);
        setData(team_props);
    
    }, [game, additionalMarketsData]);

    useEffect(() => {
        if(data.has(prop)){
            let subPropChoices = [];
            for(const key of data.get(prop).keys()){
                subPropChoices.push(key);
            }
            setSubPropChoices(prop === "alternate_spreads" ? subPropChoices.sort(alt_spread_sort) : subPropChoices.sort(partial_periods_sort));
        }
      
    }, [data, prop]);

    useEffect(() => {
        if(data.has(prop) && data.get(prop).has(subProp)){
            let sortingChoices = [];
            let aAdded = false, bAdded = false;
            let labelRetrieve = data.get(prop).get(subProp).values();
            for(const bookieVal of labelRetrieve){
                if(!aAdded && bookieVal.labelA){
                    aAdded = true;
                    sortingChoices.push(bookieVal.labelA);
                }
                if(!bAdded && bookieVal.labelB){
                    bAdded = true;
                    sortingChoices.push(bookieVal.labelB);
                }
                
            }
            setSortChoices(sortingChoices);
        }
      
    }, [data, prop, subProp]);

    useEffect(() => {
        if(subPropChoices.length > 0){
            let foundSubProp = false;
            for(const subPrp of subPropChoices){
                if((prop !== "alternate_spreads" && additional_team_prop_titles[subPrp] === additional_team_prop_titles[subProp]) || (prop === "alternate_spreads" && subPrp === subProp)){
                    foundSubProp = true;
                    setSubProp(subPrp);
                    window.sessionStorage.setItem('team_sub_prop_' + game.game_id, subPrp);
                    break;
                }
            }
            if(!foundSubProp){
                setSubProp(subPropChoices[0]);
                window.sessionStorage.setItem('team_sub_prop_' + game.game_id, subPropChoices[0]);
            }
        }
        // eslint-disable-next-line
    }, [subPropChoices, game]);
    

    useEffect(() => {
        if(sortChoices.length > 0){
            if(sorter !== sortChoices[0] && sorter !== sortChoices[1]){
                setSorter(sortChoices[0]);
                window.sessionStorage.setItem('team_prop_sorter_' + game.game_id, sortChoices[0]);
            }
        }
        
    }, [sortChoices, sorter, game]);

    const propSelect = useCallback((propChoice) => {
        if(propChoice !== prop){
            setProp(propChoice);
            window.sessionStorage.setItem('team_prop_' + game.game_id, propChoice);
        }
    }, [game.game_id, prop]);

    const subPropSelect = useCallback((subPropChoice) => {
        if(subPropChoice !== subProp){
            setSubProp(subPropChoice);
            window.sessionStorage.setItem('team_sub_prop_' + game.game_id, subPropChoice);
        }
    }, [subProp, game.game_id]);

    const sorterSelect = useCallback((sorterChoice) => {
        if(sorterChoice !== sorter){
            setSorter(sorterChoice);
            window.sessionStorage.setItem('team_prop_sorter_' + game.game_id, sorterChoice);
        }
    }, [sorter, game.game_id]);

    const propSelector = useMemo(() => {
        return (
          <Select key={"prop: " + propChoices + game.game_id} variant="outlined" label="Prop" color="blue" value={prop} onChange={(values) => propSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {propChoices.map((team_prop) => (
                      <Option key={team_prop} value={team_prop} className="flex items-center gap-2">
                        {team_prop_titles[team_prop]}
                      </Option>
                    ))}
                  </Select>
        );
      }, [prop, propChoices, propSelect, game.game_id]);

      const subPropSelector = useMemo(() => {
        if(game.withinRange){
            return (
                <Select key={"subProp: " + subPropChoices + game.game_id} disabled={!game.withinRange} variant="outlined" label={prop === "alternate_spreads" ? "Spread" : "Type"} color="blue" value={subProp} onChange={(values) => subPropSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                        {subPropChoices.map((sub_prop) => (
                            <Option key={sub_prop + game.game_id} value={sub_prop} className="flex items-center gap-2">
                                {prop === "alternate_spreads" ? 
                                <div className="flex w-60">
                                    <div className="w-1/2 text-left">{sub_prop.split("|")[0]}</div>
                                    <div className="w-1/2 text-left">{sub_prop.split("|")[1]}</div>
                                </div>
                                : <span>{additional_team_prop_titles[sub_prop] || sub_prop}</span>}
                            
                            </Option>
                        ))}
                        </Select>
                    );
        }else{
            return <></>
        }
        }, [subProp, subPropChoices, game, subPropSelect, prop]);

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

    function alt_spread_sort(a, b){
        let arrAPoint = a.includes("EVEN") ? "0" : a.split(" ")[1];
        let arrBPoint = b.includes("EVEN") ? "0" : b.split(" ")[1];
        return parseFloat(arrAPoint) < parseFloat(arrBPoint) ? -1 : 1;  
    }

    function partial_periods_sort(a, b){
        return a < b ? -1 : 1; 
    }

    if(status ==="success"){
        return (
            <div>
                {propChoices.length > 0 ? 
                <div>
                    {propSelector}
                    <br></br>
                    {prop && subPropChoices.length > 0 ? <div>{subPropSelector}
                    {game.withinRange ? <br></br> : <></>}
                    {subProp && sortChoices.length > 0 ? <div>{sortSelector}</div>:<></>}
                    </div>:<></>}
                </div>:<></>}

                <div className="mt-8">
                    {data.has(prop) && data.get(prop).has(subProp) && data.get(prop).get(subProp).size > 0?
                        <PropContainer
                            type={"team-prop-container"}
                            game_id={game.game_id}
                            bookmakerList={data.get(prop).get(subProp)}
                            sorter={sorter}
                            lastIndex={data.get(prop).get(subProp).size-1}
                            prop={prop}
                            checkedBest={game.checkedBest}
                        />:data.size !== 0 ? <></>:<span>No odds available</span>}
                </div>
                
                    
                
                
            </div>
        
        )
    }else{
        return (
            <div className="flex flex-wrap justify-center items-center">
                {status === "loading" ? <Spinner data-testid="loader" className="h-8 w-8" />:
                status === "error" ? <span className="text-red-500 font-bold text-sm text-center">An unexpected error has occurred. Please try again later</span>:<></> }
            </div>
        )
    }
    
}

export default TeamPropDisplay