import React from 'react';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { styled } from '@material-ui/core/styles';
import Header from './header';
import Footer from './footer';

const StyledMain = styled('main')({
  background: '#e0e0e0',
  margin: '0 auto',
  padding: '2rem',
});

const Layout = ({ children }) => (
  <>
    <CssBaseline />
    <div>
      <Header />
        <StyledMain>
          {children}
        </StyledMain>
      <Footer />
    </div>
  </>
);

export default Layout;
