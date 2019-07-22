import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COURSE_COLLECTIONS = gql`
  query($courseTopicRegex: String!) {
    allCourseCollections(
      first: 100,
      filter: {
        ocwFeature: {matches: {pattern: $courseTopicRegex}}
      }
    ) {
      id
    }
  }
`;

const useCourseCollectionQuery = (courseTopic) => {
  const courseTopicRegex = courseTopic === 'All' ? '$^' : `^${courseTopic}$`;
  return useQuery(GET_COURSE_COLLECTIONS, {
    variables: {
      courseTopicRegex,
    },
  });
};

export default useCourseCollectionQuery;
