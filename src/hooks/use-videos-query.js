import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_VIDEOS = gql`
  {
    allTempVideos {
        id
        customId
        title
        externalVideo {
          providerUid
          provider
          title
          thumbnailUrl
          width
          height
        }
        license {
          id
        }
        captionText
      }
  }
`;

const useVideosQuery = () => useQuery(ALL_VIDEOS);

export default useVideosQuery;
