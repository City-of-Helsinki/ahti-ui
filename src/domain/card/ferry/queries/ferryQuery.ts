import { gql } from 'apollo-boost';
import { GlobalFragments } from '../../../api/fragments';

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
  ${GlobalFragments.commonFeatures}
`;

export default FERRY_QUERY;
