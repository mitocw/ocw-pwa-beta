import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const HOME = gql`
  {
    home {
      featuredTitle
      featuredDescription
      featuredCourses {
        id
      }
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
