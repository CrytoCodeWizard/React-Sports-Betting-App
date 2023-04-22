import React from 'react';

const PropDisplay = (bookmaker) => {

    return (
        <div>
            <div className="bookmaker-container">
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}:</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.descriptOfPriceALabel ? <p className="prop-text">{bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> : <p className="prop-text">N/A</p>}<br/>
                    {bookmaker.descriptOfPriceBLabel ? <p className="prop-text">{bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> : <p className="prop-text">N/A</p>}
                </div>
            </div>
            <hr/>
        </div>

    )
    
}

export default PropDisplay