import React from 'react';
import Layout from "../components/layout"
import Card from "@material/react-card";
import styles from './index.module.scss';

const IndexPage = () => (
  <Layout>
    <Card className={styles.defaultCard}>
      <>
        Default Card
      </>
    </Card>
    <Card className={styles.styledCard}>
      <>
        Styled Card
      </>
    </Card>
  </Layout>
);

export default IndexPage;
