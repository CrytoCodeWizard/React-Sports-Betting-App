import React from 'react'

const SpreadDisplay = (bookmaker) => {
    return (

        <div>
            <div className="current-odds-block"><a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}</a>: {bookmaker.odds===0?<p className="odds-list-text">Even</p>:<p className="odds-list-text">{bookmaker.favoredTeam} {bookmaker.odds}</p>}</div>
        </div>
        
    )
    
}

export default SpreadDisplay