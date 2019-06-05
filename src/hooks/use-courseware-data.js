import { useStaticQuery, graphql } from 'gatsby';

const useCoursewareData = (coursewareUid) => {
  const CONTENTFUL_QUERY = graphql`
    {
      allContentfulCourseware(sort: { fields: [trackingTitle], order: ASC }) {
        edges {
          node {
            id
            trackingTitle
            title
            masterCourseNumber
            imageSrc
            imageDescription {
              imageDescription
            }
            description {
              description
            }
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
              trackingTitle
              title
              url
              shortUrl
              coursePageType
              text {
                text
              }
            }
          }
        }
      }
    }
  `;
  const { allContentfulCourseware } = useStaticQuery(CONTENTFUL_QUERY);
  /*
    We cannot use parameters in our graphQL query, useStaticQuery doesn't allow it as its name
    indicates. So we query all and filter afterwards with regard to coursewareUid.
  */
  return allContentfulCourseware.edges.filter(obj => obj.node.id === coursewareUid)[0].node;
};

export default useCoursewareData;
