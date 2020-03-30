/* eslint-disable no-console, no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */
const dotenv = require('dotenv');
const fetch = require('isomorphic-fetch');
const fs = require('fs');

dotenv.config({ path: '.env.development' });

fetch('https://graphql.datocms.com', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${process.env.GATSBY_DATOCMS_READ_ONLY_ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
}).then(result => result.json())
  .then(result => {
    // Here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFileSync('./src/apollo/fragmentTypes.json', JSON.stringify(result.data));
    console.log('Fragment types successfully extracted');
  })
  .catch((error) => {
    console.log('Error fetching schema', error.message);
  });
