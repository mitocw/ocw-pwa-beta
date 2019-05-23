import React, { useCallback } from 'react';
import Button from '@material/react-button';
import styles from './header.module.scss';

const Header = () => {
  const buttonHandleClick = useCallback(
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

  return (
    <header className={styles.header}>
      <span className={styles.title}>OCW Progressive Web Application</span>
      <Button className={styles.button} onClick={buttonHandleClick}>Theme</Button>
    </header>
  );
};

export default Header;
