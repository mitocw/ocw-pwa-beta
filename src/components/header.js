import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import Button from '@material/react-button';
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
      <Button className="header-button header-button-right" onClick={navigateToFavoriteCourses}>
        Favorite courses
      </Button>
    )
    : null;

  return (
    <header className="header-container">
      <div className="header-left-items">
        <Button className="header-button header-button-left" onClick={navigateToIndex}>
          OpenCourseWare
          <br />
          <small>Next Gen Experiments</small>
        </Button>
      </div>
      <div className="header-right-items">
        {favoriteCoursesButton}
        <Button className="header-button header-button-right" onClick={navigateToAccount}>
          {logButtonText}
        </Button>
        <Button className="header-button header-button-right" onClick={changeTheme}>
          Theme
        </Button>
      </div>
    </header>
  );
};

export default Header;
