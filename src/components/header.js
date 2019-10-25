import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import Button from '@material/react-button';
import { IconContext } from 'react-icons';
import { MdPermIdentity } from 'react-icons/md';
import { isAuthenticated, logout } from '../scripts/auth';
import './header.scss';

const Header = () => {
  const changeTheme = useCallback(
    () => {
      // eslint-disable-next-line no-undef
      const root = document.documentElement;
      if (root.hasAttribute('theme')) {
        root.removeAttribute('theme');
      } else {
        root.setAttribute('theme', 'a11y');
      }
    },
  );
  const navigateToIndex = useCallback(
    () => navigate(''),
  );
  const navigateToFavoriteCourses = useCallback(
    () => navigate('account'),
  );
  const navigateToAccount = useCallback(
    () => {
      if (isAuthenticated()) {
        logout();
      } else {
        navigate('account');
      }
    },
  );
  const logButtonText = isAuthenticated() ? 'Log out' : 'Log in';
  const favoriteCoursesButton = isAuthenticated()
    ? (
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <Button className="header-button header-favorite-button" onClick={navigateToFavoriteCourses}>
          <MdPermIdentity />
          <span>My courses</span>
        </Button>
      </IconContext.Provider>
    )
    : null;

  return (
    <header className="header-container">
      <div className="header-left-items">
        <Button className="header-button" onClick={navigateToIndex}>
          OpenCourseWare
          <br />
          <small>Next Gen Experiments</small>
        </Button>
      </div>
      <div className="header-right-items">
        {favoriteCoursesButton}
        <Button className="header-button" onClick={navigateToAccount}>
          {logButtonText}
        </Button>
        <Button className="header-button" onClick={changeTheme}>
          Theme
        </Button>
      </div>
    </header>
  );
};

export default Header;
