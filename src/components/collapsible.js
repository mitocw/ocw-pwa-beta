/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import styles from './collapsible.module.scss';

const Collapsible = ({ className, title, startOpen, children }) => {
  const classes = `${className} ${styles.collapsible}`;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (startOpen) {
      setOpen(true);
    }
  }, []);
  const titleHandleClick = useCallback(
    () => setOpen(!open),
  );
  const content = open ? (
    <>
      {children}
    </>
  ) : null;
  const icon = open ? (
    <MdExpandLess />
  ) : (
    <MdExpandMore />
  );

  return (
    <div className={classes}>
      <div className={styles.title} onClick={titleHandleClick}>
        <h4>{title}</h4>
        <span className={styles.icon}>{icon}</span>
      </div>
      {content}
    </div>
  );
};

export default Collapsible;
