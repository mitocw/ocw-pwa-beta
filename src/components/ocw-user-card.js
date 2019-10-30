import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { isAuthenticated } from '../scripts/auth';
import CoursewareCard from './courseware-card';
import OcwUserCardLoading from './ocw-user-card-loading';

// The following logic was initially in use-ocw-user-query and was moved here in order for the
// tests to pass.

export const COURSEWARE_QUERY = gql`
  query($coursewareUid: ItemId) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        id: {eq: $coursewareUid},
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

const OcwUserCard = ({ id }) => {
  const favoriteCourses = isAuthenticated()
    ? JSON.parse(window.localStorage.getItem('favoriteCourses') || '[]')
    : [];
  const { data, loading } = useQuery(COURSEWARE_QUERY, {
    variables: {
      coursewareUid: id,
    },
    skip: id === '',
  });

  if (data && !loading) {
    return (
      <CoursewareCard
        courseware={data.allCoursewares[0]}
        cardType="condensed"
        favoriteCourses={favoriteCourses}
      />
    );
  }

  return <OcwUserCardLoading />;
};

export default OcwUserCard;
