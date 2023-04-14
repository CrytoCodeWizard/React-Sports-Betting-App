import React from 'react';

const PropDisplay = (bookmaker) => {

    return (
        <div>
            <div className="bookmaker-container">
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}:</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})<br />
                    {bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})
                </div>
            </div>
            <hr/>
        </div>

    )
    
}

export default PropDisplay