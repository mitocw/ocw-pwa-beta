import React, { useState, useCallback } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { MdSearch } from 'react-icons/md';
import Store from '../store/store';
import './courseware-search.scss';

const CoursewareSearch = () => {
  const {
    courseSearch,
    changeCourseSearch,
  } = Store.useContainer();
  const [search, setSearch] = useState(courseSearch);
  const handleInputChange = useCallback(
    event => setSearch(event.currentTarget.value),
  );
  const handleButtonClick = useCallback(
    () => changeCourseSearch(search),
  );
  const handleInputKeyUp = useCallback(
    (event) => {
      // "Enter" key code
      if (event.keyCode === 13) {
        changeCourseSearch(search);
      }
    },
  );
  const searchIcon = <MdSearch />;

  return (
    <div className="search-group">
      <TextField
        className="search-textfield"
        label="Title contains"
        outlined
        value={search}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
      />
      <Button
        className="search-button"
        icon={searchIcon}
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default CoursewareSearch;
