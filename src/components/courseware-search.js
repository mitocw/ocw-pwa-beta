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
  const searchButtonClick = useCallback(
    () => {
      changeSearch();
    },
  );

  const closeIcon = search !== '' ? <MdClose /> : null;

  const searchClassName = searchType === 'header'
    ? 'search-textfield search-textfield-header'
    : 'search-textfield search-textfield-footer';

  const buttonClassName = searchType === 'header'
    ? 'search-button search-button-header'
    : 'search-button search-button-footer';

  return (
    <>
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
        className={buttonClassName}
        onClick={searchButtonClick}
      >
        <MdSearch />
      </Button>
    </>
  );
};

export default CoursewareSearch;
