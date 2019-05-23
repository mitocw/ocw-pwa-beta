import React from 'react';
import ReactBreakpoints from 'react-breakpoints';
import 'normalize.css';
import 'typeface-roboto';
import Header from './header';
import Footer from './footer';
import styles from './layout.module.scss';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const Layout = ({ children }) => (
  <ReactBreakpoints breakpoints={breakpoints}>
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  </ReactBreakpoints>
);

export default Layout;
