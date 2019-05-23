/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import styles from './collapsible.module.scss';

const Collapsible = ({ className, title, children }) => {
  const classes = `${className} ${styles.collapsible}`;
  const [open, setOpen] = useState(0);
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
    <div className={classes} onClick={titleHandleClick}>
      <div className={styles.title}>
        <h4>{title}</h4>
        <span className={styles.icon}>{icon}</span>
      </div>
      {content}
    </div>
  );
};

export default Collapsible;
