import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const HOME = gql`
  {
    home {
      storiesTitle
      storiesDescription
      stories {
        id
        title
        featuredUserImage {
          url
        }
        featuredUserLede
      }
    }
  }
`;

const useHomeQuery = () => useQuery(HOME);

export default useHomeQuery;
