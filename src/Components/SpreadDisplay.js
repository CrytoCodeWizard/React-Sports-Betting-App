import React from 'react'

const SpreadDisplay = (bookmaker) => {
    return (

        <div>
            <div className="current-odds-block"><a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}</a>: <p className="odds-list-text">{bookmaker.favoredTeam}<br></br>{bookmaker.underdog}</p></div>
        </div>
        
    )
    
}

export default SpreadDisplay