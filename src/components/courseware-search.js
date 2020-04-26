import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { MdClose, MdSearch } from 'react-icons/md';
import Store from '../store/store';
import './courseware-search.scss';

const CoursewareSearch = ({ searchType, search, setSearch }) => {
  const {
    setCourseSearch,
    setCourseTopic,
    setCourseFeature,
    setCourseLevel,
  } = Store.useContainer();

  const navigateToDiscovery = () => {
    if (window.location !== '/discovery') {
      setCourseTopic('All');
      setCourseFeature('Any');
      setCourseLevel('All');
      navigate('discovery');
    }
  };

  const changeSearch = useCallback(
    () => {
      setCourseSearch(search);
      navigateToDiscovery();
    },
  );
  const inputChange = useCallback(
    event => setSearch(event.currentTarget.value),
  );
  const inputKeyUp = useCallback(
    (event) => {
      // "Enter" key code
      if (event.keyCode === 13) {
        changeSearch();
      }
    },
  );
  const closeIconClick = useCallback(
    () => {
      setSearch('');
    },
  );
  const closeIconKeyUp = useCallback(
    (event) => {
      // "Enter" key code
      if (event.keyCode === 13) {
        setSearch('');
      }
    },
  );
  const exploreButtonClick = useCallback(
    () => {
      setCourseSearch('');
      navigateToDiscovery();
    },
  );
  const searchButtonClick = useCallback(
    () => {
      changeSearch();
    },
  );

  const closeIcon = search !== '' ? <MdClose /> : null;

  const searchClassName = searchType === 'header'
    ? 'search-textfield search-textfield-header'
    : 'search-textfield';

  const exploreButtonClassName = searchType === 'header'
    ? 'explore-button button-header'
    : 'explore-button explore-button-footer';

  const searchButtonClassName = searchType === 'header'
    ? 'search-button button-header'
    : 'search-button search-button-footer';

  return (
    <>
      <Button
        className={exploreButtonClassName}
        onClick={exploreButtonClick}
      >
        Explore
      </Button>
      <TextField
        className={searchClassName}
        placeholder="MIT's instructional materials at your fingertips..."
        outlined
        value={search}
        trailingIcon={{
          icon: closeIcon,
          tabIndex: 0,
          onKeyUp: closeIconKeyUp,
          onClick: closeIconClick,
        }}
        onChange={inputChange}
        onKeyUp={inputKeyUp}
      />
      <Button
        className={searchButtonClassName}
        onClick={searchButtonClick}
      >
        <MdSearch />
      </Button>
    </>
  );
};

export default CoursewareSearch;
