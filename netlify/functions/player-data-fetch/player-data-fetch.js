// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const fetch = require('node-fetch');

const handler = async function (event) {
  const sport = event.queryStringParameters?.sport;
  const game_id = event.queryStringParameters?.game_id;
  const specMarkets = event.queryStringParameters?.specMarkets;
  const url = 'https://api.the-odds-api.com/v4/sports/' + sport + '/events/' + game_id + '/odds?regions=us&oddsFormat=american&markets=' + specMarkets + '&dateFormat=iso&apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS;
  
    try {
      const response = await fetch(url, {
      method: 'GET'
      });
      if (!response.ok) {
        return {
          statusCode: response.status,
          body: JSON.stringify({ error: response.statusText }),
        };
      }
      const data = await response.json(); // Parse the JSON data
      return {
        statusCode: response.status,
        body: JSON.stringify(data), // Return the JSON data as the body
      };
  } catch(error){
    console.error('Fetch Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

module.exports = { handler }
