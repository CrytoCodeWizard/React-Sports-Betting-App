import React from 'react';
import { render, screen, fireEvent, act} from '@testing-library/react';
import TeamPropDisplay from '../Components/TeamPropDisplay';
import {basketball_nba_team_props, basketball_nba_scores} from './../SampleData/basketball_nba_team_props.js';
import { state_bookmakers, team_prop_choices } from "../Resources.js";
global.ResizeObserver = require('resize-observer-polyfill')


const game_data = basketball_nba_team_props[0];
let prop_options = new Set();
let sort_options = new Set();

for(const bookmaker of game_data.bookmakers){
  for(const market of bookmaker.markets){
    prop_options.add(team_prop_choices[market.key]);
    for(const outcome of market.outcomes){
      sort_options.add(outcome.name);
    }
  }
}

describe('Team Props Component component', () => {

  const htmlToRender = 
            <TeamPropDisplay key={"team-prop-" + game_data.id}
                            game_id={game_data.id}
                            bookmakers={game_data.bookmakers.filter((bk) => state_bookmakers["All"].has(bk.key))}
                            sport={"basketball_nba"}
                            bookies={state_bookmakers["All"]}
                            checkedBest={false}/>
  

    test('prop dropdown should be present and switchable', () => {
        render(htmlToRender);
        
        const dropdowns = screen.getAllByRole("combobox");
        let propDropdown;
        for(const drop of dropdowns){
            if(prop_options.has(drop.textContent)){
                propDropdown = drop;
            }
        }
        fireEvent.click(propDropdown);
        const newOptions = screen.getAllByRole('option', {selected:false});
        let newProp = newOptions[0].textContent;
        fireEvent.click(newOptions[0]);
        expect(propDropdown.textContent).toBe(newProp);
    });

    test('sort dropdown should be present and switchable', () => {
        render(htmlToRender);
        
        const dropdowns = screen.getAllByRole("combobox");
        let sortDropdown;
        for(const drop of dropdowns){
            if(sort_options.has(drop.textContent)){
                sortDropdown = drop;
            }
        }
        fireEvent.click(sortDropdown);
        const newOptions = screen.getAllByRole('option', {selected:false});
        let newSort = newOptions[0].textContent;
        fireEvent.click(newOptions[0]);
        expect(sortDropdown.textContent).toBe(newSort);
    });
  
});
