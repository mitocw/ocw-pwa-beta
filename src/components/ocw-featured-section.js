import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import { Button } from '@rmwc/button';
import OcwSectionHeader from './ocw-section-header';
import OcwFeaturedCourses from './ocw-featured-courses';
import './ocw-featured-section.scss';

const OcwFeaturedSection = ({
  title,
  description,
  courses,
  favoriteCoursewares,
}) => {
  const navigateToDiscovery = useCallback(
    () => {
      navigate('discovery');
    },
  );
  return (
    <div className="featured-section-container">
      <OcwSectionHeader title={title} description={description} />
      <OcwFeaturedCourses courses={courses} favoriteCoursewares={favoriteCoursewares} />
      <div className="featured-section-button-container">
        <Button
          className="featured-section-button"
          raised
          onClick={navigateToDiscovery}
        >
          Explore All OCW
        </Button>
      </div>
    </div>
  );
};

export default OcwFeaturedSection;
