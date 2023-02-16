import React from 'react'

const TotalsDisplay = (bookmaker) => {
    return (

        <div>
            <div className="current-odds-block"><a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}</a>: {bookmaker.overLabel} {bookmaker.overLine} ({bookmaker.overOdds})<br></br>
                                                                                                                                                            {bookmaker.underLabel} {bookmaker.underLine} ({bookmaker.underOdds})</div>
        </div>
        
    )
    
}

export default TotalsDisplay