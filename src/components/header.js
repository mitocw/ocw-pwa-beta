import React from 'react';
import { styled } from '@material-ui/core/styles';

const StyledHeader = styled('header')({
  background: '#1976d2',
  color: 'white',
  margin: '0 auto',
  padding: '1rem',
});

const Header = () => (
  <StyledHeader>
    OCW Progressive Web Application
  </StyledHeader>
);

export default Header;
