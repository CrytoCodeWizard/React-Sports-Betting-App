import React from 'react'

const SpreadDisplay = (bookmaker) => {
    return (
        <div>
            <div className="bookmaker-container">
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}:</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.favoredTeamName} {bookmaker.favoredTeamLine} ({bookmaker.favoredTeamOdds})<br />
                    {bookmaker.underdogTeamName} {bookmaker.underdogTeamLine} ({bookmaker.underdogTeamOdds})
                </div>
            </div>
            <hr/>
        </div>
        
    )
    
}

export default SpreadDisplay