import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_MODULES_QUERY = gql`
  {  
    allModules {
      title
      content {
        ... on TextRecord {
          text
        }
        ... on VideoRecord {
          title
          mediaAsset {
            url
          }
        }
        ... on ImageRecord {
          image {
            url
          }
          lede
        }
      }
      documents {
        url
      }
    }
  }  
`;

const useModulesQuery = () => useQuery(ALL_MODULES_QUERY);

export default useModulesQuery;
