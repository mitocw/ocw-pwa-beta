import React from 'react';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../header';
import Footer from '../footer';
import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <>
    <CssBaseline />
    <div>
      <Header />
        <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  </>
);

export default Layout;
