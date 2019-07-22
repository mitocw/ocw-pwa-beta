import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_FEATURES = gql`
  {
    allCourseFeatures(first: 100) {
      ocwFeature
    }
  }
`;

const useFeatureQuery = () => useQuery(ALL_FEATURES);

export default useFeatureQuery;
