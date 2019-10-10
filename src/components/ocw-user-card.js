/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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
  const result = useQuery(COURSEWARE_QUERY, {
    variables: {
      coursewareUid: id,
    },
    skip: id === '',
  });

  if (result.data && !result.loading) {
    return <CoursewareCard courseware={result.data.allCoursewares[0]} cardType="condensed" />;
  }

  return <OcwUserCardLoading />;
};

export default OcwUserCard;
