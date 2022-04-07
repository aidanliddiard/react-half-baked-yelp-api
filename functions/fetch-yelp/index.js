const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;

  try {
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_KEY}`,
        },
      }
    );
    const data = await resp.json();
    const json = JSON.stringify(data.businesses);

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
  // const { zip } = event.queryStringParameters;
  // console.log({ zip });
};

module.exports = { handler };
