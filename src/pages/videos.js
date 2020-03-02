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
import useVideosQuery from '../hooks/use-videos-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Video from '../components/video';
import VideoList from '../components/video-list';
import shortid from '../scripts/shortid';
import './videos.scss';

const VideosPage = () => {
  const {
    initSelectedVideo,
  } = Store.useContainer();
  const { siteMetadata } = useSiteMetadata();
  const { data, loading } = useVideosQuery();
  const [selectedVideo, setSelectedVideo] = useState(initSelectedVideo);
  const changeSelectedVideo = useCallback(
    event => setSelectedVideo(event.currentTarget.getAttribute('data-video-uid')),
  );

  if (loading) {
    return (
      <div className="spinner-container">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }

  const { allTempVideos: allVideos } = data;
  const videos = allVideos.map(video => (
    <Video
      video={video}
      selectedVideoUid={selectedVideo}
      key={shortid()}
    />
  ));

  const result = (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className="all-videos-container">
        <div className="drawer-container">
          <Drawer>
            <DrawerHeader>
              <DrawerTitle>OCW Videos</DrawerTitle>
            </DrawerHeader>
            <DrawerContent>
              <VideoList
                videos={allVideos}
                selectedVideo={selectedVideo}
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

export default VideosPage;
