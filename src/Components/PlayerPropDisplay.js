import React,{ useEffect, useState, useMemo, useCallback } from "react";
import { player_prop_choices } from "../Resources.js";
import { useData } from './DataContext.js';
import { 
    Select,
    Option
  } from "@material-tailwind/react";
import PropContainer from "./PropContainer.js";

const PlayerPropDisplay = (event) => {

    const [individualProps, setIndividualProps] = useState(new Map());
    const [propChoices, setPropChoices] = useState([]);
    const [playerChoices, setPlayerChoices] = useState([]);
    const [sortChoices, setSortChoices] = useState([]);
    const [player, setPlayer] = useState(window.sessionStorage.getItem('player_prop_player_' + event.game_id) || "");
    const [prop, setProp] = useState(window.sessionStorage.getItem('player_prop_' + event.game_id) || "");
    const [sorter, setSorter] = useState(window.sessionStorage.getItem('player_prop_sorter_' + event.game_id) || "");
    const { data } = useData();
    
    useEffect(() => {
        
        let filteredMap = new Map();
        let playerPropChoices = [];
        if(data instanceof Map){
            for(const propKey of data.keys()){
                for(const playerKey of data.get(propKey).keys()){
                    for(const book of data.get(propKey).get(playerKey).keys()){
                        if(event.bookies.has(book)){
                            if(!filteredMap.has(propKey)){
                                filteredMap.set(propKey, new Map());
                                playerPropChoices.push(propKey);
                            }
                            if(!filteredMap.get(propKey).has(playerKey)){
                                filteredMap.get(propKey).set(playerKey, new Map());
                            }
                            filteredMap.get(propKey).get(playerKey).set(book, data.get(propKey).get(playerKey).get(book));
                        }
                    }
                    
                }
            }
        }
        setPropChoices(playerPropChoices.sort(propSort));
        setIndividualProps(filteredMap);

    }, [event.bookies, data]);

    useEffect(() => {
        if(individualProps.has(prop)){
            let playerChoices = [];
            for(const key of individualProps.get(prop).keys()){
                playerChoices.push(key);
            }
            setPlayerChoices(playerChoices.sort(propSort));
        }
      
    }, [individualProps, prop]);

    useEffect(() => {
        if(individualProps.has(prop) && individualProps.get(prop).has(player)){
            let sortingChoices = [];
            let aAdded = false, bAdded = false;
            let labelRetrieve = individualProps.get(prop).get(player).values();
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
      
    }, [individualProps, prop, player]);

    useEffect(() => {
        if(playerChoices.length > 0){
            let foundPlayer = false;
            for(const plyr of playerChoices){
                if(plyr === player){
                    foundPlayer = true;
                    break;
                }
            }
            if(!foundPlayer){
                setPlayer(playerChoices[0]);
                window.sessionStorage.setItem('player_prop_player_' + event.game_id, playerChoices[0]);
            }
        }
        
    }, [playerChoices, player, event]);

    useEffect(() => {
        if(sortChoices.length > 0){
            if(sorter !== sortChoices[0] && sorter !== sortChoices[1]){
                setSorter(sortChoices[0]);
                window.sessionStorage.setItem('player_prop_sorter_' + event.game_id, sortChoices[0]);
            }
        }
        
    }, [sortChoices, sorter, event]);

    const propSelect = useCallback((propChoice) => {

        if(propChoice !== prop){
            setProp(propChoice);
            window.sessionStorage.setItem('player_prop_' + event.game_id, propChoice);
        }
        
    }, [event.game_id, prop])

    const playerSelect = useCallback((playerChoice) => {
        if(playerChoice !== player){
            setPlayer(playerChoice);
            window.sessionStorage.setItem('player_prop_player_' + event.game_id, playerChoice);
        }
    }, [player, event.game_id]);

    const sorterSelect = useCallback((sorterChoice) => {
        if(sorterChoice !== sorter){
            setSorter(sorterChoice);
            window.sessionStorage.setItem('player_prop_sorter_' + event.game_id, sorterChoice);
        }
    }, [sorter, event.game_id]);

    function propSort(a, b){
        if(a < b) return -1;
        else return 1;
    }


    const propSelector = useMemo(() => {
        return (
            <Select key={"prop: " + propChoices + event.game_id} variant="outlined" label="Prop" color="blue" value={prop} onChange={(values) => propSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {propChoices.map((player_prop) => (
                        <Option key={player_prop + event.game_id} value={player_prop} className="flex items-center gap-2">
                        {player_prop_choices[player_prop]}
                        </Option>
                    ))}
                    </Select>
    );
    }, [prop, propChoices, event.game_id, propSelect]);

    const sortSelector = useMemo(() => {
        return (
            <Select key={"sorter: " + sortChoices + event.game_id} variant="outlined" label="Sort for" color="blue" value={sorter} onChange={(values) => sorterSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {sortChoices.map((label) => (
                        <Option key={label + event.game_id} value={label} className="flex items-center gap-2">
                        {label}
                        </Option>
                    ))}
                    </Select>
    );
    }, [sorter, sortChoices, event.game_id, sorterSelect]);

    const playerSelector = useMemo(() => {
        return (
            <Select key={"player: " + playerChoices + event.game_id} variant="outlined" label="Player" color="blue" value={player} onChange={(values) => playerSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {playerChoices.map((player_name) => (
                        <Option key={player_name + event.game_id} value={player_name} className="flex items-center gap-2">
                        {player_name}
                        </Option>
                    ))}
                    </Select>
    );
    }, [player, playerChoices, event.game_id, playerSelect]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {propChoices.length > 0 ? 
            <div>
                {propSelector}
                <br></br>
                {prop && playerChoices.length > 0 ? <div>{playerSelector}
                <br></br>
                {player && sortChoices.length > 0 ? <div>{sortSelector}</div>:<></>}
                </div>:<></>}
            </div>:<></>}
            
            <div className="mt-8">
                {individualProps.has(prop) && individualProps.get(prop).has(player) && individualProps.get(prop).get(player).size > 0 ?
                    <PropContainer
                        type={"team-prop-container"}
                        game_id={event.game_id}
                        bookmakerList={individualProps.get(prop).get(player)}
                        sorter={sorter}
                        lastIndex={individualProps.get(prop).get(player).size-1}
                        prop={prop}
                        checkedBest={event.checkedBest}
                    />:individualProps.size !== 0 ? <></>:<span>No odds available</span>}
            </div>
        </div>
        
    )
    
    
}

export default PlayerPropDisplay