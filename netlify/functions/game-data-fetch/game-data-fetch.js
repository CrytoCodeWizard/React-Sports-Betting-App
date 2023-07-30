// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require('node-fetch');

const handler = async function (event) {
  const sport = event.queryStringParameters?.sport;
  const urls = ['https://api.the-odds-api.com/v4/sports/' + sport + '/odds?regions=us&oddsFormat=american&markets=spreads,h2h,totals&dateFormat=iso&apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS,
        'https://api.the-odds-api.com/v4/sports/' + sport + '/scores/?apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS];
  try {
    const [oddsResp, scoresResp] = await Promise.all(urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        return {
          statusCode: response.status,
          body: { error: response.statusText },
        };
      }
      const data = await response.json(); // Parse the JSON data
      return {
        statusCode: response.status,
        body: data, // Return the JSON data as the body
      };
    }));
    if(oddsResp.statusCode !== 200 || scoresResp.statusCode !== 200){
      if(oddsResp.statusCode !== 200){
        return {
          statusCode: oddsResp.statusCode,
          body: JSON.stringify(oddsResp.body),
        };
      }
      else{
        return {
          statusCode: scoresResp.statusCode,
          body: JSON.stringify(scoresResp.body),
        };
      }
    }
    const oddsResponse = oddsResp.body;
    const scoresResponse = scoresResp.body;
    const updatedData = scoresResponse.map((x) => Object.assign(x, oddsResponse.find((y) => y.id === x.id)));
    return {
      statusCode: 200,
      body: JSON.stringify(updatedData),
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
