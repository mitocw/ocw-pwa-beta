import React from 'react';
import Layout from "../components/layout"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './index.module.scss';

const IndexPage = () => (
  <Layout>
    <Card>
      <CardContent>
        Default Card
      </CardContent>
    </Card>
    <Card className={styles.styledCard} elevation={20}>
      <CardContent className={styles.styledCardContent}>
        Styled Card
      </CardContent>
    </Card>
  </Layout>
);

export default IndexPage;
