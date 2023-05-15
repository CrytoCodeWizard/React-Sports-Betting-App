# Live Sports Odds App

React App (Javascript, HTML, CSS) that allows the user to view various upcoming/live professional sports games and the live betting odds from established bookmakers (DraftKings, Fanduel, William Hill, etc) in the US, filtered by states they operate in. The purpose of the app is for the user to monitor the live odds of a match they're interested in to possibly place a wager with a bookmaker that's offering favorable odds (as long as that bookmaker is legally operating in their state/country). Currently supports NFL & NBA games.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

1. Go to [Live Sports API](https://rapidapi.com/theoddsapi/api/live-sports-odds), create a free acount and subscribe to the unpaid version of the API.
   - Once subscribed, your API Key can be found under X-RapidAPI-Key
2. You’ll need to have Node 14.0.0 or later version on your local development machine. [Node.js](https://nodejs.org/en/download/)

## Installation Instructions

1. Download the project/save zip and unzip
2. In the text editor of your choice, open `sports-odds-app/src/App.js` and go to line 19. replace `process.env.REACT_APP_API_KEY_SPORT_ODDS` with your API key from step 1 of the prerequisites
3. Navigate to the project home on the command line using `cd` and run `npm install`, followed by `npm start`, the application should open at `http://localhost:3000/`.

## Screenshots

![oddsapp1](https://user-images.githubusercontent.com/43187188/221454419-3e0ca6e0-c217-45bd-83c8-1a917c78db2d.png)


## Credits

This project utilizes [Live Sports API](https://rapidapi.com/theoddsapi/api/live-sports-odds) by [The Odds API](https://rapidapi.com/user/theoddsapi)
