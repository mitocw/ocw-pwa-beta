import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CoursewareCard from './courseware-card';
import OcwCourseCardLoading from './ocw-course-card-loading';

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

const OcwCourseCard = ({ id, favoriteCoursewares }) => {
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
        cardType="featured"
        favoriteCoursewares={favoriteCoursewares}
      />
    );
  }

  return <OcwCourseCardLoading />;
};

export default OcwCourseCard;
