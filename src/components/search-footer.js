import React from 'react';
import CoursewareSearch from './courseware-search';
import styles from './search-footer.module.scss';

const SearchFooter = () => (
  <div className={styles.container}>
    <CoursewareSearch searchType="footer" />
  </div>
);

export default SearchFooter;
