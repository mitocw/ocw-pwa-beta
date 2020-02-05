import React, { useState, useCallback } from 'react';
import { navigate } from 'gatsby';
import { Button } from '@rmwc/button';
import { Switch } from '@rmwc/switch';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { MdPermIdentity } from 'react-icons/md';
import { isAuthenticated, logout } from '../scripts/auth';
import CoursewareSearch from './courseware-search';
import './header.scss';

const Header = ({ search, setSearch }) => {
  const [themeOn, setThemeOn] = useState(false);
  const changeTheme = useCallback(
    (event) => {
      setThemeOn(event.currentTarget.checked);
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
  const navigateToFavoriteCoursewares = useCallback(
    () => navigate('account'),
  );
  const navigateToAccount = useCallback(
    () => {
      if (isAuthenticated()) {
        logout();
      } else {
        navigate('redirect');
      }
    },
  );
  const online = window.navigator.onLine;
  const logButton = online
    ? (
      <IconContext.Provider value={{ size: '1.40rem' }}>
        <Button className="header-button header-log-button" onClick={navigateToAccount}>
          <small>{isAuthenticated() ? 'Sign Out' : 'Sign In'}</small>
          {isAuthenticated() ? <FiLogOut /> : <FiLogIn />}
        </Button>
      </IconContext.Provider>
    )
    : null;
  const favoriteCoursewaresButton = isAuthenticated()
    ? (
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <Button className="header-button header-favorite-button" onClick={navigateToFavoriteCoursewares}>
          <MdPermIdentity />
        </Button>
      </IconContext.Provider>
    )
    : null;
  const onAccountPage = window.location.pathname === '/account';
  const themeSwitch = onAccountPage
    ? (
      <Switch
        className="header-switch"
        checked={themeOn}
        onChange={changeTheme}
        label="Theme"
      />
    )
    : null;

  return (
    <header className="header-container">
      <div className="header-left-items">
        <Button className="header-button header-button-left" onClick={navigateToIndex}>
          MIT OpenCourseWare
          <br />
          <small>Next Gen Experiments</small>
        </Button>
        <CoursewareSearch searchType="header" search={search} setSearch={setSearch} />
      </div>
      <div className="header-right-items">
        {favoriteCoursewaresButton}
        {logButton}
        {themeSwitch}
      </div>
    </header>
  );
};

export default Header;
