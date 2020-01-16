import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_STORIES = gql`
  {
    allStories {
      id
      _updatedAt
      title
      author
      featuredUser
      featuredUserType
      featuredUserCountry
      featuredUserImage {
        responsiveImage {
          src
        }
      }
      body
      location {
        latitude
        longitude
      }
    }
  }
`;

const useStoriesQuery = () => useQuery(ALL_STORIES);

export default useStoriesQuery;
