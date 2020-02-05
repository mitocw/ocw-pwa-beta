import React from 'react';
import CoursewareSearch from './courseware-search';
import styles from './search-footer.module.scss';

const SearchFooter = ({ search, setSearch }) => (
  <div className={styles.container}>
    <CoursewareSearch searchType="footer" search={search} setSearch={setSearch} />
  </div>
);

export default SearchFooter;
