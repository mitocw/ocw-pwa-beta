import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_TOPICS = gql`
  {
    allCourseCollections(first: 100) {
      ocwFeature
    }
  }
`;

const useTopicQuery = () => useQuery(ALL_TOPICS);

export default useTopicQuery;
