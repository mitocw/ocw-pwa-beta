/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import CoursewareCard from './courseware-card';
import OcwUserCardLoading from './ocw-user-card-loading';
import useOcwUserQuery from '../hooks/use-ocw-user-query';

const OcwUserCard = (user) => {
  const { data: { allCoursewares }, loading: coursewareLoading } = useOcwUserQuery(user);

  return coursewareLoading
    ? <OcwUserCardLoading />
    : <CoursewareCard courseware={allCoursewares[0]} cardType="condensed" />;
};

export default OcwUserCard;
