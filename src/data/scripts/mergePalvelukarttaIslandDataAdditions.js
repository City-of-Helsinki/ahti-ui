const fs = require('fs');
const deepmerge = require('deepmerge');

const islandData = JSON.parse(fs.readFileSync('src/islandData.json'));
const islandDataAdditions = JSON.parse(
  fs.readFileSync('src/islandData-additions.json')
);

const mergedIslandData = islandData.map(island => {
  const addition = islandDataAdditions[island.properties.id];

  if (typeof addition === 'object') {
    const islandWithAddtions = deepmerge(island, addition, {
      arrayMerge: (destArr, sourceArr, opts) => sourceArr,
    });
    return islandWithAddtions;
  }

  return island;
});

fs.writeFile(
  'src/islandData-final.json',
  JSON.stringify(mergedIslandData, null, 4),
  'utf8',
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('done');
    }
  }
);
