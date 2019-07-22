import React from 'react';
import Select, { Option } from '@material/react-select';
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
  const { data: { allCourseFeatures }, loading } = useFeatureQuery();
  if (loading) {
    return (
      <div className="filter">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }
  const allFeatures = allCourseFeatures.map(item => item.ocwFeature);
  const features = allFeatures.filter((item, index) => allFeatures.indexOf(item) === index);
  const featureOptions = features.map(feature => (
    <Option value={feature} key={shortid()}>{feature}</Option>
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
        <Option value="Any" key={shortid()}>Any</Option>
        {featureOptions}
      </Select>
    </div>
  );
};

export default CoursewareFeatureFilter;
