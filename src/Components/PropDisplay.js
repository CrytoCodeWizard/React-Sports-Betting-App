import React from 'react';
import {Text} from 'react-native';

const PropDisplay = (bookmaker) => {

    return (
        <div>
            {bookmaker.firstEntry ? <hr className="bookmaker-child-first"></hr> : bookmaker.endOfBucket ? <hr className="bookmaker-child-end-of-block"></hr> :<hr className="bookmaker-child-sep"></hr>}
            <div className="bookmaker-container">
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer"><Text numberOfLines={1}>{bookmaker.bookmakerTitle}</Text>:</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.endOfBucket && bookmaker.sorter === bookmaker.descriptOfPriceALabel ? <p className="prop-text prop-text-best">{bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> :
                    bookmaker.descriptOfPriceALabel ? <p className="prop-text">{bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> : <p className="prop-text">N/A</p>}<br/>
                    {bookmaker.endOfBucket && bookmaker.sorter === bookmaker.descriptOfPriceBLabel ? <p className="prop-text prop-text-best">{bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> :
                    bookmaker.descriptOfPriceBLabel ? <p className="prop-text">{bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> : <p className="prop-text">N/A</p>}
                </div>
            </div>
            
        </div>

    )
    
}

export default PropDisplay