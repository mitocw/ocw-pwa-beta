import React from 'react';
import { Player, BigPlayButton } from 'video-react';

const InternalVideo = ({ url }) => (
  <Player src={url}>
    <BigPlayButton position="center" />
  </Player>
);

export default InternalVideo;
