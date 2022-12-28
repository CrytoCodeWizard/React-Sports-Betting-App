import React from 'react'


const OddsDisplay = (bookmaker) => {
    return (

        <div>
            <p><a href={bookmaker.bookmakerLink} target="_blank">{bookmaker.bookmakerTitle}</a>: {bookmaker.odds===0?<text>Even</text>:<text>{bookmaker.favoredTeam} {bookmaker.odds}</text>}</p>
        </div>
        
    )
    
}

export default OddsDisplay