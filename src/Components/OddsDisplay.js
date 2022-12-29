import React from 'react'


const OddsDisplay = (bookmaker) => {
    return (

        <div>
            <p><a href={bookmaker.bookmakerLink} target="_blank">{bookmaker.bookmakerTitle}</a>: {bookmaker.odds===0?<t>Even</t>:<t>{bookmaker.favoredTeam} {bookmaker.odds}</t>}</p>
        </div>
        
    )
    
}

export default OddsDisplay