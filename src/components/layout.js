import React, { useState } from 'react';
import ReactBreakpoints from 'react-breakpoints';
import 'normalize.css';
import 'typeface-roboto';
import Store from '../store/store';
import Header from './header';
import Footer from './footer';
import SearchFooter from './search-footer';
import styles from './layout.module.scss';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const Layout = ({ children }) => {
  // Used to synchronize search content in header and footer inputs
  const { courseSearch } = Store.useContainer();
  const [search, setSearch] = useState(courseSearch);
  return (
    <ReactBreakpoints breakpoints={breakpoints}>
      <div className={styles.app}>
        <Header search={search} setSearch={setSearch} />
        <main className={styles.main}>{children}</main>
        <Footer />
        <SearchFooter search={search} setSearch={setSearch} />
      </div>
    </ReactBreakpoints>
  );
};

export default Layout;
