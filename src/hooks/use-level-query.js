import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_LEVELS = gql`
  {
    allCoursewares(first: 100) {
      courseLevel
    }
  }
`;

const useLevelQuery = () => useQuery(ALL_LEVELS);

export default useLevelQuery;
