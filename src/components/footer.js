import React from 'react';
import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <h5>About MIT OpenCourseWare</h5>
    <p>
      MIT OpenCourseWare makes the materials used in the teaching
      of almost all of MIT&apos;s subjects available on the Web, free
      of charge. With more than 2,400 courses available, OCW is
      delivering on the promise of open sharing of knowledge.
    </p>
    <p>  
      <a href="http://ocw.mit.edu/about/">Learn More</a>
    </p>
    <div className={styles.row}>
      <div className={styles.column}>
        <img
          src="https://ocw.mit.edu/images/logo_mit.png"
          alt="MIT Logo"
        />
      </div>
      <div className={styles.column}>
        <img
          src="https://ocw.mit.edu/images/logo_odl.png"
          alt="MIT Office of Digital Learning Logo"
        />
      </div>
      <div className={styles.column}>
        <img
          src="https://ocw.mit.edu/images/logo_oec.png"
          alt="Open Education Consortium Logo"
        />
      </div>
      <div className={styles.column}>
        <img
          src="https://ocw.mit.edu/images/cc_by-nc-sa.png"
          alt="Creative Commons with Attribution No Commercial"
        />
      </div>
    </div>
    <p>© 2001–2019</p>
    <p>Massachusetts Institute of Technology</p>
    <p>
      Your use of the MIT OpenCourseWare site and materials is
      subject to our
      {' '}
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons</a>
      {' '}
      License and other
      {' '}
      <a href="https://ocw.mit.edu/terms/">terms of use</a>
      {'.'}
    </p>
  </footer>
);

export default Footer;
