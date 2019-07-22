import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COURSEWARES = gql`
  query($courseLevelRegex: String!, $courseCollectionIds: [ItemId], $courseFeatureIds: [ItemId]) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        courseLevel: {matches: {pattern: $courseLevelRegex}},
        courseCollections: {anyIn: $courseCollectionIds},
        courseFeatures: {anyIn: $courseFeatureIds}
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
  query($courseLevelRegex: String!, $courseFeatureIds: [ItemId]) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        courseLevel: {matches: {pattern: $courseLevelRegex}},
        courseFeatures: {anyIn: $courseFeatureIds}
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

const GET_COURSEWARES_ANY_FEATURE = gql`
  query($courseLevelRegex: String!, $courseCollectionIds: [ItemId]) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        courseLevel: {matches: {pattern: $courseLevelRegex}},
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

const GET_COURSEWARES_ALL_TOPICS_ANY_FEATURE = gql`
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

const useCoursewareQuery = (
  courseTopic, courseFeature, courseLevel, courseCollectionIds, courseFeatureIds,
) => {
  // TODO: Simplify code by using regular expressions for course feature and course topic
  // once pagination is implemented. The max amount of records returned by DatoCMS is 100.
  // There are more than 100 records for course feature and course topic.
  let COURSEWARE_QUERY;
  if (courseTopic === 'All' && courseFeature !== 'Any') {
    COURSEWARE_QUERY = GET_COURSEWARES_ALL_TOPICS;
  } else if (courseFeature === 'Any' && courseTopic !== 'All') {
    COURSEWARE_QUERY = GET_COURSEWARES_ANY_FEATURE;
  } else if (courseTopic === 'All' && courseFeature === 'Any') {
    COURSEWARE_QUERY = GET_COURSEWARES_ALL_TOPICS_ANY_FEATURE;
  } else {
    COURSEWARE_QUERY = GET_COURSEWARES;
  }
  // End TODO
  const courseLevelRegex = courseLevel === 'All' ? '.*' : `^${courseLevel}$`;
  return useQuery(COURSEWARE_QUERY, {
    variables: {
      courseLevelRegex,
      courseCollectionIds,
      courseFeatureIds,
    },
  });
};

export default useCoursewareQuery;
