import React from 'react'

const SpreadDisplay = (bookmaker) => {
    return (

        <div>
            <div className="current-odds-block"><a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}</a>: {bookmaker.favoredTeamName} {bookmaker.favoredTeamLine} ({bookmaker.favoredTeamOdds})<br></br>
                                                                                                                                                            {bookmaker.underdogTeamName} {bookmaker.underdogTeamLine} ({bookmaker.underdogTeamOdds})</div>
        </div>
        
    )
    
}

export default SpreadDisplay