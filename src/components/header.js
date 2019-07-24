import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import Button from '@material/react-button';
import styles from './header.module.scss';

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

  return (
    <header className={styles.header}>
      <Button className={styles.button} onClick={navigateToIndex}>
        OpenCourseWare
        <br />
        <small>Next Gen Platform Experiments</small>
      </Button>
      <Button className={styles.button} onClick={changeTheme}>Theme</Button>
    </header>
  );
};

export default Header;
