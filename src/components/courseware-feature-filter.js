import React from 'react';
import { Select } from '@rmwc/select';
import { FaCircleNotch } from 'react-icons/fa';
import Store from '../store/store';
import useFeatureQuery from '../hooks/use-feature-query';
import './courseware-filters.scss';
import shortid from '../scripts/shortid';

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
  const featureOptions = features.map(feature => (
    <option value={feature} key={shortid()}>{feature}</option>
  ));
  return (
    <div className="filter">
      <Select
        enhanced
        outlined
        label="Feature"
        value={courseFeature}
        onEnhancedChange={changeCourseFeature}
        className="filter"
      >
        <option value="Any" key={shortid()}>Any</option>
        {featureOptions}
      </Select>
    </div>
  );
};

export default CoursewareFeatureFilter;
