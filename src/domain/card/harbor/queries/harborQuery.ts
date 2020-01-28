import { gql } from 'apollo-boost';
import { GlobalFragments } from '../../../api/fragments';

const HARBOR_QUERY = gql`
  query HARBOR($ahtiId: String!) {
    harbor(ahtiId: $ahtiId) @client {
      ...CommonFeatures
      pricing {
        hour
        day
        overnight
        week
      }
      depth {
        minDepth
        maxDepth
      }
      mooringTypes
      mooringInformation
      bookingUrl
    }
  }
  ${GlobalFragments.commonFeatures}
`;

export default HARBOR_QUERY;
