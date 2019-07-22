import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COURSE_FEATURES = gql`
  query($courseFeatureRegex: String!) {
    allCourseFeatures(
      first: 100,
      filter: {
        ocwFeature: {matches: {pattern: $courseFeatureRegex}}
      }
    ) {
      id
    }
  }
`;

const useCourseFeatureQuery = (courseFeature) => {
  const courseFeatureRegex = courseFeature === 'Any' ? '$^' : `^${courseFeature}$`;
  return useQuery(GET_COURSE_FEATURES, {
    variables: {
      courseFeatureRegex,
    },
  });
};

export default useCourseFeatureQuery;
