require('dotenv').config({ path: '.env' });

module.exports = {
  client: {
    service: {
      name: 'ahti',
      url: process.env.REACT_APP_AHTI_GRAPHQL_API_URI,
    },
  },
};
