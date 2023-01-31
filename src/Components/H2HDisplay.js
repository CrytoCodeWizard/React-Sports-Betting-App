import React from 'react'

const H2HDisplay = (bookmaker) => {
    return (

        <div>
            <div className="current-odds-block"><a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}</a>: {bookmaker.favoredTeam}<br></br>{bookmaker.underdog}</div>
        </div>
        
    )
    
}

export default H2HDisplay