import React, { Fragment } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import useSiteMetadata from '../hooks/use-site-metadata';
import useInternalVideosQuery from '../hooks/use-internal-videos-query';
import useModulesQuery from '../hooks/use-modules-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import InternalVideo from '../components/internal-video';
import Markdown from '../components/markdown';
import shortid from '../scripts/shortid';
import styles from './playground.module.scss';

const PlaygroundPage = () => {
  const { siteMetadata } = useSiteMetadata();
  const { data: videosData, loading: videosLoading } = useInternalVideosQuery();
  const { data: modulesData, loading: modulesLoading } = useModulesQuery();

  if (videosLoading || modulesLoading) {
    return (
      <div className="spinner-container">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }

  const { allInternalVideos } = videosData;
  const { allModules } = modulesData;

  const internalVideos = allInternalVideos.map((video) => (
    <Fragment key={shortid()}>
      <h3>{video.title}</h3>
      <InternalVideo url={video.videoName.url} />
    </Fragment>
  ));
  const modules = allModules.map((module) => {
    const { title: moduleTitle, content, documents } = module;
    const titleEl = (<h3>{moduleTitle}</h3>);
    const contentEl = content.map((item) => {
      const { __typename: type } = item;
      if (type === 'TextRecord') {
        return (
          <Fragment key={shortid()}>
            <Markdown content={item.text} />
            <br />
          </Fragment>
        );
      }
      if (type === 'VideoRecord') {
        const { title: videoTitle, mediaAsset } = item;
        return (
          <Fragment key={shortid()}>
            <h3>{videoTitle}</h3>
            <InternalVideo url={mediaAsset.url} />
            <br />
          </Fragment>
        );
      }
      // ImageRecord
      const { image, lede } = item;
      return (
        <Fragment key={shortid()}>
          <img src={image.url} alt={lede} />
          <p>{lede}</p>
          <br />
        </Fragment>
      );
    });
    const documentsEl = documents
      ? (
        documents.map((document) => (
          <a href={document.url} key={shortid()}>Document</a>
        ))
      )
      : null;

    return (
      <Fragment key={shortid()}>
        {titleEl}
        {contentEl}
        {documentsEl}
        <hr />
      </Fragment>
    );
  });

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
          <li>
            <a href="#modules">Modules</a>
          </li>
        </ul>
        <div id="internal-videos" className={styles.listItem}>
          <h2 className={styles.listItemHeader}>Internal Videos</h2>
          <div className={styles.listItemContent}>
            {internalVideos}
          </div>
        </div>
        <div id="modules" className={styles.listItem}>
          <h2 className={styles.listItemHeader}>Modules</h2>
          <div className={styles.listItemContent}>
            {modules}
          </div>
        </div>
      </div>
    </Layout>
  );
  return result;
};

export default PlaygroundPage;
