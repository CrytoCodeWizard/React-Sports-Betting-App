import React from 'react';
import { render, screen } from '@testing-library/react';
import PropDisplay from '../Components/PropDisplay';
import { bookmaker_links, team_codes, bookmaker_names } from "../Resources.js";


const bestOption = {
    bookmaker: "fanduel",
    line: {
        labelA: "New York Jets",
        priceA: -110,
        pointA: -2.5,
        labelB: "Buffalo Bills",
        priceB: -105,
        pointB: 2.5
    },
    prop: "spreads",
    sorter: "Buffalo Bills"
}

const normalOption = {
    bookmaker: "draftkings",
    line: {
        labelA: "Over",
        priceA: 210,
        pointA: 2.5,
        labelB: "Under",
        priceB: -190,
        pointB: 2.5
    },
    prop: "player_pass_tds",
    sorter: "Over"
}


describe('Team Props Component component', () => {

    const htmlToRenderBest = 
                    <PropDisplay
                        key={bestOption.bookmaker}
                        bookmaker={bestOption.bookmaker}
                        bookmakerLink={bookmaker_links[bestOption.bookmaker]}
                        descriptOfPriceALabel={bestOption.line.labelA}
                        aPrice={bestOption.line.priceA > 0 ? '+' + bestOption.line.priceA : bestOption.line.priceA}
                        aPoint={bestOption.prop === "spreads" && bestOption.line.pointA > 0 ? '+' + bestOption.line.pointA : bestOption.line.pointA}
                        descriptOfPriceBLabel={bestOption.line.labelB}
                        bPrice={bestOption.line.priceB > 0 ? '+' + bestOption.line.priceB : bestOption.line.priceB}
                        bPoint={bestOption.prop === "spreads" && bestOption.line.pointB > 0 ? '+' + bestOption.line.pointB : bestOption.line.pointB}
                        bestOption={true}
                        sorter={bestOption.sorter}
                    />
                    

    test('best prop should have the trophy icon showing', () => {
        render(htmlToRenderBest);
        const medalImg = screen.getAllByAltText('Medal');
        expect(medalImg.length).toBe(2);
    });

    test('text for the sportsbook should be present', () => {
        render(htmlToRenderBest);
        const bookmakerTitle = screen.getAllByText(bookmaker_names[bestOption.bookmaker]);
        expect(bookmakerTitle.length).toBe(2);
    });

    test('text for both sides of the line should be present', () => {
       
        let stringToLookForA = team_codes[bestOption.line.labelA] + " " + (bestOption.line.pointA > 0 ? "+":"") + bestOption.line.pointA + " (" + (bestOption.line.priceA > 0 ? "+":"") + bestOption.line.priceA + ")";
        let stringToLookForB = team_codes[bestOption.line.labelB] + " " + (bestOption.line.pointB > 0 ? "+":"") + bestOption.line.pointB + " (" + (bestOption.line.priceB > 0 ? "+":"") + bestOption.line.priceB + ")";
        
        render(htmlToRenderBest);
        const lineA = screen.getAllByText(stringToLookForA);
        const lineB = screen.getAllByText(stringToLookForB);
        expect(lineA.length).toBe(2);
        expect(lineB.length).toBe(2);
    });

    test('text for the best option sorted by text should be bolded', () => {
        let sortedChoice = bestOption.sorter === bestOption.line.labelA ? bestOption.line.labelA : bestOption.line.labelB;
        let stringToLookFor;
        if(sortedChoice === bestOption.line.labelA){
            stringToLookFor = team_codes[sortedChoice] + " " + (bestOption.line.pointA > 0 ? "+":"") + bestOption.line.pointA + "(" + (bestOption.line.priceA > 0 ? "+":"") + bestOption.line.priceA + ")";
        }
        else{
            stringToLookFor = team_codes[sortedChoice] + " " + (bestOption.line.pointB > 0 ? "+":"") + bestOption.line.pointB + " (" + (bestOption.line.priceB > 0 ? "+":"") + bestOption.line.priceB + ")";
        }
        render(htmlToRenderBest);
        const button = screen.getAllByRole('button')[0].getElementsByClassName("block antialiased text-sm leading-normal text-blue-gray-900 font-mono font-black tracking-tight")[0];
        expect(button.textContent).toBe(stringToLookFor);
    });

    test('clicking display should have correct link', () => {
        render(htmlToRenderBest);
        const button = document.getElementsByTagName("a")[0];
        expect(button).toHaveAttribute('href', bookmaker_links[bestOption.bookmaker]);
    });
  
});

describe('Team Props Component component', () => {

    const htmlToRenderNormal = 
                    <PropDisplay
                        key={normalOption.bookmaker}
                        bookmaker={normalOption.bookmaker}
                        bookmakerLink={bookmaker_links[normalOption.bookmaker]}
                        descriptOfPriceALabel={normalOption.line.labelA}
                        aPrice={normalOption.line.priceA > 0 ? '+' + normalOption.line.priceA : normalOption.line.priceA}
                        aPoint={normalOption.prop === "spreads" && normalOption.line.pointA > 0 ? '+' + normalOption.line.pointA : normalOption.line.pointA}
                        descriptOfPriceBLabel={normalOption.line.labelB}
                        bPrice={normalOption.line.priceB > 0 ? '+' + normalOption.line.priceB : normalOption.line.priceB}
                        bPoint={normalOption.prop === "spreads" && normalOption.line.pointB > 0 ? '+' + normalOption.line.pointB : normalOption.line.pointB}
                        bestOption={false}
                        sorter={normalOption.sorter}
                    />
                    

    test('normal prop should have no trophy icon showing', () => {
        render(htmlToRenderNormal);
        const medalImg = screen.queryAllByAltText('Medal');
        expect(medalImg.length).toBe(0);
    });
    
  
});
