import { createContext, useContext, useEffect, useState } from 'react';
import football_data from './../SampleData/americanfootball_nfl_player_props.json';
import basketball_data from './../SampleData/basketball_nba_player_props.json';
import baseball_data from './../SampleData/baseball_mlb_player_props.json';
import hockey_data from './../SampleData/hockey_nhl_player_props.json';
import { player_prop_markets, player_prop_choices } from "./../PlayerPropsMarkets.js";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export const DataProvider = (event) => {
  const [data, setData] = useState(new Map());
 
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
        for(const bookmaker of odds.bookmakers){
            for(const market of bookmaker.markets){
                if(!individual_props.has(market.key)){
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
        setData(individual_props);
        console.log("HELL YEA: ", data);
        /*  
            })
            
            .catch((err) => {
            console.log(err.message);
            });
            */

  }, [event.sport]);

  return (
    <DataContext.Provider value={{ data }}>
      {data && event.showChild && event.children}
    </DataContext.Provider>
  );
}