import React from 'react'

const H2HDisplay = (bookmaker) => {
    return (
        <div>
            <div className="bookmaker-container">
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker.bookmakerTitle}:</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.favoredTeamName} {bookmaker.favoredTeamOdds}<br />
                    {bookmaker.underdogTeamName} {bookmaker.underdogTeamOdds}
                </div>
            </div>
            <hr/>
        </div>
        
    )
    
}

export default H2HDisplay