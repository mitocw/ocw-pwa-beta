import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_MODULES = gql`
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

const useModulesQuery = () => useQuery(ALL_MODULES);

export default useModulesQuery;
