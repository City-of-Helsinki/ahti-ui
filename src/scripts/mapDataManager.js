const mapData = require('../mapData.json');

const checkForRequiredFields = () => {
  //required features object
  const correctFeatures = {
    type: true,
    properties: {
      fi: {
        name: true,
        header: true,
        description: true,
      },
      en: {
        name: true,
        header: true,
        description: true,
      },
      tag: true,
    },
    geometry: {
      type: true,
      coordinates: true,
    },
  };
  // check single feature for required fields recursively
  const recursivelyCheckForKeys = (feature, requiredFeatures) => {
    let missingFields = [];
    for (let key of Object.keys(requiredFeatures)) {
      if (feature[key]) {
        if (typeof requiredFeatures[key] === 'object') {
          missingFields = missingFields.concat(
            recursivelyCheckForKeys(feature[key], requiredFeatures[key])
          );
        }
      } else {
        missingFields.push(key);
      }
    }
    return missingFields;
  };
  // log info about individual missing fields
  const logMissingFields = (feature, missingFields) => {
    console.log(`Missing following fields: ${missingFields}`);
    if (
      feature.properties &&
      feature.properties.fi &&
      feature.properties.fi.name
    ) {
      console.log(`For feature named: "${feature.properties.fi.name}"`);
    } else if (
      feature.properties &&
      feature.properties.en &&
      feature.properties.en.name
    ) {
      console.log(`For feature named: ${feature.properties.en.name}`);
    } else {
      console.log('For the following feature:\n');
      console.log(feature);
    }
    console.log('\n');
  };

  let totalMissingFields = [];

  // iterate features
  for (let feature of mapData.features) {
    const missingFields = recursivelyCheckForKeys(feature, correctFeatures);
    if (missingFields) {
      logMissingFields(feature, missingFields);
      totalMissingFields = totalMissingFields.concat(missingFields);
    }
  }

  // log amount of missing fields
  let missingFieldsByAmount = {};
  [...new Set(totalMissingFields)].forEach(
    field => (missingFieldsByAmount[field] = 0)
  );
  totalMissingFields.forEach(field => (missingFieldsByAmount[field] += 1));
  console.log('---------------------\n');
  console.log('Total missing fields:');
  console.log(missingFieldsByAmount);
};

checkForRequiredFields();
