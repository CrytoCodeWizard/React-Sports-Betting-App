import React from 'react';
import {team_codes, bookmaker_names} from '../Resources.js';
import {
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Typography,
  } from "@material-tailwind/react";
  import medalImage from'./../Images/Misc/Medal.png';

const PropDisplay = (bookmaker) => {
    let sortedChoice;
    if(bookmaker.sorter === bookmaker.descriptOfPriceALabel) sortedChoice = bookmaker.descriptOfPriceALabel;
    else if(bookmaker.sorter === bookmaker.descriptOfPriceBLabel) sortedChoice = bookmaker.descriptOfPriceBLabel;
    let fontA;
    let fontB;

    if(bookmaker.bestOption && bookmaker.sorter === bookmaker.descriptOfPriceALabel) fontA = "font-mono font-black tracking-tight";
    else fontA = "font-mono font-thin tracking-tight";

    if(bookmaker.bestOption && bookmaker.sorter === bookmaker.descriptOfPriceBLabel) fontB = "font-mono font-black tracking-tight";
    else fontB = "font-mono font-thin tracking-tight";

    
    return (
        
            
                <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">
                    <div className="lg:hidden">
                        <ListItem className="h-18 border-b-2 border-t-2">
                            <ListItemPrefix className="text-sm w-3/12 h-6 justify-center">
                                
                                    <Typography variant="small" color="blue">
                                        <span>{bookmaker_names[bookmaker.bookmaker]}</span>
                                    </Typography>
                                
                            </ListItemPrefix>
                            <div className="grid grid-rows-2 gap-2 h-14 w-8/12 border-5">
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontA}>
                                    {bookmaker.descriptOfPriceALabel ? <span>{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</span> : <span>N/A</span>}
                                    </Typography>
                                </div>
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontB}>
                                    {bookmaker.descriptOfPriceBLabel ? <span>{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</span> : <span>N/A</span>}
                                    </Typography>
                                </div>
                            </div>
                            
                            <ListItemSuffix className=" w-1/12">
                            {bookmaker.bestOption && sortedChoice ? <img className="h-8 w-8 object-cover" src={medalImage} alt={"Medal"} /> : ""}
                            </ListItemSuffix>
                        </ListItem>
                    </div>
                    <div className="hidden lg:block">
                        <ListItem className="h-24 border-b-2 border-t-2">
                            <ListItemPrefix className="text-sm w-3/12 h-6 justify-center">
                                <Typography variant="small" color="blue">
                                <span>{bookmaker_names[bookmaker.bookmaker]}</span>
                                </Typography>
                            </ListItemPrefix>
                            <div className="grid grid-rows-2 gap-2 h-14 w-8/12 border-5">
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontA}>
                                    {bookmaker.descriptOfPriceALabel ? <span>{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</span> : <span>N/A</span>}
                                    </Typography>
                                </div>
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontB}>
                                    {bookmaker.descriptOfPriceBLabel ? <span>{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</span> : <span>N/A</span>}
                                    </Typography>
                                </div>
                            </div>
                            
                            <ListItemSuffix className=" w-1/12">
                            {bookmaker.bestOption && sortedChoice ? <img className="h-8 w-8 object-cover" src={medalImage} alt={"Medal"} /> : ""}
                            </ListItemSuffix>
                        </ListItem>
                    </div>
                </a>
        
    )
    
    
}

export default PropDisplay