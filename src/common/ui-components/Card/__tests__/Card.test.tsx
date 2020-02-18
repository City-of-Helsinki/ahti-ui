import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Card from '../Card';
import HarborContent from '../harbor/HarborContent';
import IslandContent from '../island/IslandContent';
import FerryContent from '../ferry/FerryContent';
import harborData from '../../../../domain/api/client/staticData/harbors.json';
import ferryData from '../../../../domain/api/client/staticData/ferries.json';
import island from './mockIsland.json';

const contentTypes = [HarborContent, IslandContent, FerryContent];

const onlyContains = (
  wrapper: ShallowWrapper,
  contentTypeToFind: React.FC<any>
) => {
  contentTypes.forEach(contentType => {
    if (contentType === contentTypeToFind) {
      expect(wrapper.find(contentType)).toHaveLength(1);
    } else {
      expect(wrapper.find(contentType)).toHaveLength(0);
    }
  });
};

describe('Card', () => {
  const harbor = harborData[0];
  const ferry = ferryData[0];

  it('data determines content', () => {
    const testParamsList = [
      { data: harbor, contentType: HarborContent },
      { data: island, contentType: IslandContent },
      { data: ferry, contentType: FerryContent },
    ];

    testParamsList.forEach(testParams => {
      onlyContains(
        shallow(<Card feature={testParams.data} />),
        testParams.contentType
      );
    });
  });
});
