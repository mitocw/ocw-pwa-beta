import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_INTERNAL_VIDEOS_QUERY = gql`
  {
    allInternalVideos {
        id,
        title,
        videoName {
          url,
          format
        }
      }
  }
`;

const useInternalVideosQuery = () => useQuery(ALL_INTERNAL_VIDEOS_QUERY);

export default useInternalVideosQuery;
