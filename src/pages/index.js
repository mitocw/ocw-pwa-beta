import React from 'react';
import { styled } from '@material-ui/core/styles';
import Layout from "../components/layout"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const StyledCard = styled(Card)({
  background: '#90caf9',
  maxWidth: 300,
  margin: '1rem auto 0',
  
  '&:hover': {
    background: '#64b5f6',
    cursor: 'pointer',
    borderRadius: 50,
  },
});

const StyledCardContent = styled(CardContent)({
  padding: 10,

  '&:last-child': {
    paddingBottom: 10,
  },
  textAlign: 'center',
});

const IndexPage = (props) => (
  <Layout>
    <Card>
      <CardContent>
        Default Card
      </CardContent>
    </Card>
    <StyledCard elevation={24}>
      <StyledCardContent>
        Styled Card
      </StyledCardContent>
    </StyledCard>
  </Layout>
);

export default IndexPage;
