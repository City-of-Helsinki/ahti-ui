import { gql } from 'apollo-boost';
import commonFeatures from '../fragments/commonFeatures';

const HARBOR_QUERY = gql`
  query harbor($ahtiId: String!) {
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
  ${commonFeatures}
`;

export default HARBOR_QUERY;
