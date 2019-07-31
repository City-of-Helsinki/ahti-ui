const fs = require('fs');
const request = require('request-promise-native');

const getIslandIds = responseData => responseData.results.map(item => item.id);

const parseIslandName = name => (name ? name.split(',')[0] : undefined);

const getIslandAddress = islandData => {
  const { street_address_fi, address_zip, address_city_fi } = islandData;
  const address = [];

  if (street_address_fi) {
    address.push(`${street_address_fi},`);
  }

  if (address_zip) {
    address.push(address_zip);
  }

  if (address_city_fi) {
    address.push(address_city_fi);
  }

  return address.length > 0 ? address.join(' ') : undefined;
};

const getLocalisedIslandProps = (islandData, locale) => ({
  name: parseIslandName(islandData[`name_${locale}`]),
  header: islandData[`short_desc_${locale}`],
  description: islandData[`desc_${locale}`],
});

const parseIslandData = responseData =>
  responseData.map(item => ({
    type: 'Feature',
    properties: {
      fi: getLocalisedIslandProps(item, 'fi'),
      en: getLocalisedIslandProps(item, 'en'),
      address: getIslandAddress(item),
      website: item.www_fi,
      type: 'island',
      tag: [parseIslandName(item.name_fi)],
      image: item.picture_url,
    },
    geometry: {
      type: 'Point',
      coordinates: [item.latitude, item.longitude],
    },
  }));

request({
  uri: 'https://api.hel.fi/servicemap/v2/unit/?service=735&page_size=100',
  json: true,
})
  .then(getIslandIds)
  .then(islandIds => {
    const islandPromises = islandIds.map(id =>
      request({
        uri: `http://www.hel.fi/palvelukarttaws/rest/v4/unit/${id}`,
        json: true,
      })
    );
    return Promise.all(islandPromises);
  })
  .then(parseIslandData)
  .then(islandData => {
    fs.writeFile(
      'src/islandData.json',
      JSON.stringify(islandData, null, 4),
      'utf8',
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('done');
        }
      }
    );
  })
  .catch(console.error);
