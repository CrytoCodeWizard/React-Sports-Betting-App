import React from 'react'

const TotalsDisplay = (bookmaker) => {
    return (

        <div>
            <div className="current-odds-block"><a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}</a>: <p className="odds-list-text">{bookmaker.over}<br></br>{bookmaker.under}</p></div>
        </div>
        
    )
    
}

export default TotalsDisplay