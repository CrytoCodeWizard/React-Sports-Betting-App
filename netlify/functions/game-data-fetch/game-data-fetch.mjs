// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

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
    const urls = ['https://api.the-odds-api.com/v4/sports/' + sport + '/odds?regions=us&oddsFormat=american&markets=spreads,h2h,totals&dateFormat=iso&apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS,
          'https://api.the-odds-api.com/v4/sports/' + sport + '/scores/?apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS];
    try {
      const cachedData = await redisConfig.get(sport);
      if (cachedData) {
        return {
          statusCode: 200,
          body: cachedData,
        };
      }

      const [oddsResp, scoresResp] = await Promise.all(urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          return {
            statusCode: response.status,
            body: { error: response.statusText },
          };
        }
        const data = await response.json(); 
        return {
          statusCode: response.status,
          body: data, 
        };
      }));
      if(oddsResp.statusCode !== 200 || scoresResp.statusCode !== 200){
        if(oddsResp.statusCode !== 200){
          throw Error("Error querying for games, Code: " + oddsResp.statusCode + ", Body: " + JSON.stringify(oddsResp.body));
        }
        else{
          throw Error("Error querying for scores, Code: " + scoresResp.statusCode + ", Body: " + JSON.stringify(scoresResp.body));
        }
      }
      const oddsResponse = oddsResp.body;
      const scoresResponse = scoresResp.body;
      const updatedData = scoresResponse.map((x) => Object.assign(x, oddsResponse.find((y) => y.id === x.id)));
      await redisConfig.set(sport, JSON.stringify(updatedData), 'EX', 40);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedData),
      };
    } catch(error){
      throw Error("Error querying for games, " + error);
    }
  }, config);

export { handler };
