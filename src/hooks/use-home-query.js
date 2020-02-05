import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const HOME = gql`
  {
    home {
      splashImage {
        responsiveImage {
          src
          alt
        }
      }
      splashImageLede
      splashVideos {
        title
        description
        youtubeUrl {
          providerUid
        }
      }
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
