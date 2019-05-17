import React from 'react';
import 'typeface-roboto';
import Header from '../header';
import Footer from '../footer';
import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <div>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
