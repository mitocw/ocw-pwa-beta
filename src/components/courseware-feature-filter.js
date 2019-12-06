import React from 'react';
import { Select } from '@rmwc/select';
import { FaCircleNotch } from 'react-icons/fa';
import Store from '../store/store';
import useFeatureQuery from '../hooks/use-feature-query';
import './courseware-filters.scss';

const CoursewareFeatureFilter = () => {
  const {
    courseFeature,
    changeCourseFeature,
  } = Store.useContainer();
  const { data, loading } = useFeatureQuery();
  if (loading) {
    return (
      <div className="filter">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }
  const { allCourseFeatures } = data;
  const allFeatures = allCourseFeatures.map(item => item.ocwFeature);
  const features = allFeatures.filter((item, index) => allFeatures.indexOf(item) === index);
  const featureOptions = [
    { label: 'Any', value: 'Any' },
    ...features.map(feature => ({ label: feature, value: feature })),
  ];

  return (
    <div className="filter">
      <Select
        enhanced
        outlined
        label="Feature"
        value={courseFeature}
        onEnhancedChange={changeCourseFeature}
        className="filter"
        options={featureOptions}
      />
    </div>
  );
};

export default CoursewareFeatureFilter;
