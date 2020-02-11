import { gql } from 'apollo-boost';
import commonFeatures from '../fragments/commonFeatures';

const FERRY_QUERY = gql`
  query FERRY($ahtiId: String!) {
    ferry(ahtiId: $ahtiId) @client {
      ...CommonFeatures
      duration
      pricing {
        adult
        child
      }
      portAddress {
        streetAddress
        municipality
      }
      bookingUrl
    }
  }
  ${commonFeatures}
`;

export default FERRY_QUERY;
