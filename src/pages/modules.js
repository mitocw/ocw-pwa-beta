/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useCallback } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
} from '@rmwc/drawer';
import Store from '../store/store';
import useSiteMetadata from '../hooks/use-site-metadata';
import useModulesQuery from '../hooks/use-modules-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import InternalVideo from '../components/internal-video';
import VideoList from '../components/video-list';
import shortid from '../scripts/shortid';
import './modules.scss';

const ModulesPage = () => {
  const {
    initSelectedModule,
  } = Store.useContainer();
  const { siteMetadata } = useSiteMetadata();
  const { data, loading } = useModulesQuery();
  const [selectedModule, setSelectedModule] = useState(initSelectedModule);
  const changeSelectedVideo = useCallback(
    event => setSelectedModule(event.currentTarget.getAttribute('data-video-uid')),
  );

  if (loading) {
    return (
      <div className="spinner-container">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }

  const { allInternalVideos: allVideos } = data;
  const videos = allVideos.map(video => (
    <InternalVideo
      video={video}
      selectedVideoUid={selectedModule}
      key={shortid()}
    />
  ));

  const result = (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className="all-modules-container">
        <div className="drawer-container">
          <Drawer>
            <DrawerHeader>
              <DrawerTitle>OCW Modules</DrawerTitle>
            </DrawerHeader>
            <DrawerContent>
              <VideoList
                videos={allVideos}
                selectedVideo={selectedModule}
                changeSelectedVideo={changeSelectedVideo}
              />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="videos-container">
          {videos}
        </div>
      </div>
    </Layout>
  );
  return result;
};

export default ModulesPage;
