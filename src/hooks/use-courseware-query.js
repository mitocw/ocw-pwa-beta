import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COURSEWARES = gql`
  query($courseLevelRegex: String!, $courseCollectionIds: [ItemId]) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        courseLevel: {matches: {pattern: $courseLevelRegex}}
        courseCollections: {anyIn: $courseCollectionIds}
      }
    ) {
      id
      title
      courseLevel
      trackingTitle
      imageSrc
      description
      departmentNumber
      masterCourseNumber
    }
  }
`;

const GET_COURSEWARES_ALL_TOPICS = gql`
  query($courseLevelRegex: String!) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        courseLevel: {matches: {pattern: $courseLevelRegex}}
      }
    ) {
      id
      title
      courseLevel
      trackingTitle
      imageSrc
      description
      departmentNumber
      masterCourseNumber
    }
  }
`;

const useCoursewareQuery = (courseTopic, courseLevel, courseCollectionIds) => {
  const COURSEWARE_QUERY = courseTopic === 'All' ? GET_COURSEWARES_ALL_TOPICS : GET_COURSEWARES;
  const courseLevelRegex = courseLevel === 'All' ? '.*' : `^${courseLevel}$`;
  return useQuery(COURSEWARE_QUERY, {
    variables: {
      courseLevelRegex,
      courseCollectionIds,
    },
  });
};

export default useCoursewareQuery;
