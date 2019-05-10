import React from 'react';
import { styled } from '@material-ui/core/styles';

const StyledFooter = styled('footer')({
  background: '#0d47a1',
  color: 'white',
  margin: '0 auto',
  padding: '1rem',
});

const Footer = () => (
  <StyledFooter>
    Footer
  </StyledFooter>
);

export default Footer;
