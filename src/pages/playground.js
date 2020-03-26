import React, { Fragment } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import useSiteMetadata from '../hooks/use-site-metadata';
import useInternalVideosQuery from '../hooks/use-internal-videos-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import InternalVideo from '../components/internal-video';
import shortid from '../scripts/shortid';
import styles from './playground.module.scss';

const PlaygroundPage = () => {
  const { siteMetadata } = useSiteMetadata();
  const { data, loading } = useInternalVideosQuery();

  if (loading) {
    return (
      <div className="spinner-container">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }

  const { allInternalVideos } = data;
  const internalVideos = allInternalVideos.map((video) => (
    <Fragment key={shortid()}>
      <h3>{video.title}</h3>
      <InternalVideo url={video.videoName.url} />
    </Fragment>
  ));

  const result = (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className={styles.container}>
        <ul className={styles.list}>
          <li>
            <a href="#internal-videos">Internal videos</a>
          </li>
        </ul>
        <div id="internal-videos" className={styles.listItem}>
          <h2 className={styles.listItemHeader}>Internal Videos</h2>
          <div className={styles.listItemContent}>
            {internalVideos}
          </div>
        </div>
      </div>
    </Layout>
  );
  return result;
};

export default PlaygroundPage;
