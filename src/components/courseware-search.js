import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import { TextField } from '@rmwc/textfield';
import { MdSearch } from 'react-icons/md';
import Store from '../store/store';
import './courseware-search.scss';

const CoursewareSearch = ({ searchType, search, setSearch }) => {
  const {
    setCourseSearch,
    setCourseTopic,
    setCourseFeature,
    setCourseLevel,
  } = Store.useContainer();
  const handleInputChange = useCallback(
    event => setSearch(event.currentTarget.value),
  );
  const changeSearch = useCallback(
    () => {
      setCourseSearch(search);
      if (window.location !== '/discovery') {
        setCourseTopic('All');
        setCourseFeature('Any');
        setCourseLevel('All');
        navigate('discovery');
      }
    },
  );
  const handleIconClick = useCallback(
    () => {
      changeSearch();
    },
  );
  const handleInputKeyUp = useCallback(
    (event) => {
      // "Enter" key code
      if (event.keyCode === 13) {
        changeSearch();
      }
    },
  );
  const searchIcon = (
    <MdSearch
      onClick={handleIconClick}
    />
  );
  const searchClassName = searchType === 'header'
    ? 'search-textfield search-textfield-header'
    : 'search-textfield search-textfield-footer';

  return (
    <TextField
      className={searchClassName}
      placeholder="MIT's instructional materials at your fingertips..."
      outlined
      value={search}
      trailingIcon={searchIcon}
      onChange={handleInputChange}
      onKeyUp={handleInputKeyUp}
    />
  );
};

export default CoursewareSearch;
