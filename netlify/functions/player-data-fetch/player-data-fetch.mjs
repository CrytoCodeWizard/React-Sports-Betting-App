// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const { wrap } = require("@netlify/integrations");
const { withSentry } = require("@netlify/sentry");

const fetch = require('node-fetch');
const redisConfig = require('../../redisClient');
const withIntegrations = wrap(withSentry);

const config = {
  sentry: {
    sampleRate: 0.3
  },
};


const handler = withIntegrations(
  async function (event) {
    const sport = event.queryStringParameters?.sport;
    const game_id = event.queryStringParameters?.game_id;
    const specMarkets = event.queryStringParameters?.specMarkets;
    const url = 'https://api.the-odds-api.com/v4/sportts/' + sport + '/events/' + game_id + '/odds?regions=us&oddsFormat=american&markets=' + specMarkets + '&dateFormat=iso&apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS;
    
      try {
        const cachedData = await redisConfig.get(sport + ' - ' + game_id);
        if (cachedData) {
          return {
            statusCode: 200,
            body: cachedData,
          };
        }

        const response = await fetch(url, {
        method: 'GET'
        });
        if (!response.ok) {
          throw Error("Error querying for player props, Code: " + response.status + ", Body: " + response.statusText);
        }
        const data = await response.json();
        await redisConfig.set(sport + ' - ' + game_id, JSON.stringify(data), 'EX', 300);
        return {
          statusCode: response.status,
          body: JSON.stringify(data),
        };
    } catch(error){
      throw Error("Error querying for player props, " + error);
    }
  }, config);

export { handler };
