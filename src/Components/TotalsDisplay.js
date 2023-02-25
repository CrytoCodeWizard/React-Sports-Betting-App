import React from 'react'

const TotalsDisplay = (bookmaker) => {
    return (
        <div>
            <div className="bookmaker-container">
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}:</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.overLabel} {bookmaker.overLine} ({bookmaker.overOdds})<br />
                    {bookmaker.underLabel} {bookmaker.underLine} ({bookmaker.underOdds})
                </div>
            </div>
            <hr/>
        </div>

    )
    
}

export default TotalsDisplay