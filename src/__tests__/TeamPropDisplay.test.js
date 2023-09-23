import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeamPropDisplay from '../Components/TeamPropDisplay';
import {americanfootball_nfl_team_props, americanfootball_nfl_scores} from './../SampleData/americanfootball_nfl_team_props.js';
import { state_bookmakers, team_prop_choices } from "../Resources.js";
import DataContext from '../Components/DataContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
global.ResizeObserver = require('resize-observer-polyfill')
import football_extended_data from './../SampleData/americanfootball_nfl_player_props.json';

const game_data = americanfootball_nfl_team_props[0];

const mockDataContextSuccess = {
  data:  football_extended_data, 
  status: 'success',
};

const mockDataContextLoading = {
    data:  football_extended_data, 
    status: 'loading',
  };

const mockDataContextError = {
data:  football_extended_data, 
status: 'error',
};

const queryClient = new QueryClient();

//let prop_options = new Set();
//let sub_prop_options = new Set();
//let sort_options = new Set();


describe('Team Props Component', () => {

  const htmlToRender = 
        <QueryClientProvider client={queryClient}>
        <DataContext.Provider value={mockDataContextSuccess}>
            <TeamPropDisplay key={"team-prop-" + game_data.id}
                            game_id={game_data.id}
                            away_team={game_data.awayTeam}
                            home_team={game_data.homeTeam}
                            bookmakers={game_data.bookmakers.filter((bk) => state_bookmakers["All"].has(bk.key))}
                            sport={"american_football"}
                            bookies={state_bookmakers["All"]}
                            checkedBest={false}
                            withinRange={true}/>
        </DataContext.Provider>
        </QueryClientProvider>
  
        test('on success should display Prop dropdown with h2h defaulted', () => {
          render(htmlToRender);
          const dropDownValue =  screen.queryByText('Moneyline');
          expect(dropDownValue).not.toBe(null);
        });

    
  
});
