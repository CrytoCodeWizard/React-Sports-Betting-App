import React from 'react';
import {team_codes, bookmaker_names} from '../Resources.js';
import {
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Typography,
    Card
  } from "@material-tailwind/react";

const PropDisplay = (bookmaker) => {
    let testing = true;

    if(!testing){
        return (
            <div>
                {bookmaker.firstEntry || bookmaker.endOfBucket ? <hr className="bookmaker-child-end-of-block"></hr> :<hr className="bookmaker-child-sep"></hr>}
                <div>
                    
                    <div className="bookmaker-child-name">
                        <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker_names[bookmaker.bookmaker]}</a>
                    </div>
                    <div className="bookmaker-child-content">
                        {bookmaker.endOfBucket && bookmaker.sorter === bookmaker.descriptOfPriceALabel ? <p className="prop-text prop-text-best">{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> :
                        bookmaker.descriptOfPriceALabel ? <p className="prop-text">{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> : <p className="prop-text">N/A</p>}<br/>
                        {bookmaker.endOfBucket && bookmaker.sorter === bookmaker.descriptOfPriceBLabel ? <p className="prop-text prop-text-best">{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> :
                        bookmaker.descriptOfPriceBLabel ? <p className="prop-text">{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> : <p className="prop-text">N/A</p>}
                    </div>
                
                </div>
                
            </div>

        )
    }
    else{
        return (
            <Card>
                <List>
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer" className="">
                        <ListItem className="h-24">
                            <ListItemPrefix className="text-sm w-3/12 justify-center" color="blue-700">
                            {bookmaker_names[bookmaker.bookmaker]}
                            </ListItemPrefix>
                            <div className="mx-auto flex flex-wrap justify-center items-center w-8/12">
                                <Typography variant="small" color="blue-gray" className="font-mono">
                                {bookmaker.descriptOfPriceALabel ? <p>{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> : <p>N/A</p>}
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="font-mono">
                                {bookmaker.descriptOfPriceBLabel ? <p>{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> : <p>N/A</p>}
                                </Typography>
                            </div>
                            
                            <ListItemSuffix className=" w-1/12">
                            {bookmaker.endOfBucket ? "#1" : ""}
                            </ListItemSuffix>
                        </ListItem>
                    </a>
                </List>
            </Card>
        )
    }
    
}

export default PropDisplay