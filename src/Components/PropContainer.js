import React from 'react';
import {bookmaker_links} from '../Resources.js';
import { propSortByLabel } from './GameOverview.js';
import PropDisplay from './PropDisplay';
import { 
    Card,
    List
  } from "@material-tailwind/react";

const PropContainer = (bookmakerList) => {
    
    let lastPoint = 0.0;
    let lastPrice = 0;
    let propDisp = [];
    let completeList = [];
    
    return (
        <div>
        {Array.from(bookmakerList.bookmakerList, ([bookmaker, line]) => ({ bookmaker, line })).sort(propSortByLabel(bookmakerList.sorter)).map((bookmaker, index) => { 
            let bestOption = false;
            let endOfBucket = false;
            let hasOddsforGivenSort = (bookmakerList.sorter === bookmaker.line.labelA || bookmakerList.sorter === bookmaker.line.labelB);
            if(bookmaker.line.pointA !== lastPoint || index === 0){
                if(index !== 0){
                    endOfBucket = true;
                    completeList = propDisp;
                    propDisp = [];
                }
                if(hasOddsforGivenSort) bestOption = true;
                lastPoint = bookmaker.line.pointA;
                if(bookmakerList.sorter === bookmaker.line.labelA) lastPrice = bookmaker.line.priceA;
                else if(bookmakerList.sorter === bookmaker.line.labelB) lastPrice = bookmaker.line.priceB;
            }
            else{
                if(bookmakerList.sorter === bookmaker.line.labelA){
                    if(bookmaker.line.priceA === lastPrice) bestOption = true;
                }
                else if(bookmakerList.sorter === bookmaker.line.labelB){
                    if(bookmaker.line.priceB === lastPrice) bestOption = true;
                }
            }

            if((bookmakerList.checkedBest && bestOption) || !bookmakerList.checkedBest)propDisp.push(<PropDisplay
                key={bookmaker.bookmaker}
                bookmaker={bookmaker.bookmaker}
                bookmakerLink={bookmaker_links[bookmaker.bookmaker]}
                descriptOfPriceALabel={bookmaker.line.labelA}
                aPrice={bookmaker.line.priceA > 0 ? '+' + bookmaker.line.priceA : bookmaker.line.priceA}
                aPoint={bookmakerList.prop === "spreads" && bookmaker.line.pointA > 0 ? '+' + bookmaker.line.pointA : bookmaker.line.pointA}
                descriptOfPriceBLabel={bookmaker.line.labelB}
                bPrice={bookmaker.line.priceB > 0 ? '+' + bookmaker.line.priceB : bookmaker.line.priceB}
                bPoint={bookmakerList.prop === "spreads" && bookmaker.line.pointB > 0 ? '+' + bookmaker.line.pointB : bookmaker.line.pointB}
                bestOption={bestOption}
                sorter={bookmakerList.sorter}
            />);

            if(endOfBucket && index === bookmakerList.lastIndex && completeList.length > 0 && propDisp.length > 0){
                return (<div key={bookmakerList.type + bookmakerList.game_id + index}><Card className="mt-4 shadow-xl"><List>{completeList}</List></Card><Card className="mt-4 shadow-xl"><List>{propDisp}</List></Card></div>);
            }

            
            if(endOfBucket && completeList.length > 0){
                return (<div key={bookmakerList.type + bookmakerList.game_id + index}><Card key={"player-prop-container-" + bookmakerList.game_id} className="mt-4 shadow-xl"><List>{completeList}</List></Card></div>);
            }

            if(index === bookmakerList.lastIndex && propDisp.length > 0){
                
                return (<div key={bookmakerList.type + bookmakerList.game_id + index}><Card className="mt-4 shadow-xl"><List>{propDisp}</List></Card></div>);
            }
            
            
            else return (<div key={bookmakerList.type + bookmakerList.game_id + index}/>);

        })}
        </div>
        
    )
    
    
}

export default PropContainer