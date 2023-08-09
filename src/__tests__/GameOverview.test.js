import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameOverview from '../Components/GameOverview';
import {americanfootball_nfl_team_props, americanfootball_nfl_scores} from './../SampleData/americanfootball_nfl_team_props.js';
import {basketball_nba_team_props, basketball_nba_scores} from './../SampleData/basketball_nba_team_props.js';
import { state_bookmakers } from "../Resources.js";
import chiefs from './../Images/TeamImages/americanfootball_nfl_TeamImages/Kansas City Chiefs.png';
import lions from './../Images/TeamImages/americanfootball_nfl_TeamImages/Detroit Lions.png';
import nuggets from './../Images/TeamImages/basketball_nba_TeamImages/Denver Nuggets.png';
import heat from './../Images/TeamImages/basketball_nba_TeamImages/Miami Heat.png';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { team_codes } from "../Resources.js";

const upcoming_game_data = americanfootball_nfl_team_props[0];
const upcoming_score_data = americanfootball_nfl_scores[0];
const live_game_data = basketball_nba_team_props[0];
const live_score_data = basketball_nba_scores[0];
const queryClient = new QueryClient();

const images = {
    "americanfootball_nfl_TeamImages/Kansas City Chiefs.png" : chiefs,
    "americanfootball_nfl_TeamImages/Detroit Lions.png" : lions,
    "basketball_nba_TeamImages/Denver Nuggets.png" : nuggets,
    "basketball_nba_TeamImages/Miami Heat.png" : heat
}


describe('Game Overview component, upcoming game', () => {

    const htmlToRender = <GameOverview 
        key={upcoming_game_data.id}
        game_id={upcoming_game_data.id}
        bookie_list={state_bookmakers["All"]}
        homeTeam={upcoming_game_data.home_team}
        awayTeam={upcoming_game_data.away_team}
        bookmakers={upcoming_game_data.bookmakers}
        startTime={upcoming_game_data.commence_time}
        sport={upcoming_game_data.sport_key}
        curScore={upcoming_score_data.scores}
        teamImages={images}
        checkedBest={false}
    />

    test('should be 4 images at the top of the game overview (2 per screen size)', () => {
        render(htmlToRender);
        const homeTeamImages = screen.getAllByAltText(upcoming_game_data.home_team);
        const awayTeamImages = screen.getAllByAltText(upcoming_game_data.away_team);
        expect(homeTeamImages).toHaveLength(2);
        expect(awayTeamImages).toHaveLength(2);
        for(const img of homeTeamImages){
            const altImg = img.getAttribute('alt');
            expect(altImg).toBe(upcoming_game_data.home_team);
        }
        for(const img of awayTeamImages){
            const altImg = img.getAttribute('alt');
            expect(altImg).toBe(upcoming_game_data.away_team);
        }  
    });

    test('should have match-up listed as away team @ home team (in team codes)', () => {
        render(htmlToRender);
        const matchupText = screen.getByText(team_codes[upcoming_game_data.away_team] + ' @ ' +  team_codes[upcoming_game_data.home_team]);
        expect(matchupText).not.toBe(null);
    });

    test('should have commence time listed in proper format', () => {
        render(htmlToRender);
        const startTime = screen.getByText(new Date(upcoming_game_data.commence_time).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}));
        expect(startTime).not.toBe(null);
    });

    test('should have clickable team props button that sets team props to active', () => {
        render(htmlToRender);
        const team_props_button = screen.getByText('TeamProps');
        fireEvent.click(team_props_button);
        const propDrop = screen.queryByText('Prop');
        expect(propDrop).not.toBe(null);
    });

    test('should have clickable player props button that sets player props to active', () => {
        render(<QueryClientProvider client={queryClient}><GameOverview 
            key={upcoming_game_data.id}
            game_id={upcoming_game_data.id}
            bookie_list={state_bookmakers["All"]}
            homeTeam={upcoming_game_data.home_team}
            awayTeam={upcoming_game_data.away_team}
            bookmakers={upcoming_game_data.bookmakers}
            startTime={upcoming_game_data.commence_time}
            sport={upcoming_game_data.sport_key}
            curScore={upcoming_score_data.scores}
            teamImages={images}
            checkedBest={false}
        /></QueryClientProvider>);
        const player_props_button = screen.getByText('PlayerProps');
        fireEvent.click(player_props_button);
        const playerPropDisplayLoading = screen.queryByTestId('loader');
        expect(playerPropDisplayLoading).toBeInTheDocument();
    });

  
});

describe('Game Overview component, Live game', () => {

    const htmlToRender = <GameOverview 
        key={live_game_data.id}
        game_id={live_game_data.id}
        bookie_list={state_bookmakers["All"]}
        homeTeam={live_game_data.home_team}
        awayTeam={live_game_data.away_team}
        bookmakers={live_game_data.bookmakers}
        startTime={live_game_data.commence_time}
        sport={live_game_data.sport_key}
        curScore={live_score_data.scores}
        teamImages={images}
        checkedBest={false}
    />


    test('should have LIVE displayed', () => {
        render(htmlToRender);
        const startTime = screen.getByText('LIVE');
        expect(startTime).not.toBe(null);
    });

    test('should have clickable team props button that sets team props to active', () => {
        render(htmlToRender);
        const team_props_button = screen.getByText('TeamProps');
        fireEvent.click(team_props_button);
        const propDrop = screen.queryByText('Prop');
        expect(propDrop).not.toBe(null);
    }); 
});

