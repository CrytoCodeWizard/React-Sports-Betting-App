# Shop the Line

React App (Javascript, HTML, CSS) that allows the user to view various upcoming/live professional sports games and the live betting odds from established bookmakers (DraftKings, Fanduel, William Hill, etc) in the US, filtered by states they operate in. The purpose of the app is for the user to monitor the live odds of a match they're interested in to possibly place a wager with a bookmaker that's offering favorable odds (as long as that bookmaker is legally operating in their state/country). Currently supports NFL, NBA, NHL & MLB games.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

1. Go to [The Odds API](https://the-odds-api.com/), create a free acount and subscribe to the unpaid version of the API.
   - Once subscribed, your API Key can be found on your account page
2. You’ll need to have Node 14.0.0 or later version on your local development machine. [Node.js](https://nodejs.org/en/download/)

## Installation Instructions

1. Download the project/save zip and unzip
2. In the text editor of your choice, open `sports-odds-app/src/App.js` and go to line 64 & 65. replace `process.env.REACT_APP_API_KEY_SPORT_ODDS` with your API key from step 1 of the prerequisites
3. open `sports-odds-app/src/DataContext.js` and go to line 24. replace `process.env.REACT_APP_API_KEY_SPORT_ODDS` with your API key from step 1 of the prerequisites
4. Navigate to the project home on the command line using `cd` and run `npm install`, followed by `npm start`, the application should open at `http://localhost:3000/`.

## Images

![image](https://github.com/clarket33/shop-the-line/assets/43187188/c6ab47d7-f405-4d5c-8300-5220c0c7213c)

## Credits

This project utilizes [The Odds API](https://the-odds-api.com/)

State Icons & Medal Icon by [Icons8](https://icons8.com)



