import React, { useState } from 'react'


const OddsDisplay = (bookmaker, index) => {
    return (

        <div>
            {bookmaker.odds===0?<p>{bookmaker.bookmakerTitle}: Even</p>:<p>{bookmaker.bookmakerTitle}: {bookmaker.favoredTeam} {bookmaker.odds}</p>}
        </div>
    )
    
}

export default OddsDisplay