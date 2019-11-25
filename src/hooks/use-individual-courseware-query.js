import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COURSEWARE = gql`
  query($coursewareUid: ItemId) {
    allCoursewares(
      filter: {
        id: {eq: $coursewareUid}
      }
    ) {
      trackingTitle
      title
      masterCourseNumber
      imageSrc
      imageDescription
      description
      url
      shortUrl
      courseLevel
      departmentNumber
      instructors {
        directoryTitle
        firstName
        lastName
      }
      tags {
        name
      }
      toSemester
      fromSemester
      toYear
      fromYear
      sortAs
      language
      coursePages {
        id
        title
        url
        shortUrl
        pageType
        text
        videos
      }
      courseVideos {
        uid
        title
        youtubeStream
        youtubeJpeg
        itunesMp4
        internetArchiveMp4
      }
    }
  }
`;

const useIndividualCoursewareQuery = coursewareUid => (
  useQuery(GET_COURSEWARE, {
    variables: {
      coursewareUid,
    },
  })
);

export default useIndividualCoursewareQuery;
