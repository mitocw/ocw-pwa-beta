import React from 'react';
import Carousel from 'react-multi-carousel';
import OcwCourseCard from './ocw-course-card';
import shortid from '../scripts/shortid';
import 'react-multi-carousel/lib/styles.css';
import styles from './ocw-featured-courses.module.scss';

const OcwFeaturedCourses = ({
  courses,
  favoriteCoursewares,
}) => {
  const coursesEl = courses.map(course => (
    <OcwCourseCard
      id={course.id}
      favoriteCoursewares={favoriteCoursewares}
      key={shortid()}
    />
  ));

  return (
    <Carousel
      additionalTransfrom={0}
      containerClass={styles.container}
      dotListClass={styles.dotList}
      focusOnSelect={false}
      keyBoardControl
      minimumTouchDrag={80}
      renderDotsOutside
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 768 },
          items: 3,
          slidesToSlide: 3,
        },
        tablet: {
          breakpoint: { max: 768, min: 576 },
          items: 2,
          slidesToSlide: 2,
        },
        mobile: {
          breakpoint: { max: 576, min: 0 },
          items: 1,
          slidesToSlide: 1,
        },
      }}
      showDots
      swipeable
    >
      {coursesEl}
    </Carousel>
  );
};

export default OcwFeaturedCourses;
